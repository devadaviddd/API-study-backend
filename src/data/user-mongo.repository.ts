import { User } from 'src/domains';
import { IUserRepository } from '../domains/repositories/user.repository';
export class UserMongoRepository implements IUserRepository {
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
