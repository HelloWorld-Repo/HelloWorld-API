module.exports = {
  host: '127.0.0.1',
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  dialect: 'postgres',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    undescored: true,
    undescoredAll: true,
  },
};
