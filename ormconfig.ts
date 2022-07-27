import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: '192.168.122.185',
  port: 5432,
  username: 'nmrl',
  password: 'password',
  database: 'instore',
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  synchronize: true, // Must be false in production mode
};

export default config;
