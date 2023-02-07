import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { BaseController } from '../../common/base.controller';
import { HttpMethods } from '../../types/HttpMethods';
import { NAMES } from '../../types/names';
import { ILogger } from '../../helpers/logger/logger.interface';
import { IAuthController } from './auth.controller.interface';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { AuthService } from './auth.service';
import { HttpError } from '../../errors/http-error.class';
import { ValidateMiddleware } from '../../helpers/validate/validate.middleware';

@injectable()
export class AuthController extends BaseController implements IAuthController {
	constructor(
		@inject(NAMES.ILogger) private logger: ILogger,
		@inject(NAMES.AuthService) private authService: AuthService,
	) {
		super(logger);

		this.bindRoutes([
			{
				path: '/register',
				method: HttpMethods.POST,
				func: this.register,
				middlewares: [new ValidateMiddleware(RegisterDto)],
			},
			{ path: '/login', method: HttpMethods.POST, func: this.login },
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
		const newUser = await this.authService.createUser(body);

		if (!newUser) {
			return next(new HttpError(422, 'Such a user already exists'));
		}

		this.logger.info(newUser);
		this.sendOk(res, { email: newUser.email });
		next();
	}
}
