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
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User details added!" }),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
