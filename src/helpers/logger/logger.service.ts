import { Logger } from 'tslog';

export class LoggerService {
	public logger: Logger<undefined>;

	constructor() {
		this.logger = new Logger({
			name: 'MAIN',
		});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
