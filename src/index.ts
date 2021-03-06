import * as dotenv from "dotenv";

dotenv.config();

import createConnection from './db';
import initialiazeSchema from './schema';
import initializeApolloServer from './server/apollo';
import initializeExpressServer from './server/express';


const initialize = async () => {
  const connection = await createConnection();
  const schema = await initialiazeSchema();

  initializeExpressServer(schema);
  initializeApolloServer(schema);
}

initialize();
