import { Request } from 'express';

type User = {
  username: string,
  id: number,
};

type RequestWithUser = Request & {
  user?: User,
};

export { RequestWithUser, User };