// disabled a lot of types to skip validation of external api
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import type { User, UserStatus } from 'types';

const StatusEnum = z.enum(['Working', 'OnVacation', 'LunchTime', 'BusinessTrip']);

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: StatusEnum,
  avatar: z.string(),
});

const UsersQuerySchema = z.object({
  search: z.string().optional(),
  status: StatusEnum.optional(),
});

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: StatusEnum,
  avatar: z.string().url('Avatar must be a valid URL'),
});

const UpdateUserSchema = z.object({
  status: StatusEnum,
});

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
});

// Set up schema validation
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const usersMap = new Map<number, User>();

// Fetch initial users data
const fetchUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100');
    const data = (await response.json()) as any;

    const statuses: UserStatus[] = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];

    data.results.forEach((user: any, index: number) => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      usersMap.set(index + 1, {
        id: index + 1,
        name: `${user.name.first} ${user.name.last}`,
        status: randomStatus,
        avatar: user.picture.large,
      });
    });
  } catch (error) {
    app.log.error('Failed to fetch initial users:', error);
    process.exit(1);
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const routeHandler = app.withTypeProvider<ZodTypeProvider>();

routeHandler.route({
  method: 'GET',
  url: '/users',
  schema: {
    querystring: UsersQuerySchema,
    response: {
      200: z.array(UserSchema),
    },
  },
  handler: async (request) => {
    await sleep(500); // Simulate slow API response
    const { search, status } = request.query;
    let filteredUsers = Array.from(usersMap.values());

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(searchLower));
    }

    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    return filteredUsers.reverse();
  },
});

routeHandler.route({
  method: 'GET',
  url: '/users/:id',
  schema: {
    params: z.object({
      id: z.string().transform((val) => parseInt(val, 10)),
    }),
    response: {
      200: UserSchema,
      404: z.object({
        error: z.string(),
      }),
    },
  },
  handler: async (request, reply) => {
    const user = usersMap.get(request.params.id);

    if (!user) {
      reply.code(404);
      return { error: 'User not found' };
    }

    return user;
  },
});

routeHandler.route({
  method: 'POST',
  url: '/users',
  schema: {
    body: CreateUserSchema,
    response: {
      201: UserSchema,
      400: z.object({
        error: z.string(),
      }),
    },
  },
  handler: async (request, reply) => {
    await sleep(1500); // Simulate slow API response

    // generate new id
    const newId = Math.max(...Array.from(usersMap.keys()), 0) + 1;

    const newUser: User = {
      id: newId,
      name: request.body.name,
      status: request.body.status,
      avatar: request.body.avatar,
    };

    usersMap.set(newId, newUser);

    reply.code(201);
    return newUser;
  },
});

routeHandler.route({
  method: 'PATCH',
  url: '/users/:id',
  schema: {
    params: z.object({
      id: z.string().transform((val) => parseInt(val, 10)),
    }),
    body: UpdateUserSchema,
    response: {
      200: UserSchema,
      404: z.object({
        error: z.string(),
      }),
    },
  },
  handler: async (request, reply) => {
    await sleep(1000); // Simulate slow API response
    const user = usersMap.get(request.params.id);

    if (!user) {
      reply.code(404);
      return { error: 'User not found' };
    }

    const updatedUser = {
      ...user,
      status: request.body.status,
    };

    usersMap.set(request.params.id, updatedUser);
    return updatedUser;
  },
});

try {
  await fetchUsers();
  await app.listen({ port: 3001 });
  app.log.info('Server listening on port 3001');
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
