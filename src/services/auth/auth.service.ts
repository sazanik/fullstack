import { inject, injectable } from 'inversify';

import { LoginDto, RegisterDto } from '@DTOs/index';
import { UserEntity } from '@entities/index';
import { NAMES } from '@constants/index';
import { ConfigService } from '@services/index';

interface IAuthService {
	createUser: (dto: RegisterDto) => Promise<UserEntity | null>;
	validateUser: (dto: LoginDto) => Promise<boolean>;
}

@injectable()
class AuthService implements IAuthService {
	constructor(@inject(NAMES.ConfigService) private config: ConfigService) {}

	async createUser({ email, password, name }: RegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.config.get('SALT');

		console.log(salt);
		await newUser.setPassword(password, salt);

		return null;
	}

	async validateUser({ email, password }: LoginDto): Promise<boolean> {
		return true;
	}
}

export default AuthService;
