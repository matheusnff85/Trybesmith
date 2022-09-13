import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';
import createToken from '../helpers/createToken';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<string> {
    const { username, classe, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users(username, classe, level, password) VALUES (?, ?, ?, ?);',
      [username, classe, level, password],
    );
    const token = createToken(username, password);
    return token;
  }

  public async verifyUser(username: string, password: string): Promise<boolean> {
    const result = this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE Users.username = ? AND Users.password = ?;',
      [username, password],
    );
    if (!result) return false;
    return true;
  }
}