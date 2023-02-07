import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { BaseController } from '@common/index';
import { ValidateMiddleware } from '@helpers/index';
import { HttpError } from '@errors/index';
import { HTTP_METHODS, NAMES } from '@constants/index';
import { LoginDto, RegisterDto } from '@DTOs/index';
import { LoggerService, AuthService } from '@services/index';

interface IAuthController {
	login: (reg: Request, res: Response, next: NextFunction) => void;
	register: (reg: Request, res: Response, next: NextFunction) => void;
}

@injectable()
class AuthController extends BaseController implements IAuthController {
	constructor(
		@inject(NAMES.LoggerService) private logger: LoggerService,
		@inject(NAMES.AuthService) private auth: AuthService,
	) {
		super(logger);

		this.bindRoutes([
			{
				path: '/register',
				method: HTTP_METHODS.POST,
				func: this.register,
				middlewares: [new ValidateMiddleware(RegisterDto)],
			},
			{ path: '/login', method: HTTP_METHODS.POST, func: this.login },
		]);
	}

	login({ body }: Request<{}, {}, LoginDto>, res: Response, next: NextFunction): void {
		this.logger.info(body);
		this.sendOk(res, 'OK login');
		next();
	}

	async register(
		{ body }: Request<{}, {}, RegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = await this.auth.createUser(body);

		if (!newUser) {
			return next(new HttpError(422, 'Such a user already exists'));
		}

		this.logger.info(newUser);
		this.sendOk(res, { email: newUser.email });
		next();
	}
}

export default AuthController;
