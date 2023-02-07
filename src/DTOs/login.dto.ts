import { IAuthDto } from '@DTOs/index';

class LoginDto implements IAuthDto {
	email!: string;
	password!: string;
}

export default LoginDto;
