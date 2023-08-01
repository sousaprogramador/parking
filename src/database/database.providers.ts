import { DataSource } from 'typeorm';
import { configDB } from './data-source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(configDB);

      return dataSource.initialize();
    },
  },
];
