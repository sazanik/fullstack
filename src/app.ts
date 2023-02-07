import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { Server } from 'http';
import 'reflect-metadata';

import { NAMES } from '@constants/index';
import { AuthController, ConfigService, LoggerService } from '@services/index';
import { ExceptionFilter } from '@errors/index';

@injectable()
export class App {
	app: Express;
	server?: Server;
	port: number;

	constructor(
		@inject(NAMES.LoggerService) private logger: LoggerService,
		@inject(NAMES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
		@inject(NAMES.AuthController) private authController: AuthController,
		@inject(NAMES.AuthController) private config: ConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/', this.authController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);

		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.logger.info('Server started on 8000 port');
	}
}
