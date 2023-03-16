import { hash } from 'bcryptjs';

import { IUserModel } from '@models/index';

class UserEntity implements IUserModel {
	private _password: string;

	constructor(private readonly _email: string, private readonly _name: string) {
		this._password = '';
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt?: string): Promise<void> {
		if (salt) {
			this._password = await hash(password, Number(salt));
		}
	}
}

export default UserEntity;
