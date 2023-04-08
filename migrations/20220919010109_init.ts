import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('emails_data', table => {
      table.increments('id').index()
      table.string('recipient')
      table.binary('body')
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('emails_data')
}

