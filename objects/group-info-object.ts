import * as firebase from 'firebase';

/**
 * 기관정보 클래스
 */
export class GroupInfo {
	/**
	 * 아이디
	 */
	uid: string = "";

	/**
	 * 기관명
	 */
	groupName: string = "";

	/**
	 * 초성명
	 */
	firstCharName: string = "";

	/**
	 * 표시 순서
	 */
	idx: number = 0;

	/**
	 * 등록일시
	 */
	regDate: Date | firebase.firestore.Timestamp;

	/**
	 * 수정일시
	 */
	modDate: Date | firebase.firestore.Timestamp;

	/**
	 * 생성자
	 * @param uid 아이디
	 * @param cloneSource 복제할 객체
	 */
	constructor(uid?: string, cloneSource?: any) {
		// 복제할 객체가 존재하는 경우
		if (cloneSource) {
			Object.assign(this, cloneSource);
		}
		// 복제할 객체가 존재하지 않는 경우
		else {
			this.regDate = new Date();
		}

		// 아이디가 존재하는 경우
		if(uid) {
			this.uid = uid;
		}
	}
}
