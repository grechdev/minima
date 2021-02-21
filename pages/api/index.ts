import path from 'path';

import { ApolloServer } from 'apollo-server-micro';

import { makeSchema } from 'nexus';
import jwt from 'jsonwebtoken';
import * as allTypes from '../../lib/schema';

const schema = makeSchema({
  types: allTypes,
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const verifyToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET!);
  } catch {
    return null;
  }
};

export default new ApolloServer({
  schema,
  context: ({ req }) => {
    const user = verifyToken(req.headers.authorization);

    return {
      user,
    };
  },
}).createHandler({ path: '/api' });