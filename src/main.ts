import { App } from './app';
import { Container, ContainerModule, interfaces } from 'inversify';

import { LoggerService } from './helpers/logger/logger.service';
import { AuthController } from './services/auth/auth.controller';
import { ExceptionFilter, IExceptionFilter } from './errors/exception.filter';
import { ILogger } from './helpers/logger/logger.interface';
import { NAMES } from './types/names';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(NAMES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(NAMES.ExceptionFilter).to(ExceptionFilter);
	bind<AuthController>(NAMES.AuthController).to(AuthController);
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
