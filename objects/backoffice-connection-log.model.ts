/**
 * 백오피스 접속 로그 클래스
 */
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
	 * 생성자
	 */
	constructor() {
	}
}


