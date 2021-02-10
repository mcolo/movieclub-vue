const trie = require("./autocomplete_trie.json", "utf8");
const movieData = require("./autocomplete_dataset.json", "utf-8");

exports.handler = async (event, context) => {
  const search = event.queryStringParameters.search || "World";
  if (trie && movieData) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `You searched for ${search}` }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Didn't Work" }),
    };
  }
};
