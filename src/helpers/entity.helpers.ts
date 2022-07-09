import * as uuid from 'uuid';

export const prepareForCreate = (data: any) => {
  return Object.assign({}, { ...data, id: uuid.v4() });
};

export const prepareForUpdate = (data: any, exclude = []) => {
  const object = Object.assign({}, { ...data });
  exclude.push('id');
  exclude.forEach((key) => delete object[key]);
  return object;
};
