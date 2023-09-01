import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: String,
  email: {
    type: String,
    unique: true,
  },
  senha: String,
});

const User = mongoose.model('User', userSchema);

export default User;