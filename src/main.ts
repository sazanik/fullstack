import { App } from './app';
import { Container, ContainerModule, interfaces } from 'inversify';

import { LoggerService } from './helpers/logger/logger.service';
import { AuthController } from './services/auth/auth.controller';
import { ExceptionFilter, IExceptionFilter } from './errors/exception.filter';
import { ILogger } from './helpers/logger/logger.interface';
import { NAMES } from './types/names';
import { IAuthController } from './services/auth/auth.controller.interface';
import { IAuthService } from './services/auth/auth.service.interface';
import { AuthService } from './services/auth/auth.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(NAMES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(NAMES.ExceptionFilter).to(ExceptionFilter);
	bind<IAuthController>(NAMES.AuthController).to(AuthController);
	bind<IAuthService>(NAMES.AuthService).to(AuthService);
	bind<App>(NAMES.App).to(App);
});

const bootstrap = (): { app: App; appContainer: Container } => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(NAMES.App);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
