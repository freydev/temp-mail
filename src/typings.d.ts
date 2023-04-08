import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface EmailData {
    id?: number;
    recipient: string;
    body: Buffer;
  }

  interface Tables {
    emails_data: EmailData
  }
}
