var { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const customers = require('./asset/testJson.json');
const queryString = require('./asset/queryString');

// import Mongo Driver to access data from Atlas
const { MongoClient } = require('mongodb')

// Same as Schema in express-GraphQL
var typeDefs = gql`
  ${queryString()}
`;

// Same as root in express-GraphQL
var resolvers = {
  Query: {
    hello: () => 'Hello world!', array: () => ({
      name: 'Ayokunle', age: 32, school: 'Lasu', countries: [
        {
          country: 'Nigeria',
          continent: 'Africa'
        }
      ]
    }),
    user: async (parent, args, context) => {
      const email = args.email
      const users = context.users

      const user = await users.findOne({ email })
      return user
    },
    customer: (parent, args) => {
      customer = customers.filter((customer) => {
        return customer.age === args.age
      })

      return { ...customer[0] }

    }
  }
};

const start = async () => {
  const uri = process.env.MONGO_URI;
  const client = await MongoClient.connect(uri)
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      const users = db.collection('users')

      return { users }
    }
  })

  const PORT = process.env.PORT || 4000

  server.
    listen({ port: PORT })
    .then(({ port }) => {
      console.log(`Apollo server is running on ${PORT}`);
    })
}

start()