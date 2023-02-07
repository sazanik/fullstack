import { IAuthDto } from '../common/auth.dto.interface';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto implements IAuthDto {
	@IsString({ message: 'Incorrect value' })
	name!: string;

	@IsEmail({}, { message: 'Incorrect value' })
	email!: string;

	@IsString({ message: 'Incorrect value' })
	password!: string;
}
