import Database from 'better-sqlite3'
// import { User } from '../domain/entities/User'

// const options = { verbose: console.log }
export const DB = new Database('notesApp.db')

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    'id' VARCHARM,
    'name' VARCHARM,
    'username' VARCHARM,
    'age' INTEGER
  );`

DB.exec(createUserTable)
