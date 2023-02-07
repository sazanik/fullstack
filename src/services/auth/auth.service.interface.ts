import { RegisterDto } from '../../dto/register.dto';
import { UserEntity } from '../../entity/user.entity';
import { LoginDto } from '../../dto/login.dto';

export interface IAuthService {
	createUser: (dto: RegisterDto) => Promise<UserEntity | null>;
	validateUser: (dto: LoginDto) => Promise<boolean>;
}
