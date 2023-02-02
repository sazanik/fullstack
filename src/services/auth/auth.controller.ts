import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller';
import { LoggerService } from '../../helpers/logger/logger.service';
import { HttpMethods } from '../../types/HttpMethods';

export class AuthController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger);
		this.bindRoutes([
			{ path: '/register', method: HttpMethods.POST, func: this.register },
			{ path: '/login', method: HttpMethods.POST, func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.sendOk(res, 'OK login');
		next();
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.sendOk(res, 'OK register');
		next();
	}
}
