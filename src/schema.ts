import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

const initialiazeSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  return schema;
}

export default initialiazeSchema;

