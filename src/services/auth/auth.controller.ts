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
import { UserEntity } from '../../entity/user.entity';

@injectable()
export class AuthController extends BaseController implements IAuthController {
	constructor(@inject(NAMES.ILogger) logger: ILogger) {
		super(logger);

		this.bindRoutes([
			{ path: '/register', method: HttpMethods.POST, func: this.register },
			{ path: '/login', method: HttpMethods.POST, func: this.login },
		]);
	}

	login({ body }: Request<{}, {}, LoginDto>, res: Response, next: NextFunction): void {
		// next(new HttpError(401, 'Non authorized', 'login'));
		this.logger.info(body);
		this.sendOk(res, 'OK login');
		next();
	}

	async register(
		{ body }: Request<{}, {}, RegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new UserEntity(body.email, body.name);
		await newUser.setPassword(body.password);

		this.logger.info(body);
		this.sendOk(res, newUser);
		next();
	}
}
