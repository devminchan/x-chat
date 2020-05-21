module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number.parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'x_chat',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
 