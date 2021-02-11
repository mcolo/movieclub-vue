const trie = require("./autocomplete_trie.json", "utf8");
const movieData = require("./autocomplete_dataset.json", "utf-8");

exports.handler = async (event, context) => {
  const search = event.queryStringParameters.search || "World";
  if (!search) {
    return {
      status: 404,
      body: JSON.stringify({ message: "No search term" }),
    };
  }

  try {
    const ids = suggestions(search);

    if (ids) {
      const results = getMovieData(ids);
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No movie data found" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to look through dataset" }),
    };
  }
};

function suggestions(str) {
  let response = [];
  str = str.toLowerCase();
  try {
    const startNode = str.split("").reduce((node, char) => {
      return node[char];
    }, trie);
    response = getIds(startNode);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function getIds(obj, ids = []) {
  if (obj["ids"]) {
    ids.push(...obj["ids"]);
  }

  for (let prop in obj) {
    if (prop !== "ids") {
      getIds(obj[prop], ids);
    }
  }
  return ids;
}

function getMovieData(ids) {
  let data = [];
  for (let id of ids) {
    data.push({
      title: movieData[id].t,
      year: movieData[id].y,
      id,
    });
    if (data.length > 9) break;
  }
  return data;
}
