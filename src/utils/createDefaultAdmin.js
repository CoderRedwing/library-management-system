const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Ajitesh123', 10);
            const admin = new User({
                name: 'Ajitesh',
                email: 'ajitesh@example.com',
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin created');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error creating admin:', error.message);
    }
};

module.exports = createDefaultAdmin;
