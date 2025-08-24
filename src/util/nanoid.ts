export const lowercase = 'abcdefghijklmnopqrstuvwxyz';
export const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numbers = '0123456789';
export const separators = '_-';
export const symbols = separators + '~=+?!@#$%^&*';

const defaultAlphabet = lowercase + uppercase + numbers;

export const nanoid = (length = 21, allow = '') => {
  const alphabet = defaultAlphabet + allow;

  let id = '';
  while (length--) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
};
