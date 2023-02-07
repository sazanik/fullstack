import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { NAMES } from '@constants/index';
import { LoggerService } from '@services/index';

export interface IConfigService {
	get: (key: string) => string | undefined;
}

@injectable()
export class ConfigService implements IConfigService {
	private readonly config?: DotenvParseOutput;

	constructor(@inject(NAMES.LoggerService) private logger: LoggerService) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error("File .env can't be read, it probably doesn't exist");
		} else {
			this.logger.info('[ConfigService] config loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string | undefined {
		if (this.config) {
			return this.config[key];
		}
	}
}

export default ConfigService;
