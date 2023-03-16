import { inject, injectable } from 'inversify';

import { LoginDto, RegisterDto } from '@DTOs/index';
import { UserEntity } from '@entities/index';
import { NAMES } from '@constants/index';
import { AuthRepository, ConfigService } from '@services/index';
import { IAuthService, IUserModel } from '@models/index';

@injectable()
class AuthService implements IAuthService {
	constructor(
		@inject(NAMES.ConfigService) private config: ConfigService,
		@inject(NAMES.AuthRepository) private repository: AuthRepository,
	) {}

	async createUser({ email, password, name }: RegisterDto): Promise<IUserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.config.get('SALT');

		await newUser.setPassword(password, salt);

		const existedUser = await this.repository.find(email);

		if (existedUser) {
			return null;
		}

		return await this.repository.create(newUser);
	}

	async validateUser({ email, password }: LoginDto): Promise<boolean> {
		return true;
	}
}

export default AuthService;
