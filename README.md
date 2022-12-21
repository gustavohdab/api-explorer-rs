<div align="center">

# Bunch of annotations about Node.js

</div>

# server.js

- server.js is the main file of the application. It is the entry point of the application. It is the file that starts the server.

# Express.js

- Express.js is a web application framework for Node.js. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

# Routes

- Routes are the endpoints of the application. They are the URLs that the user can access. They are the URLs that the user can send requests to.

# Controllers

- Controllers are the functions that handle the requests. They are the functions that handle the requests and send the responses.

#

# WHAT IS THE HTTP VERBS: GET, POST, PUT, DELETE, PATCH

- GET: Get a resource
- POST: Create a resource
- PUT: Update a resource
- DELETE: Delete a resource
- PATCH: Update a resource partially (update a specific field).

- You should use ":" before the name of the parameter you want to get
- You can use multiple parameters
- You can use the same parameter multiple times
- You learned about params.
- Params are used to get a specific resource not all resources.
- To get all resources you should use query parameters.
- You can send params in the url like this: http://localhost:3333/message/1/John
- You can get the params in the controller like this:
  const { id, name } = req.params;
- You can send a response with a status code like this:
  res.status(200).send('You sent a GET request');

- Query parameters are used to get all resources, not a specific resource like params do. And they are used to filter the resources, to get a specific resource, to get a specific set of resources, to get a specific set of resources with a specific property.
- You can send query parameters in the url like this: http://localhost:3333/users?name=John&age=25

- You can send a response with a status code like this:
  res.status(201).send('You sent a POST request');
- You can send a response with a status code and a json object like this:
  res.status(201).json({ message: 'You sent a POST request' });

- index: GET to list several registers
- show: GET to list a single register
- create: POST to create a register
- update: PUT to update a register
- delete: DELETE to delete a register

# What is Middleware?

- Middleware is a function that has access to the request and response objects. It can do something with them, and then pass them on to the next middleware function in the chain. It can also end the request-response cycle by sending a response back to the client.

- What is SQL?
- SQL stands for Structured Query Language. SQL lets you access and manipulate databases. SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987.

# CRUD

- Create
- Read
- Update
- Delete

- Create in SQL is INSERT
- Read in SQL is SELECT
- Update in SQL is UPDATE
- Delete in SQL is DELETE

- How to create a column in an existing table?
- ALTER TABLE table_name ADD column_name datatype;
- How to delete an row in an existing table?
- DELETE FROM table_name WHERE condition;

# knex.js

- Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

- Migrations
- Migrations are a convenient way to alter your database schema over time in a consistent and easy way. Each migration is a file that is run in order to alter the database, and undo the changes when rolled back.
- Migrations methods:
- UP: method responsible for creating the table, or altering it.
- DOWN: method responsible for deleting the table, or reverting the alterations made in the UP method.

- Migration primary keys vs foreign keys
- Primary keys are used to identify a row in a table. They are unique and cannot be null.
- Foreign keys are used to establish a relationship between two tables. They are used to link two tables together.
- Cardinality is the number of relationships between two tables. It can be one-to-one, one-to-many, or many-to-many.

# npm vs npx

- npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. npm consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm Registry.

- npx is a package runner tool that comes with npm 5.2+ and higher. It allows you to run packages without installing them globally. It is similar to nvm which allows you to run different versions of Node.js on the same machine.
