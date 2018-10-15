import ServerError from 'shop/server/errors/ServerError';
import NotFoundError from 'shop/server/errors/NotFoundError';

export type Errors = ServerError | NotFoundError;
