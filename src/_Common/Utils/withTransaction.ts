import { ClientSession } from 'mongoose';

export const withTransaction = async <T>(session: ClientSession, callback): Promise<T> => {
  let result: T;
  await session.withTransaction(async () => {
    result = await callback();
    return result;
  })
  return result;
}