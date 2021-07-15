module.exports = {
  host: 'postgres',
  username: 'postgres',
  password: 'root',
  database: 'helloworld',
  dialect: 'postgres',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    undescored: true,
    undescoredAll: true,
  },
};
