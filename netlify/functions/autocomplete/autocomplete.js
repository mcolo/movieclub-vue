exports.handler = async (event, context) => {
  const search = event.queryStringParameters.search || "World";

  return {
    statusCode: 200,
    body: `You searched for ${search}`,
  };
};
