const { connectDatabase } = require("../database/db");
const User = require("../models/User");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const users = await User.find();

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
