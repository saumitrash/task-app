const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  // an array because perhaps the user may want to use multiple devices
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  // remove this hard-coded secret and use environment variable
  const token = jwt.sign({ userId: user._id.toString() }, "your_secret_key", {
    expiresIn: "24h",
  });
  // When a token expires, the server will reject requests using that token,
  // forcing the client to authenticate again (usually by logging in).
  // The server does not need to manually remove or invalidate the token.
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
