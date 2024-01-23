const { connectDatabase } = require("../database/db");
const User = require("../models/User");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const { firstName, lastName, email, phone } = JSON.parse(event.body);
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
    });
    const savedUser = await user.save();
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "User details added!" }),
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
