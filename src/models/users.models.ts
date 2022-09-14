import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
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

  public async getByUsername(username: string): Promise<User | string> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );
    if (!result[0]) {
      return 'Username or password invalid';
    }
    return result[0] as User;
  }

  public async getById(username: string): Promise<number> {
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );
    const [rows] = result as RowDataPacket[];
    const { id } = rows;
    return id;
  }
}