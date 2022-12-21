const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/App.Error');
const sqliteConnection = require('../database/sqlite');

class UserController {
  async create(req, res) {
    const {
      name,
      email,
      password,
    } = req.body;

    const database = await sqliteConnection();

    const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if (checkUserExist) {
      throw new AppError('User already exists', 400);
    } else if (!name || !email || !password) {
      throw new AppError('Missing required fields', 400);
    } else if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    } else if (name.length < 3) {
      throw new AppError('Name must be at least 3 characters', 400);
    }

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return res.status(201).json();
  }

  async update(req, res) {
    const {
      name,
      email,
      password,
      old_password,
    } = req.body;
    const { id } = req.params;

    const database = await sqliteConnection();

    const checkUserExist = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!checkUserExist) {
      throw new AppError('User not found', 404);
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== checkUserExist.id) {
      throw new AppError('Email already in use', 400);
    }

    name ?? (name = checkUserExist.name);
    email ?? (email = checkUserExist.email);

    if (password && !old_password) {
      throw new AppError('Old password is required', 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, checkUserExist.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match', 400);
      } else if (password.length < 6) {
        throw new AppError('Password must be at least 6 characters', 400);
      }

      const hashedPassword = await hash(password, 8);

      await database.run('UPDATE users SET name = (?), email = (?), password = (?), updated_at = datetime("now") WHERE id = (?)', [name, email, hashedPassword, id]);

      return res.status(200).json();
    }

    await database.run('UPDATE users SET name = (?), email = (?), updated_at = datetime("now") WHERE id = (?)', [name, email, id]);

    return res.status(200).json();
  }

}

module.exports = UserController;