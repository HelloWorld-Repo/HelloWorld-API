require('dotenv').config();

module.exports = {
  host: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    undescored: true,
    undescoredAll: true,
  },
};
