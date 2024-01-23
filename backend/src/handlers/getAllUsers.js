const { connectDatabase } = require("../database/db");
const User = require("../models/User");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const users = await User.find();

    const response = {
      statusCode: 200,
      body: JSON.stringify(users),
    };
    console.log("Response: ", response);
    return response;
  } catch (err) {
    const response = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
    console.error("Error occured while processing the request: ", response);
    return response;
  }
};
