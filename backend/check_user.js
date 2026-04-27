const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const user = await User.findOne({ email: 'pavanvk@gmail.com' }).select('+password');
    if (!user) {
      console.log('User not found');
    } else {
      console.log('User found:');
      console.log('Email:', user.email);
      console.log('Password hash:', user.password);
      
      const isMatch = await user.matchPassword('pavan123');
      console.log('Does pavan123 match?', isMatch);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUser();
