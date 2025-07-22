export const generateUUID4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : makeRBetween8AndBInHexadecimal(r);
    return v.toString(16);
  });

const makeRBetween8AndBInHexadecimal = (r: number) => {
  const lastTwobits = r % 4;
  return 8 + lastTwobits;
};
