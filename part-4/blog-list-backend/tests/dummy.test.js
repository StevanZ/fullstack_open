const dummy = require('../utils/list_helper').dummy;

test('should return 1', () => {
  const blogs = [];
  const result = dummy(blogs);

  expect(result).toBe(1);
});
