import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 33006,
  username: 'root',
  password: 'root',
  database: 'parking',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [__dirname + '/**/infra/db/typeorm/migration/*.ts'],
  subscribers: [],
});
