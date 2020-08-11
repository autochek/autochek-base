

export class RequestChangePassword {
	public Password: string;
	public NewPassword: string;
	public NewConfirmPassword: string;

	constructor(Password?: string, NewPassword?: string, NewConfirmPassword?: string) {
		this.Password = Password;
		this.NewPassword = NewPassword;
		this.NewConfirmPassword = NewConfirmPassword;
	}
}


