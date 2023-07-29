import { DataSource } from 'typeorm';
import { config } from './data-source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(config);

      return dataSource.initialize();
    },
  },
];
