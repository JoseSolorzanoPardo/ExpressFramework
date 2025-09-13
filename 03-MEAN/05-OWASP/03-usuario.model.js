const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ["admin", "user"], 
    default: "user" 
  }
});

module.exports = mongoose.model('usuario', userSchema);
