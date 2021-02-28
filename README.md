# heroes-stone-api

This repository contains the backend of the application "My Marvel Universe", created for the Fullstack Developer technical test at [Stone](https://www.stone.com.br/).

### About - My Marvel Universe
  
The objective of this application is basically to list all heroes and comics from the Marvel Universe, and allow the user to create an account, favorite any comic and hero and check the favorite items.

### How to start

- Access the folder /marvel-heroes;
- Run 'npm install' to install all the dependencies;
- Configure the .env file with your database credentials;
- Run 'sequelize db:migrate' to create the tables on the database;
- Run 'npm start' to start the server.
- You can check the requisitions using the API editor of your preference (Insomnia, Postman).

### Routes

All the requisitions should be on the pattern: (address):(port)/api/marvel/(route)
The available routes on this api are:

- *POST* - **/login** - Realizes login;

- *GET* (Auth require) - **/user** - Get the data from a logged user;
- *POST* - **/user** - Creates a user profile;
- *PUT* (Auth require) - **/user** - Updates a user profile;

- *GET* (Auth require) - **/chars** - List all favorite chars from a logged user.
- *POST* (Auth require) - **/chars/:id** - Favorite one char by id.
- *DELETE* (Auth require) - **/chars/:id** - Unfavorite one char by id.

- *GET* (Auth require) - **/comics** - List all favorite comics from a logged user.
- *POST* (Auth require) - **/comics/:id** - Favorite one comic by id.
- *DELETE* (Auth require) - **/comics/:id** - Unfavorite one comic by id.

### Technologies and tools

- NodeJS (ExpressJS);
- PostgresSQL;
- Sequelize (for ORM);
- Heroku (for deploy/host);
- [Marvel API](https://developer.marvel.com/docs).

### Observations

- This API is hosted on Heroku, and can be accessed at https://heroes-stone-api.herokuapp.com/;
- A visual tool to check the requisitions wasn't developed yet.
- The available .env configs are pointing to the hosted database. If you prefer to use a local database, change the .env.
