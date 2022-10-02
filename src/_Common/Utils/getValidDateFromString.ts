import ms from 'ms';

export const getValidDateFromString = (value: string): Date => {
  return new Date(Date.now() + ms(value));
}