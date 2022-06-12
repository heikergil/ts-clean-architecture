import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRespository'
import { DB } from '../../sqliteDB'

export class SqliteUserRepository implements UserRepository {
  private readonly db = DB

  async getAll(): Promise<User[]> {
    const stmt = this.db.prepare('SELECT * FROM users')
    const users = stmt.all()
    return users
  }

  async save(user: User): Promise<User> {
    this.db
      .prepare('INSERT INTO users VALUES ($id ,$name, $username, $age);')
      .run(user)
    return user
  }

  async getByUserName(username: string): Promise<User | null> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE username = ?')
    const user = stmt.get(username)
    if (user === undefined) {
      return null
    }
    return user
  }

  async update(user: User): Promise<User> {
    const stmt = this.db.prepare(
      'UPDATE users SET username = ?, name = ?, age = ?  WHERE id = ?'
    )
    stmt.run(user.username, user.name, user.age, user.id)

    const newUserStmt = this.db.prepare(
      'SELECT * FROM users WHERE username = ?'
    )
    const newUser = await newUserStmt.get(user.username)
    return newUser
  }

  async delete(user: User): Promise<void> {
    this.db.prepare('DELETE FROM users WHERE id = ?;').run(user.id)
  }

  async getById(id: string): Promise<User | null> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?')
    const user = await stmt.get(id)
    if (user === undefined) {
      return null
    }
    return user
  }
}
