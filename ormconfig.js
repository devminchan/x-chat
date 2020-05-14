module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'x_chat',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
