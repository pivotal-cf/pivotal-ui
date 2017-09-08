export default (collection, startIndex, endIndex) => {
  while (startIndex < 0) {
    startIndex += collection.length;
  }
  while (endIndex < 0) {
    endIndex += collection.length;
  }
  if (endIndex >= collection.length) {
    let k = endIndex - collection.length;
    while ((k--) + 1) {
      collection.push(undefined);
    }
  }
  collection.splice(endIndex, 0, collection.splice(startIndex, 1)[0]);

  return collection;
};
