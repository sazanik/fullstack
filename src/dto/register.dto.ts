import { IAuthDto } from '../common/auth.dto.interface';

export class RegisterDto implements IAuthDto {
	name!: string;
	email!: string;
	password!: string;
}
