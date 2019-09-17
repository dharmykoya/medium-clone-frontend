import paginator from './paginator';
describe('Test utility function paginator', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  it('should return array of paginated items', () => {
    const pageNumber = 3;
    const paginatedItem = paginator(items, pageNumber);
    expect(paginatedItem[0].length).toEqual(pageNumber);
  });
});
