import * as firebase from 'firebase';

/**
 * 기관정보 클래스
 */
export class AgencyInfo {
	/**
	 * 아이디
	 */
	id: string = "";

	/**
	 * 기관명
	 */
	name: string = "";

	/**
	 * 초성명
	 */
	firstCharName: string = "";

	/**
	 * 등록일시
	 */
	registeredDate: Date | firebase.firestore.Timestamp;

	/**
	 * 생성자
	 * @param id 아이디
	 * @param cloneSource 복제할 객체
	 */
	constructor(id?: string, cloneSource?: any) {

		// 아이디가 존재하는 경우
		if(id)
			this.id = id;

		// 복제할 객체가 존재하는 경우
		if (cloneSource) {
			Object.assign(this, cloneSource);
		}
		// 복제할 객체가 존재하지 않는 경우
		else {
			this.registeredDate = new Date();
		}

	}
}
