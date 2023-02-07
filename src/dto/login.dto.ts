import { IAuthDto } from '../common/auth.dto.interface';

export class LoginDto implements IAuthDto {
	email!: string;
	password!: string;
}
