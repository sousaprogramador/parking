require('dotenv/config');
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/infra/db/typeorm/entities/user.entity';

export const config = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [__dirname + '/**/infra/db/typeorm/migration/*.ts'],
  subscribers: [],
} as DataSourceOptions;

export const AppDataSource = new DataSource(config);
