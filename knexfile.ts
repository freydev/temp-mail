import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: "mail_service_db",
      user: "postgres",
      password: "vDAq81OI9*s#"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      extension: 'ts'
    }
  }
};

module.exports = config;
