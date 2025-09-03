const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await sequelize.sync();

    const existingAdmin = await User.findOne({ where: { email: 'admin@coop.com' } });
    if (existingAdmin) {
      console.log('Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'System Admin',
      email: 'admin@coop.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin account created:');
    console.log('Email: admin@coop.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
