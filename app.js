const express = require('express'),
    graphQLTools = require('graphql-tools'),
    graphqlHTTP = require('express-graphql'),
    schemas = require('./schemas'),
    resolvers = require('./resolvers'),
    executableSchema = graphQLTools.makeExecutableSchema({
        typeDefs: schemas,
        resolvers: resolvers
    });

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');