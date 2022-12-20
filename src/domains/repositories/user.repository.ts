import { User } from '../models';

export interface IUserRepository {
  create(user: User): Promise<void>; // Sign up
  update(user: User): Promise<void>; // update User Information
  findByEmail(email: string): Promise<User>; //
  findById(id: string): Promise<User>; // get User by ID
}
