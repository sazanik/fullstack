import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import 'reflect-metadata';

import { AuthController } from './services/auth/auth.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './helpers/logger/logger.interface';
import { NAMES } from './types/names';

@injectable()
export class App {
	app: Express;
	server?: Server;
	port: number;

	constructor(
		@inject(NAMES.ILogger) private logger: ILogger,
		@inject(NAMES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
		@inject(NAMES.AuthController) private authController: AuthController,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/', this.authController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);

		this.useRoutes();
		this.useExceptionFilter();
		this.logger.info('Server started on 8000 port');
	}
}
