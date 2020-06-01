// require("dotenv").config();

var config = {};

config = {
  app: {
    port: 3016
  },
  db: {
    dbname: "todo_app",
    username: "root",
    password: "",
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      mib: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
console.log(config);
module.exports = config;
