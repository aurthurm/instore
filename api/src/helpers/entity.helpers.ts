import * as uuid from 'uuid';

export const prepareForCreate = (data: any, dto: any = undefined) => {
  const obj = dto === undefined ? {} : new dto();
  return Object.assign(obj, { ...data, id: uuid.v4() });
};

export const prepareForUpdate = (data: any, exclude = []) => {
  const object = Object.assign({}, { ...data });
  exclude.push('id');
  exclude.forEach((key) => delete object[key]);
  return object;
};
