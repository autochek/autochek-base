import * as moment from 'moment';
import * as Hangul from 'hangul-js';

export interface DaySummaryWithArray<T> {
	date: Date;
	value: T[];
}

export class DaySummaryWithArray<T> {
	constructor(date: Date) {
		this.date = date;
		this.value = new Array<T>();
	}
}

export function splitArrayByDate<T>(arr: T[], keyname = 'date', timeunit: moment.unitOfTime.StartOf = 'day'): DaySummaryWithArray<T>[] {
	const setDate: string[] = [];
	const result: DaySummaryWithArray<T>[] = new Array<DaySummaryWithArray<T>>();

	for (const data of arr) {
		const pk: Date = moment(data[keyname]).startOf(timeunit).toDate();
		const keystring = moment(pk).toISOString();

		if (!setDate.includes(keystring)) {
			setDate.push(keystring);
			result.push(new DaySummaryWithArray<T>(pk));
		}

		const index = setDate.indexOf(keystring);
		result[index].value.push(data);
	}
	return result;
}

export function fillArrayWithDate<T>(arr: DaySummaryWithArray<T>[], sdate: Date, edate: Date,
									 timeunit: moment.unitOfTime.DurationConstructor = 'day'): DaySummaryWithArray<T>[] {

	const result = [];
	for (const diter = moment(sdate).startOf(timeunit); diter < moment(edate); diter.add(1, timeunit)) {
		const filtered = arr.filter((a) => moment(a.date).isSame(diter, timeunit));
		if (filtered.length === 0) {
			result.push(new DaySummaryWithArray<T>(diter.toDate()));
		} else {
			result.push(filtered[0]);
		}
	}
	return result;
}

export interface ArrayStatistic {
	min: number;
	max: number;
	count: number;
	average: number;
	stdev: number;
}

export function getArrayStatistic(arr: number[]): ArrayStatistic {
	return {
		min: minvalue(arr),
		max: maxvalue(arr),
		count: arr.length,
		average: average(arr),
		stdev: stdev(arr)
	}
}

export function getDaysAgoMoment(daysago: number): moment.Moment {
	return moment().startOf('day').subtract(daysago - 1, 'day');
}


export function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function minvalue(values: number[]): number {
	const mini = minindex(values);
	return values[mini];
}

export function minindex(values: number[]): number {
	if (values.length <= 0) {
		return 0;
	}
	let min = values[0];
	let idx = 0;

	values.forEach(
		(val, i) => {
			if (val < min) {
				min = val;
				idx = i;
			}
		}
	)
	return idx;
}

export function maxvalue(values: number[]): number {
	const maxi = maxindex(values);
	return values[maxi];
}

export function maxindex(values: number[]): number {
	if (values.length <= 0) {
		return 0;
	}
	let max = values[0];
	let idx = 0;
	values.forEach(
		(val, i) => {
			if (val > max) {
				max = val;
				idx = i;
			}
		}
	)

	return idx;
}

export function average(values: any[]): number {
	let sum = 0;
	let count = 0;

	for (const val of values) {
		if (val) {
			sum += val;
			count += 1;
		}
	}
	if (count === 0) {
		return 0;
	}
	return sum / count;
}

export function stdev(values: any[]): number {
	if (values.length === 0) {
		return 0;
	}

	const avg = average(values);
	const diffs = values.map((val) => val - avg);
	const squares = diffs.map((val) => val * val);
	const sos = squares.reduce((prev, next) => prev + next, 0);
	return Math.sqrt(sos);
}


export function makeid(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


export function flatArray<T>(arr: T[][]): T[] {
	return [].concat.apply([], arr);
}

/**
 * 주어진 문자열에서 초성들만 뽑은 문자열을 반환한다.
 * @param value 처리할 문자열
 * @return 초성 문자열
 */
export function disassembleHangul(value: string): string {
	let result: string = value;
	const chars: string[] = [];

	// 기관명이 존재하는 경우
	if(value && value.length > 0) {
		// 문자열의 모든 글자에 대해서 처리
		for (var index = 0; index < value.length; index++) {

			// 글자를 자음/모음 분리
			const disassembles: string[] = Hangul.disassemble(value.charAt(index));
			// 분리된 자음/모음이 존재하는 경우, 초성을 목록에 추가
			if(disassembles && disassembles.length > 0)
				chars.push(disassembles[0]);
		}

		// 추가된 초성들을 문자열로 변환
		result = chars.join('');
	}

	return result;
}
