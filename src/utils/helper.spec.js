import { updateObject, isEmpty } from './helper';

it('should test updateObject', () => {
  const oldObject = { propertyOne: [] };
  const newObject = { propertyTwo: 'something' };
  const result = { propertyOne: [], propertyTwo: 'something' };

  expect(updateObject(oldObject, newObject)).toEqual(result);
});

it('should test isEmpty object', () => {
  expect(isEmpty({})).toEqual(true);
  expect(isEmpty(undefined)).toEqual(true);
  expect(isEmpty('')).toEqual(true);
  expect(isEmpty(null)).toEqual(true);
});
