const mongoose = require("mongoose");

let conn = null;

exports.connectDatabase = async () => {
  if (conn == null) {
    console.info("Creating new connection to the database....");
    conn = await mongoose.connect(process.env.DB, {
      serverSelectionTimeoutMS: 5000,
    });
    return conn;
  }
  console.info(
    "Connection already established, reusing the existing connection"
  );
};
