module.exports = () => (
  `
  type Query {
    hello: String!
    array: Posts
    user(email: String!): User
    customer(age: Int!): Customer
  }

  type Posts {
    name: String!
    age: Int!
    school: String!
    countries: [Location]
  }

  type Location {
    country: String!
    continent: String!
  }

  type User {
    _id: ID!
    access: String!
    name: String!
    email: String!
  }

  type Customer {
    firstName: String!
    lastName: String!
    gender: String!
    age: Int!
  }
  `
)