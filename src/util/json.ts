export const json = (obj: unknown, space = 4) => JSON.stringify(obj, null, space);

export const parseJson = <T extends object>(json: string): T => {
  return JSON.parse(json) as T;
};
