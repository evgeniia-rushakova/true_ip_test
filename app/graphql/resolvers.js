let db = [
    { id: 1, name: "John Doe", email: "john@gmail.com", age: 22 },
    { id: 2, name: "Jane Doe", email: "jane@gmail.com", age: 23 }
];

let {makeExecutableSchema} = require('graphql-tools')

let typeDefs = `
    type User {
  id: ID!
      name: String!
      email: String!
      age: Int
}
type Query {
  users: [User!]!
      user(id: ID!): User!
}
    type Mutation {
  createUser(id: ID!, name: String!, email: String!, age: Int): User!
      updateUser(id: ID!, name: String, email: String, age: Int): User!
      deleteUser(id: ID!): User!
}
`;

const resolvers = {
    Query: {
        user: (parent, { id }, context, info) => {
            return users.find(user => user.id === id);
        },
        users: (parent, args, context, info) => {
            return users;
        }
    },
    Mutation: {
        createUser: (parent, { id, name, email, age }, context, info) => {
            const newUser = { id, name, email, age };

            users.push(newUser);

            return newUser;
        },
        updateUser: (parent, { id, name, email, age }, context, info) => {
            let newUser = users.find(user => user.id === id);

            newUser.name = name;
            newUser.email = email;
            newUser.age = age;

            return newUser;
        },
        deleteUser: (parent, { id }, context, info) => {
            const userIndex = users.findIndex(user => user.id === id);

            if (userIndex === -1) throw new Error("User not found.");

            const deletedUsers = users.splice(userIndex, 1);

            return deletedUsers[0];
        }
    },

};
var schema = makeExecutableSchema({typeDefs, resolvers})
/*
subscription {
  users {
    id
    name
    email
    age
  }
} подписка на событие
https://tproger.ru/translations/graphql-beginners-guide/
https://medium.com/@brianschardt/best-graphql-node-api-template-for-sql-jwt-2018-5e956b715143
 */


module.exports = { schema }
