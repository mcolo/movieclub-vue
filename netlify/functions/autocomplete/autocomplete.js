exports.handler = async (event, context) => {
  const search = event.queryStringParameters.search || "World";

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `You searched for ${search}` }),
  };
};
