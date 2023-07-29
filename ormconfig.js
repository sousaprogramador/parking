module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  entities: ['dist/**/infra/typeorm/migration/*.entity.js'],
  migrations: ['dist/**/infra/typeorm/migration/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migration',
  },
};
