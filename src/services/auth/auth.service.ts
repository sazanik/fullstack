import { injectable } from 'inversify';

import { IAuthService } from './auth.service.interface';
import { RegisterDto } from '../../dto/register.dto';
import { UserEntity } from '../../entity/user.entity';
import { LoginDto } from '../../dto/login.dto';

@injectable()
export class AuthService implements IAuthService {
	async createUser({ email, password, name }: RegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPassword(password);

		return null;
	}

	async validateUser({ email, password }: LoginDto): Promise<boolean> {
		return true;
	}
}
