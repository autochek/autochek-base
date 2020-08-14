

export class RequestChangePassword {
	/**
	 * 현재 비밀번호
	 */
	public CurrentPassword: string;
	/**
	 * 신규 비밀번호
	 */
	public NewPassword: string;
	/**
	 * 신규 비밀번호 확인
	 */
	public NewConfirmPassword: string;

	constructor(Password?: string, NewPassword?: string, NewConfirmPassword?: string) {
		this.CurrentPassword = Password;
		this.NewPassword = NewPassword;
		this.NewConfirmPassword = NewConfirmPassword;
	}
}


