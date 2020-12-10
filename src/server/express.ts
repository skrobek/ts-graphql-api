import express from 'express';
import { GraphQLSchema } from 'graphql';

const { graphqlHTTP } = require('express-graphql');

const initializeExpressServer = async (schema: GraphQLSchema) => {
  const app = express();
  const PORT = 3000;

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}

export default initializeExpressServer;
