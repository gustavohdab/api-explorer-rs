require('express-async-errors');

const AppError = require('./utils/App.Error');
const runMigrations = require('./database/sqlite/migrations');

const express = require('express');

const routes = require('./routes');

runMigrations();

const app = express();
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} and can be accessed at http://localhost:${PORT}`
  );
});
