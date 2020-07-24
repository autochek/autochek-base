import * as firebase from 'firebase';
import * as moment from 'moment';

/**
 * 단일 데이터 응답 클래스
 */
export class ResponseObject<T> {
	/**
	 * 처리 성공 여부
	 */
	public result: boolean;
	/**
	 * 성공/에러 메세지
	 */
	public message: string;
	/**
	 * 데이터
	 */
	public data: T;

	/**
	 * 생성자
	 * @param result 처리 성공 여부
	 * @param message 성공/에러 메세지
	 * @param data 데이터
	 */
	constructor(result?: boolean, message?: string, data?: T) {
		this.result = result;
		this.message = message;
		this.data = data;
	};
}

/**
 * 단일 데이터 응답 클래스
 */
export class ResponseData {
	/**
	 * 처리 성공 여부
	 */
	public result: boolean;
	/**
	 * 성공/에러 메세지
	 */
	public message: string;

	/**
	 * 생성자
	 * @param result 처리 성공 여부
	 * @param message 성공/에러 메세지
	 */
	constructor(result?: boolean, message?: string) {
		this.result = result;
		this.message = message;
	};
}
