import {QueryResults} from "autochek-base/objects/response-query-results";

/**
 * 데이터 목록 응답 클래스
 */
export class ResponseList<T> {
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
	public data: QueryResults<T>;

	/**
	 * 생성자
	 * @param result 처리 성공 여부
	 * @param message 성공/에러 메세지
	 * @param data 데이터
	 */
	constructor(result?: boolean, message?: string, data?: QueryResults<T>) {
		this.result = result;
		this.message = message;
		this.data = data;
	};
}
