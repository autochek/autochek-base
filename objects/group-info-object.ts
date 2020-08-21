import * as firebase from 'firebase';
import {EnumGroupType} from 'autochek-base/enums/enum-group-type.model';
import moment from 'moment';

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
	 * 관리자 아이디
	 */
	adminId: string = "";

	/**
	 * 관리자명
	 */
	adminName: string;

	/**
	 * 관리자 이메일
	 */
	adminEmail: string;

	/**
	 * 관리자 화면 표시명
	 */
	adminDisplayName: string;

	/**
	 * 그룹 타입
	 */
	groupType: EnumGroupType = EnumGroupType.Hospital;

	/**
	 * 전화번호
	 */
	telNo: string = "";

	/**
	 * 사업자번호
	 */
	businessNo: string = "";

	/**
	 * 우편번호
	 */
	postCode: string = "";

	/**
	 * 도로명 주소
	 */
	roadAddress: string = "";

	/**
	 * 추가 주소
	 */
	extraAddress: string = "";

	/**
	 * 상세 주소
	 */
	detailAddress: string = "";

	/**
	 * Supervisor 그룹인지 여부
	 */
	supervisorGroup: boolean = false;

	/**
	 * 등록일시
	 */
	regDate: Date | firebase.firestore.Timestamp;

	/**
	 * 수정일시
	 */
	modDate: Date | firebase.firestore.Timestamp;

	/**
	 * 삭제 여부
	 */
	isDeleted: boolean = false;

	/**
	 * 등록일시 문자열
	 */
	public get regDateString(): string {
		if(this.regDate instanceof Date)
			return moment(this.regDate).format("YYYY-MM-DD HH:mm:ss");
		else
			return moment(new Date((<any>this.regDate).seconds * 1000)).format("YYYY-MM-DD HH:mm:ss");
	}

	/**
	 * 수정일시 문자열
	 */
	public get modDateString(): string {
		if(this.modDate instanceof Date)
			return moment(this.modDate).format("YYYY-MM-DD HH:mm:ss");
		else
			return moment(new Date((<any>this.modDate).seconds * 1000)).format("YYYY-MM-DD HH:mm:ss");
	}

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
			this.modDate = new Date();
		}

		// 아이디가 존재하는 경우
		if (uid) {
			this.uid = uid;
		}
	}
}
