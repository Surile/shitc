import { registerAs } from '@nestjs/config'

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PORT, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env

export const databaseConfig = registerAs('database', () => ({
  host: DATABASE_HOST || 'localhost',
  port: parseInt(DATABASE_PORT, 10) || 3306,
  password: DATABASE_PASSWORD || 'zly980320..',
  username: DATABASE_USERNAME || 'root',
  database: DATABASE_NAME || 'shitc',
  entities: ['dist/**/**/*.entity{.ts,.js}']
}))
