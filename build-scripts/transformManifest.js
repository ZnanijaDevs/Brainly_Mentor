const { version, author } = require("../package.json");

module.exports = (_content) => {
  let manifestContent = JSON.parse(_content.toString("utf-8"));

  let transformedContent = {
    ...manifestContent,
    version,
    author
  }

  return JSON.stringify(transformedContent);
};