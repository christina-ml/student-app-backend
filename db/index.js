const pgp = require ('pg-promise')(); // npm install pg-promise

require ("dotenv").config();

// when running in production - tell heroku to please reach out to DB_URL (on Heroku in Config Vars)

const databaseUrl = process.env.DB_URL; // set this variable in .env

const cn = {
    connectionString : databaseUrl,
    allowExitOnIdle: true,
    max: 30
}

const db = pgp(cn);

module.exports = db;
