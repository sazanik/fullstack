import { injectable } from 'inversify';

import { IAuthRepository, IUserModel } from '@models/index';
import { UserEntity } from '@entities/index';

@injectable()
export class AuthRepository implements IAuthRepository {
	async create({ name, password, email }: UserEntity): Promise<IUserModel> {
		return new Promise((resolve) => {
			resolve({ name, email, password });
		});
	}
	async find(email: string): Promise<IUserModel | null> {
		return new Promise((resolve) => {
			const user = { email, name: '', password: '' };

			resolve(user);
		});
	}
}

export default AuthRepository;
