import { IsEmail, IsString } from 'class-validator';

import { IAuthDto } from '@DTOs/index';

class RegisterDto implements IAuthDto {
	@IsString({ message: 'Incorrect value' })
	name!: string;

	@IsEmail({}, { message: 'Incorrect value' })
	email!: string;

	@IsString({ message: 'Incorrect value' })
	password!: string;
}

export default RegisterDto;
