import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';

const initializeApolloServer = async (schema: GraphQLSchema) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // Note! This example uses the `req` object to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they will vary for Express, Koa, Lambda, etc.!
      //
      // To find out the correct arguments for a specific integration,
      // see the `context` option in the API reference for `apollo-server`:
      // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

      // Get the user token from the headers.
      // #2
      const token = req.headers.authorization || '';

      // #3
      // add the user to the context
      return { token };
    }
   });
  await server.listen(3001);
}

export default initializeApolloServer;

