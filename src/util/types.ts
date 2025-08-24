/**
 * Useful types to use anywhere in the app
 */

/**
 * A tuple result where the first element is the success value
 * and the second element is the error value
 *
 * @example
 * const [success, error] = possibleError();
 *
 * if (error) {
 *  // handle error
 *  return;
 *  }
 *
 *  // handle success
 *  return;
 *
 */
export type TupleResult<T, E> = [T | null, E | null];

/**
 * Asynchronous version of {@link TupleResult}
 *
 * @example
 * const [success, error] = await possibleAsynError();
 *
 * if (error) {
 * // handle error
 * return;
 * }
 *
 * // handle success
 */
export type AsyncTupleResult<T, E> = Promise<TupleResult<T, E>>;

/**
 * For building configurable link trees
 */
export type LinkTreeNode = {
  label: string;
  url: string | null;
  items: LinkTreeNode[];
  icon?: string;
  test?: () => boolean;
};

/*
 * Hero image / Banner type
 */
export type HeroSlide = {
  imageUrl: string;
  imageAlt: string;
  url: string;
  title: string;
  text: string;
}

export type CookieSetOptions = {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  domain: string;
  path: string;
};

