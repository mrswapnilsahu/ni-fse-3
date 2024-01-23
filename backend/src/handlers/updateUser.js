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
      return {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
