const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const admins = [
  {
    name: 'Air India Admin',
    email: 'admin@airindia.com',
    password: 'admin123_airindia',
    role: 'admin'
  },
  {
    name: 'Indigo Admin',
    email: 'admin@indigo.com',
    password: 'admin123_indigo',
    role: 'admin'
  },
  {
    name: 'Emirates Admin',
    email: 'admin@emirates.com',
    password: 'admin123_emirates',
    role: 'admin'
  }
];

const seedAirlineAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    for (const adminData of admins) {
      const existingAdmin = await User.findOne({ email: adminData.email });

      if (existingAdmin) {
        console.log(`Updating existing admin: ${adminData.email}`);
        existingAdmin.password = adminData.password;
        existingAdmin.role = 'admin';
        await existingAdmin.save();
      } else {
        const adminUser = new User(adminData);
        await adminUser.save();
        console.log(`Created new admin: ${adminData.email}`);
      }
    }

    console.log('Admin seeding completed.');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAirlineAdmins();
