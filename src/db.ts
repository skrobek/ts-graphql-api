import 'reflect-metadata';
import { createConnection as createOrmConcection, Connection } from 'typeorm';

const createConnection =  async() => {
  const connection: Connection = await createOrmConcection();

  return connection;
};

export default createConnection;
