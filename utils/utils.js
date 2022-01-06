exports.pagination = (post, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.currantPage = page;
  results.limit = limit;
  results.result = post.slice(startIndex, endIndex);
  return results;
};
