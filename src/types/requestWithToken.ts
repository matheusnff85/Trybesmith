import { Request } from 'express';

type User = {
  id: number,
  username: string,
};

type RequestWithUser = Request & {
  user?: User,
};

export { RequestWithUser, User };