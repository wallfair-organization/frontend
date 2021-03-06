module.exports = {
  // Repalce meta values in index file
  replaceMeta: (content, data) => {
    return content
      .replace(/__title__/g, data.title)
      .replace(/__description__/g, data.description ? data.description : "Earn money by playing on Wallfair")
      .replace(/__image__/g, data.image)
      .replace(/__keywords__/g, data.keywords);
  },
};
