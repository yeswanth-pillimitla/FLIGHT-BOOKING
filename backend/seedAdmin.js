const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    const adminEmail = 'admin@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      existingAdmin.password = 'admin@123';
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin password updated successfully.');
    } else {
      const adminUser = new User({
        name: 'Admin User',
        email: adminEmail,
        password: 'admin@123',
        role: 'admin'
      });

      await adminUser.save();
      console.log('Admin user created successfully.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
