import express from 'express';
import { GraphQLSchema } from 'graphql';
import bodyParser from 'body-parser';

const { graphqlHTTP } = require('express-graphql')
const jwt = require('express-jwt');

const initializeExpressServer = async (schema: GraphQLSchema) => {
  const app = express();
  const PORT = 3000;

  app.use(bodyParser.json());

  const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  });


  app.use(authMiddleware);

  app.use(
    '/graphql',
    graphqlHTTP((req: any) => ({
      schema: schema,
      graphiql: true,
      context: {
        user: req.user
      }
    })),
  );

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}

export default initializeExpressServer;
