const { connectDatabase } = require("../database/db");
const User = require("../models/User");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const { userId } = event.pathParameters;
    const foundUser = await User.findById(userId);
    if (foundUser) {
      const { firstName, lastName, email, phone } = JSON.parse(event.body);
      foundUser.firstName = firstName;
      foundUser.lastName = lastName;
      foundUser.email = email;
      foundUser.phone = phone;
      const updatedUser = await foundUser.save();
      const response = {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
      };
      console.log("Response: ", response);
      return response;
    } else {
      const response = {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
      console.error("Error: ", response);
      return response;
    }
  } catch (err) {
    const response = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
    console.error("Error occured while processing the request: ", response);
    return response;
  }
};
