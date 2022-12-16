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
      VALUES ($1, $2 , $3 , $4 , $5) RETURNING id, email , user_name, first_name , last_name `;
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
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT id, email , user_name , first_name , last_name from users';
      const result = await connection.query(sql);
      connection.release;
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retriving users ${(error as Error).message}`);
    }
  }
  //get specific user
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `SELECT id, email , user_name , first_name , last_name from users where id = ($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error at retriving user ${(error as Error).message}`);
    }
  }
  //update user
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `UPDATE users SET email=$1, user_name=$2 , first_name=$3 , last_name=$4 , password=$5
      WHERE id =$6
      RETURNING id, email , user_name , first_name , last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't update user ${(error as Error).message}`);
    }
  }
  //delete user
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE from users 
      WHERE id = ($1)
      RETURNING id, email , user_name, first_name , last_name`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete user ${(error as Error).message}`);
    }
  }
  //authenticate user
}
export default UserModel;
