import db from '../database';
import User from '../types/user.type';

class UserModel {
  //create new user
  async create(u: User): Promise<User> {
    try {
      //open connection with DB
      const connection = await db.connect();
      //write query
      const sql = `INSERT INTO users (email, user_name , first_name , last_name , password) 
      VALUES ($1, $2 , $3 , $4 , $5) RETURNING * `;
      //run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      //relase connection
      connection.release();
      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.user_name}) : ${(error as Error).message}`
      );
    }
  }
  //get all users
  //get specific user
  //update user
  //delete user
  //authenticate user
}
export default UserModel;
