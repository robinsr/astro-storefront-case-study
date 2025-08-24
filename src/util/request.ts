const headers = {
  'Content-Type': 'application/json',
};

export const respondOK = (payload: unknown): Response => {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { ...headers, 'x-handler-time': new Date().toISOString() },
  });
};

export const respondErr = (error: unknown, status = 400): Response => {
  return new Response(JSON.stringify(error), {
    status,
    headers: { ...headers, 'x-handler-time': new Date().toISOString() },
  });
};

export const paramsToMap = <T extends object>(params: URLSearchParams): T => {
  return Array.from(params.entries()).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) as T;
};

export const paramsToString = <T extends object>(params: T): string => {
  const url = new URL('/')
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  return url.search;
};

export const contentType = (req: Request): string => {
  return req.headers.get('content-type') || 'unknown';
};

export const isJSON = (req: Request): boolean => {
  const contentType = req.headers.get('content-type');
  return !!contentType && contentType.includes('application/json');
};

export const isFormPost = (req: Request): boolean => {
  const contentType = req.headers.get('content-type') || '';

  return (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  );
};

export const getPostBody = async <T>(request: Request): Promise<T> => {
  if (isJSON(request)) {
    return request.json();
  } else if (isFormPost(request)) {
    const formData: FormData = await request.formData();

    return Array.from(formData.entries()).reduce((acc, [key, value]) => {
      return { ...acc, [key]: value };
    }, {}) as T;
  } else {
    throw new Error('Invalid content-type');
  }
};

/**
 * Create a new Request object with the given url and form data. For use with fetch.
 *
 * @example
 * ```js
 * const form = document.querySelector('form');
 * const formData = getFormData(form);
 * const request = createFormPost('/api/contact', formData);
 * const response = await fetch(request);
 * ```
 */
export const postRequest = (
  url: string,
  data: unknown,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
): Request => {
  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const is2xx = (status?: number): boolean => {
  return (status && status >= 200 && status < 300) || false;
};

export const is3xx = (status?: number): boolean => {
  return (status && status >= 300 && status < 400) || false;
};

export const is4xx = (status?: number): boolean => {
  return (status && status >= 400 && status < 500) || false;
};

export const is5xx = (status?: number): boolean => {
  return (status && status >= 500 && status < 600) || false;
};
