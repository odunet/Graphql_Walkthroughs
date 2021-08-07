var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    child(id: Int!): Child
    posts(id: Int!): [Posts]
  }
  type Child {
    id: Int
    omo1: String,
  }
  type Posts {
    id: Int
    name: String,
    address: String
  }
`);

const post_ = [
  {
    id: 1,
    name: 'omo1',
    address: 'cabrammata1'
  },
  {
    id: 2,
    name: 'omo2',
    address: 'cabrammata2'
  },
  {
    id: 3,
    name: 'omo3',
    address: 'cabrammata3'
  },
  {
    id: 4,
    name: 'omo4',
    address: 'cabrammata4'
  },
]

var root = {
  hello: () => 'Hello world!', child: ({ id }) => {
    if (id === 5) { return { id: id, omo1: 'Itohan' } } else {
      return { id: id, omo1: 'Tiwatope' }
    }
  },
  posts: ({ id }) => {
    return (
      post_.filter((item) => {
        return item.id === id
      })
    )
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));