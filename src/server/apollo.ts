import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';

const initializeApolloServer = async (schema: GraphQLSchema) => {
  const server = new ApolloServer({ schema });
  await server.listen(3001);
}

export default initializeApolloServer;

