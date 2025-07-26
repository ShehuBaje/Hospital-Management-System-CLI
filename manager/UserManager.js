const {readData, writeData} = require('../utils/fileHandler');
const {hashPassword, comparePassword} = require('../utils/password');

const USERS_FILE = 'users.json';

class UserManager {
    static async registerAdmin(name, email, password) {
        const users = await readData(USERS_FILE);
        const exists = users.find(u => u.email === email);
        if (exists) throw new Error('User already exists.');

        const hashedPassword = await hashPassword(password);
        const admin = {id: Date.now(), name, email, password: hashedPassword, role: 'admin'};
        users.push(admin);
        await writeData(USERS_FILE, users);
        return admin;
    }

    static async loginAdmin(email, password) {
        const users = await readData(USERS_FILE);
        const admin = users.find(u => u.email === email && u.role === 'admin');
        if (!admin) throw new Error('Admin not found');

        const yesMatch = await comparePassword(password, admin.password);
        if (!yesMatch) throw new Error('Invalid password');
        return admin;
    }

    static async registerDoctor(name, email) {
        const users = await readData(USERS_FILE);
        const exists = users.find(u => u.email === email);
        if (exists) throw new Error('Doctor already exists');

        const doc = {id: Date.now(), name, email, role: 'doctor'};
        users.push(doc);
        await writeData(USERS_FILE, users);
        return doc;
    }

    static async getAllUsers() {
        return await readData(USERS_FILE);
    }

    static async deleteUser(id) {
        let users = await readData(USERS_FILE);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) throw new Error('User does not exists.');
        users.splice(index, 1);
        await writeData(USERS_FILE, users);
    }
}

module.exports = UserManager;