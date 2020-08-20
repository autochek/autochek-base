/**
 * 백오피스 접속 로그 클래스
 */
import moment from 'moment';

export class BackofficeConnectionLog {
	/**
	 * 로그 아이디
	 */
	public logId: string = "";
	/**
	 * 사용자 아아디
	 */
	public userId: string = "";
	/**
	 * 사용자명
	 */
	public userName: string;
	/**
	 * 사용자 이메일
	 */
	public userEmail: string;
	/**
	 * 사용자 화면 표시명
	 */
	public userDisplayName: string;
	/**
	 * 기관 아이디
	 */
	public groupId: string;
	/**
	 * 기관명
	 */
	public groupName: string;
	/**
	 * 접속 아이피
	 */
	public ipAddress: string;
	/**
	 * 접속 시간
	 */
	public loginTime: Date;
	/**
	 * 마지막 활동 시간
	 */
	public lastActivityTime: Date;

	/**
	 * 접속 시간 문자열
	 */
	public get loginTimeString(): string {
		if(this.loginTime instanceof Date)
			return moment(this.loginTime).format("YYYY-MM-DD HH:mm:ss");
		else
			return moment(new Date((<any>this.loginTime).seconds * 1000)).format("YYYY-MM-DD HH:mm:ss");
	}

	/**
	 * 마지막 활동 시간 문자열
	 */
	public get lastActivityTimeString(): string {
		if(this.lastActivityTime instanceof Date)
			return moment(this.lastActivityTime).format("YYYY-MM-DD HH:mm:ss");
		else
			return moment(new Date((<any>this.lastActivityTime).seconds * 1000)).format("YYYY-MM-DD HH:mm:ss");
	}

	/**
	 * 생성자
	 */
	constructor() {
		this.loginTime = new Date();
	}
}


