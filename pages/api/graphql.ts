import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema, NonEmptyArray, ResolverData } from 'type-graphql';
import { UserResolver } from '../../adapters/graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { makeLogger } from 'adapters';

const logger = makeLogger('apolloServer');

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const createSchema = async (shouldEmitSchemaFile = true) => {
  // build the schema as always
  const schema = await buildSchema({
    resolvers: [UserResolver],
    // authChecker: authorize,
    // register the IOC container
    // container: ({ context }: ResolverData<ApolloServerContext>) =>
    //   context.container,
    emitSchemaFile: shouldEmitSchemaFile,
  });

  if (shouldEmitSchemaFile) {
    logger.info('🗺️ GraphQL schema created');
  }

  return schema;
};

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await createSchema();

    apolloServerHandler = new ApolloServer({ schema }).createHandler({
      path: '/api/graphql',
    });
  }
  return apolloServerHandler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};
