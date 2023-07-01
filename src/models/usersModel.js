const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
  },
  name:{
    type: String,
  },
  password:{
    type: String,
  },
  given_name:{
    type: String,
  },
  family_name:{
    type: String,
  },
  picture:{
    type: String,
  },
},
  { timestamps: true }
);
const UsersModel = mongoose.models.users || mongoose.model('users', UsersSchema);
export default UsersModel;
