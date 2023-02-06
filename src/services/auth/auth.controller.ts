import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { BaseController } from '../../common/base.controller';
import { HttpMethods } from '../../types/HttpMethods';
import { HttpError } from '../../errors/http-error.class';
import { NAMES } from '../../types/names';
import { ILogger } from '../../helpers/logger/logger.interface';
import { IAuthController } from './auth.controller.interface';

@injectable()
export class AuthController extends BaseController implements IAuthController {
	constructor(@inject(NAMES.ILogger) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/register', method: HttpMethods.POST, func: this.register },
			{ path: '/login', method: HttpMethods.POST, func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Non authorized', 'login'));
		// this.sendOk(res, 'OK login');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.sendOk(res, 'OK register');
		next();
	}
}
