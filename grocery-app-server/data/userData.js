// Users.js
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin'
  },
  {
    name: 'Thrishna',
    email: 'thrishna@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  },
  {
    name: 'Niharika',
    email: 'niharika@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  }
];

export default userData;
