import { ZodIssue } from 'zod';

export const findErrorByPath = (
  errors: ZodIssue[] | undefined,
  path: string[],
): ZodIssue | undefined => {
  return errors?.find(
    (item) =>
      item.path.length === path.length &&
      item.path.every((value, index) => value === path[index]),
  );
};
