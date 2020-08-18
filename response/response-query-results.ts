/**
 * 단일 데이터 응답 클래스
 */
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export class QueryResults<T> {
	/**
	 * 전체 데이터 수
	 */
	public totalCount : number;
	/**
	 * 페이지당 레코드 수
	 */
	public countPerPage : number;
	/**
	 * 스킵 수
	 */
	public skips: number;
	/**
	 * 페이지 번호
	 */
	public get pageNo() : number {
		return Math.floor(this.skips / this.countPerPage) + 1;
	}
	/**
	 * 전체 페이지 수
	 */
	public get totalPageCount() : number {
		return this.totalCount == 0 || this.countPerPage <= 0 ? 1 : Math.ceil(this.totalCount / this.countPerPage);
	}
	/**
	 * 결과 목록
	 */
	public items: Array<T>;

	/**
	 * 생성자
	 * @param result 처리 성공 여부
	 * @param message 성공/에러 메세지
	 * @param data 데이터
	 */
	constructor(items?: Array<T>, totalCount?: number, skips?: number, countPerPage?: number) {
		this.skips = skips;
		this.countPerPage = countPerPage;
		this.items = items;
		this.totalCount = totalCount;
	};
}

/**
 * FireStore 필드 정렬 정보
 */
export class FireStoreDataOrder {
	/**
	 * 필드명
	 */
	public field: string = '';
	/**
	 * 정렬 방향
	 */
	public direction: 'asc' | 'desc' = 'asc';

	/**
	 * 생성자
	 * @param field 필드명
	 * @param direction 정렬 방향
	 * @param data 데이터
	 */
	constructor(field: string, direction?: 'asc' | 'desc') {
		this.field = field;
		if(direction)
			this.direction = direction;
	};
}

/**
 * FireStore 조건 정보
 */
export class FireStoreCondition {
	/**
	 * 필드명
	 */
	public field: string = '';
	/**
	 * 연산자
	 */
	public operator: WhereFilterOp;
	/**
	 * 비교값
	 */
	public value: any;

	/**
	 * 생성자
	 * @param field 필드명
	 * @param operator 연산자
	 * @param value 비교값
	 */
	constructor(field: string, operator: WhereFilterOp, value: any) {
		this.field = field;
		this.operator = operator;
		this.value = value;
	};
}
