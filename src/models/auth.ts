import { NextFunction, Request, Response } from 'express';
import { LoginDto, RegisterDto } from '@DTOs/index';
import { UserEntity } from '@entities/index';
import { IUserModel } from '@models/index';

export interface IAuthController {
	login: (reg: Request, res: Response, next: NextFunction) => void;
	register: (reg: Request, res: Response, next: NextFunction) => void;
}

export interface IAuthRepository {
	create: (user: UserEntity) => Promise<IUserModel>;
	find: (email: string) => Promise<IUserModel | null>;
}

export interface IAuthService {
	createUser: (dto: RegisterDto) => Promise<IUserModel | null>;
	validateUser: (dto: LoginDto) => Promise<boolean>;
}
