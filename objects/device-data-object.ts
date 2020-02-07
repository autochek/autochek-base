// ==============================class area ================================== //
import * as moment from 'moment';

import * as firebase from 'firebase';
import { getArrayStatistic, average } from 'autochek-base/Utils';
import { GlucoseGoal } from './user-goal';



export interface BodyscaleMeasurement {
  date: Date;
  weight: number;  // 0.1kg
  fat: number; // 266 -> 26.6%
  water: number;  // 513 -> 51.3%
  muscle: number; // 311 -> 31.1%
  bmr: number;  // 1487 -> 1487kcal
  visceral: number; // 47 -> 4.7%
  bone: number; // 28 -> 2.8kg
  bmi: number;
}



export type GmCondition = 'b_meal' | 'a_meal' | '';
export type GmTimeofday = 'breakfast' | 'lunch' | 'dinner' | 'sleep' | '';
export let GlucosemeterDaySummaryProperties = ['', 'morningBeforeMeal', 'morningAfterMeal',
  'afternoonBeforeMeal', 'afternoonAfterMeal',
  'eveningBeforeMeal', 'eveningAfterMeal', 'beforeSleep'];

export interface GlucosemeterMeasurement {
  date: Date;
  measurement: number; // unit : mg/gL
  condition: GmCondition; // '식전', '식후' 혹은 '공복'/'식후'
  timeofday: GmTimeofday; // 위의 condition과 조합하여 아침식전 점심식후 등과 같이 기록
  ignore: boolean; // 취침전은 b_meal(공복)+sleep일것. 야식먹고 자는사람이 아니라면
}

export interface GlucosemeterDaySummary {
  date: Date;
  morningBeforeMeal: number;
  morningAfterMeal: number;
  afternoonBeforeMeal: number;
  afternoonAfterMeal: number;
  eveningBeforeMeal: number;
  eveningAfterMeal: number;
  beforeSleep: number;
}

export interface HbA1C {
  date: Date;
  measurement: number;

}

// 오늘의 혈당


export interface BloodpressureMeasurement {
  date: Date;
  systolic: number;
  diastolic: number;
  mean: number;
  rate: number;
}

export interface BloodpressureStatistics {
  mean: number;
  min_diastolic: number;
  min_systolic: number;
  max_diastolic: number;
  max_systolic: number;
  count: number;
  count_under: number;
  count_over: number;
  count_normal: number;
}





// from Pedometer
export interface PedometerDaySummary {
  date: Date;
  step: number;
  cal: number;
  dist: number;
}

export interface PedometerSleepSummary {
  date: Date;
  deepSleep: number;
  lightSleep: number;
}

export interface PedometerSleepSegment {
  date: Date;
  sleepIndex: number;
}

export interface PedometerHeartrateSegment {
  date: Date;
  rate: number;
}

export interface PedometerTimeSegment {
  date: Date;
  duration: number;
  step: number;
  cal: number;
  dist: number;
}

export interface PedometerStatistics {
  sum: number;
  min: number;
  max: number;
  count: number;
  avg: number;
}

export interface FoodlensNutrition {
  calcium: number;
  calories: number;
  carbonhydrate: number;
  cholesterol: number;
  dietrayfiber: number;
  fat: number;
  protein: number;
  rawCalories: number;
  rawtotalGram: number;
  saturatedfat: number;
  sodium: number;
  sugar: number;
  totalgram: number;
  transfat: number;
  unit: string;
  vitamina: number;
  vitaminb: number;
  vitaminc: number;
  vitamind: number;
  vitamine: number;
}
export interface FoodlensRawUserSelectedFood {
  foodId: number;
  foodName: string;
  nutrition: FoodlensNutrition;
}
export interface FoodlensRawFoodPosition {
  eatAmount: number;
  foodImagePath: string;
  userSelectedFood: FoodlensRawUserSelectedFood;
  foodCandidates: any[];
}
export interface FoodlensRaw {
  eatDate: string;
  eatType: number;
  foodPositionList: FoodlensRawFoodPosition[];
  mealType: string;
  predictedImagePath: string;
}
// from Foodlens
export interface FoodlensPartial extends FoodlensNutrition {
  refPhoto: string; // use cloud store
  foodname: string;
  calories: number;
  eatAmount: number;
}
export interface FoodlensMeasurement {
  date: Date;
  refPhoto: string; // cloud store url
  composition: FoodlensPartial[];
  mealType: string;
  imgurl?: string;
}
export interface DaySummaryWithArray<T> {
  date: Date;
  value: T[];
}
export interface FoodlensDaySummary extends DaySummaryWithArray<FoodlensMeasurement> {
  date: Date;
  value: FoodlensMeasurement[];
  sumCalories: number;
}







export abstract class DeviceDataBase {


  abstract getPrimaryKey(): string;

  toObject() {
    return Object.assign({}, this);
  }

}
export class BodyscaleMeasurement extends DeviceDataBase {
  static deserializer(value: any): BodyscaleMeasurement {
    return new BodyscaleMeasurement(value);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmmss');
  }

  constructor(clone?: BodyscaleMeasurement) {
    super();
    if (clone) {
      Object.assign(this, clone);
      
    }
    if(!this.date) {
      this.date = new Date();
    }
    if (this.date instanceof firebase.firestore.Timestamp) {
      this.date = this.date.toDate();
    }
  }
}


export class GlucosemeterMeasurement extends DeviceDataBase {

  static arrangeGlucosemeterArrayByTimeAndCondition(arr: GlucosemeterMeasurement[], postprocess?: 'single' | 'average') {
    const result = [];
    for (let i = 0; i <= 7; i++) {
      result.push(arr.filter((gm: GlucosemeterMeasurement) => gm.getTimeIndex() === i));
    }
    if (!postprocess) {
      return result;
    }


    for (let i = 0; i <= 7; i++) {
      if (result[i].length > 0) {
        if (postprocess === 'single') {
          result[i] = result[i][0];
        }
        if (postprocess === 'average') {
          result[i] = Math.floor(getArrayStatistic(result[i]).average);
        }
      } else {
        result[i] = 0;
      }
    }
    return result;
  }


  static toSimpleArray(arr: GlucosemeterMeasurement[]): number[] {
    return arr.map((gm: GlucosemeterMeasurement) => gm.measurement);
  }

  static deserializer(value: any): GlucosemeterMeasurement {

    return new GlucosemeterMeasurement((value.date instanceof firebase.firestore.Timestamp) ? value.date.toDate() : value.date,
      Number(value.measurement),
      //typeof (value.measurement) === 'string' ? value.measurement.parseInt() : value.measurement,
      value.timeofday,
      value.condition);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmmss');
  }

  constructor(date: Date, measurement: number, timeofday?: GmTimeofday, condition?: GmCondition) {
    super();
    this.date = date;
    this.measurement = measurement;
    this.ignore = false;
    this.setCondition(timeofday, condition);
  }

  setCondition(timeofday: GmTimeofday, condition: GmCondition) {
    this.timeofday = timeofday;
    this.condition = condition;
  }

  getTimeIndex(): number {
    let offset = 0;
    switch (this.timeofday) {
      case 'breakfast':
        offset = 1;
        break;
      case 'lunch':
        offset = 3;
        break;
      case 'dinner':
        offset = 5;
        break;
      case 'sleep':
        offset = 7;
        break;
      default:
        offset = 0;
    }
    if (this.condition === 'b_meal') {
      offset += 0;
    }

    if (this.condition === 'a_meal') {
      offset += 1;
    }

    return offset;
  }
  getTimeString(): string {
    return ['분류 없음', '아침식사 전', '아침식사 후', '점심식사 전', '점심식사 후', '저녁식사 전', '저녁식사 후', '취침'][this.getTimeIndex()];
  }

}


export interface GlucosemeterStatistics {
  count: number;
  sum: number;
  countLow: number;
  countNormal: number;
  countHigh: number;
  min: number;
  max: number;
}
export class GlucosemeterStatistics {


  constructor(gm: GlucosemeterDaySummary, glucoseGoal: GlucoseGoal) {
    let sum = 0;
    let count = 0;

    let countLow = 0;
    let countHigh = 0;
    let countNormal = 0;

    let min = 0;
    let max = 0;
    for (const prop in gm) {
      const wgm = gm[prop];
      if (typeof (wgm) !== 'number') {
        continue;
      }


      // Sum and Count
      sum += wgm;
      count += 1;


      const hlc = gm.isHighLow(glucoseGoal, prop);
      // console.log('highlow', prop, hlc, gm[prop], glucoseGoal[prop])
      if (hlc > 0) {
        countHigh += 1;
      } else if (hlc < 0) {
        countLow += 1;
      } else {
        countNormal += 1;
      }


      // Min and Max
      if (min === 0) {
        min = wgm;
      }
      if (max === 0) {
        max = wgm;
      }

      if (min > wgm) {
        min = wgm;
      }
      if (max < wgm) {
        max = wgm;
      }

    }
    return { sum, count, countLow, countHigh, countNormal, min, max };
  }

}
export class GlucosemeterDaySummary {
  constructor(date?: Date) {
    if (date) {
      this.date = date;
    }
  }
  public static packFromGlucosemeterMeasurements(gms: GlucosemeterMeasurement[]): GlucosemeterDaySummary {


    const abundant = {};

    const gds = new GlucosemeterDaySummary();
    if (gms.length <= 0) {
      return gds;
    }

    gds.date = gms[0].date;



    for (const gm of gms) {
      const property = GlucosemeterDaySummaryProperties[gm.getTimeIndex()];
      if (!gds[property]) {
        gds[property] = gm.measurement;
      } else {
        if (!abundant[property]) {
          abundant[property] = [];
          abundant[property].push(gds[property]);
        }
        abundant[property].push(gm.measurement);
      }
    }

    for (const prop in abundant) {
      gds[prop] = average(abundant[prop]);
    }

    return gds;
  }

  public static fillEmptySummary(gms: GlucosemeterDaySummary[], sdate: Date, edate: Date) {
    const diter = moment(sdate).startOf('day');
    const eiter = moment(edate).endOf('day');
    const result = [];
    for (; diter <= eiter; diter.add(1, 'day')) {
      console.log(diter.toDate());
      const gmCandidate = gms.filter(
        (gm) => {
          return gm.date.getTime() >= diter.toDate().getTime() &&
            gm.date.getTime() < moment(diter).add(1, 'day').toDate().getTime();
        });
      console.log(gmCandidate);
      if (gmCandidate.length > 0) {
        // console.log('fillempty filter success', diter.toDate(), gmCandidate)
        result.push(gmCandidate[0]);
      } else {
        // console.log('fillempty filter fail', diter.toDate())
        result.push(new GlucosemeterDaySummary(diter.toDate()));
      }
    }
    // console.log('filempty result', result)
    return result;
  }

  getBmealAvg(): number {
    const numbers = [];
    const properties = ['morningBeforeMeal', 'afternoonBeforeMeal', 'eveningBeforeMeal'];
    for (const prop of properties) {
      if (this[prop]) {
        if (this[prop] instanceof GlucosemeterMeasurement) {
          numbers.push(this[prop].measurement);
        }
        if (typeof (this[prop] === 'number')) {
          numbers.push(this[prop]);
        }
      }
    }
    return average(numbers);
  }
  getAmealAvg(): number {
    const numbers = [];
    const properties = ['morningAfterMeal', 'afternoonAfterMeal', 'eveningAfterMeal'];
    for (const prop of properties) {
      if (this[prop]) {
        if (this[prop] instanceof GlucosemeterMeasurement) {
          numbers.push(this[prop].measurement);
        }
        if (typeof (this[prop] === 'number')) {
          numbers.push(this[prop]);
        }
      }
    }
    return average(numbers);
  }
  getSleepAvg(): number {
    const numbers = [];
    const properties = ['beforeSleep'];
    for (const prop of properties) {
      if (this[prop]) {
        if (this[prop] instanceof GlucosemeterMeasurement) {
          numbers.push(this[prop].measurement);
        }
        if (typeof (this[prop] === 'number')) {
          numbers.push(this[prop]);
        }
      }
    }
    return average(numbers);
  }

  public isHighLow(glucoseGoal: GlucoseGoal, property: string): number {

    let minthr = glucoseGoal.bMealMin;
    let maxthr = glucoseGoal.aMeal;

    if (!GlucosemeterDaySummaryProperties.includes(property)) {
      return 0;
    }

    const value = this[property];

    if (property.includes('Sleep')) {
      minthr = glucoseGoal.sleepMin;
      maxthr = glucoseGoal.sleep;
    } else {
      if (property.includes('BeforeMeal')) {
        minthr = glucoseGoal.bMealMin;
        maxthr = glucoseGoal.bMeal;
      } else if (property.includes('AfterMeal')) {
        minthr = glucoseGoal.aMealMin;
        maxthr = glucoseGoal.aMeal;
      }
    }

    // console.log('highlow check', minthr, maxthr, property, value)
    if (value < minthr) {
      return -1;
    }
    if (value > maxthr) {
      return 1;
    }
    return 0;

  }


}


export class PedometerDaySummary extends DeviceDataBase {

  static packFromPedometerTimeSegment(ptss: PedometerTimeSegment[]): PedometerDaySummary {
    if (ptss.length === 0) {
      return null;
    }

    return ptss.reduce(
      (prev, next) => {
        if (prev.date.getTime() < next.date.getTime()) {
          prev.date = next.date;
        }
        prev.step += next.step;
        prev.dist += next.dist;
        prev.cal += next.cal;

        return prev;
      },
      new PedometerDaySummary(new Date(0), 0, 0, 0)
    );
  }


  static deserializer(value: any): PedometerDaySummary {
    if (!value) {
      return null;
    }

    let date;

    if (!value.date) {
      date = new Date(0);
    }
    if (value.date instanceof firebase.firestore.Timestamp) {
      date = value.date.toDate();
    } else {
      date = value.date;
    }
    return new PedometerDaySummary(date, value.step, value.cal, value.dist);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDD');
  }
  constructor(public date: Date, public step: number, public cal: number, public dist: number) {
    super();
  }

}

export class PedometerSleepSummary extends DeviceDataBase {

  static deserializer(value: any): PedometerSleepSummary {
    if (!value) {
      return null;
    }
    if (value.date instanceof firebase.firestore.Timestamp) {
      return new PedometerSleepSummary(value.date.toDate(), value.deepSleep, value.lightSleep);
    } else {
      return new PedometerSleepSummary(value.date, value.deepSleep, value.lightSleep);
    }
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDD');
  }
  constructor(date: Date, public deepSleep: number, public lightSleep: number) {
    super();
    this.date = moment(date).startOf('day').toDate();
  }


}

export class PedometerSleepSegment extends DeviceDataBase {
  static deserializer(value: any): PedometerSleepSegment {
    if (!value) {
      return null;
    }
    if (value.date instanceof firebase.firestore.Timestamp) {
      return new PedometerSleepSegment(value.date.toDate(), value.sleepIndex);
    } else {
      return new PedometerSleepSegment(value.date, value.sleepIndex);
    }
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmm');
  }

  constructor(date: Date, sleepIndex: number) {
    super();
    this.date = date;
    this.sleepIndex = sleepIndex;
  }
}

export class PedometerHeartrateSegment extends DeviceDataBase {
  static deserializer(value: any): PedometerHeartrateSegment {
    if (!value) {
      return null;
    }
    if (value.date instanceof firebase.firestore.Timestamp) {
      return new PedometerHeartrateSegment(value.date.toDate(), value.rate);
    } else {
      return new PedometerHeartrateSegment(value.date, value.rate);
    }
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmm');
  }
  constructor(date: Date, rate: number) {
    super();
    this.date = date;
    this.rate = rate;
  }


}

export class PedometerTimeSegment extends DeviceDataBase {
  static mergeSegments(ptss: PedometerTimeSegment[]): PedometerTimeSegment {
    if (ptss.length === 0) {
      return null;
    }
    return ptss.reduce(
      (prev, iter) => {
        prev.duration += iter.duration;
        prev.step += iter.step;
        prev.cal += iter.cal;
        prev.dist += iter.dist;
        return prev;
      },
      new PedometerTimeSegment(moment(ptss[0].date).startOf('hour').toDate(), 0, 0, 0, 0)
    );

  }

  static deserializer(value: any): PedometerTimeSegment {
    return new PedometerTimeSegment(value.date.toDate(), value.duration, value.step, value.cal, value.dist);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmm');
  }
  constructor(date: Date, public duration: number, public step: number, public cal: number, public dist: number) {
    super();
    this.date = moment(date).startOf('minute').toDate();
    if (cal) {
      this.cal = cal;
    }
    if (dist) {
      this.dist = dist;
    }
  }
}

export class PedometerStatistics {
  constructor(pdss?: PedometerDaySummary[]) {
    if (!pdss || pdss.length <= 0) {
      return;
    }
    this.min = pdss[0].step;
    this.max = pdss[0].step;
    this.count = 0;
    this.sum = 0;
    this.avg = 0;

    for (const pds of pdss) {
      if (this.min > pds.step) {
        this.min = pds.step;
      }
      if (this.max < pds.step) {
        this.max = pds.step;
      }
      this.sum += pds.step;
      this.count += 1;
    }

    this.avg = Math.floor(this.sum / this.count);
  }


}

export class FoodlensMeasurement extends DeviceDataBase {
  static deserializer(value: any): FoodlensMeasurement {
    return new FoodlensMeasurement(null, value);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmmss');
  }
  constructor(raw: FoodlensRaw, value?) {
    super();
    if (raw) {
      // this.date = moment(raw.eatDate).toDate()
      this.date = new Date();
      this.refPhoto = '';
      this.mealType = raw.mealType;
      this.composition = raw.foodPositionList.map(
        (pos: FoodlensRawFoodPosition) => {
          return new FoodlensPartial(pos.userSelectedFood.foodName,
            pos.eatAmount,
            pos.userSelectedFood.nutrition.calories,
            '',
            pos.userSelectedFood.nutrition);

        }
      );
    } else {
      if (value) {
        this.refPhoto = value.refPhoto;
        if (value.date instanceof firebase.firestore.Timestamp) {
          this.date = value.date.toDate();
        } else {
          this.date = value.date;
        }
        this.composition = value.composition;
        this.mealType = value.mealType;
      }
    }

  }
  getNutrition(name: string) {
    let value = 0;
    for (const part of this.composition) {
      if (part[name] && typeof (part[name]) === 'number') {
        value += part[name] * part.eatAmount;
      }
    }
    return value;
  }
  getCalories(): number {
    let cal = 0;
    for (const part of this.composition) {
      if (part.eatAmount !== undefined && part.eatAmount !== null) {
        cal += part.calories * part.eatAmount;
      } else {
        cal += part.calories;
      }
    }
    return cal;
  }



  getMenuString(): string {
    return this.composition.map((m: FoodlensPartial) => m.foodname).join('|');
  }

}

export class FoodlensPartial {

  constructor(foodname: string, eatAmount: number, calories: number, refPhoto: string, nutrition?: FoodlensNutrition) {
    this.foodname = foodname;
    this.calories = calories;
    this.refPhoto = refPhoto;
    this.eatAmount = eatAmount;
    if (nutrition) {
      Object.assign(this, nutrition);
    }
  }


}


export class DaySummaryWithArray<T> {
  constructor(date: Date) {
    this.date = date;
    this.value = new Array<T>();
  }
}

export class FoodlensDaySummary {
  constructor(date: Date, value?: FoodlensMeasurement[]) {
    this.date = date;
    this.value = value;
    if (!value) {
      value = new Array<FoodlensMeasurement>();
    }

    this.sumCalories = value.reduce((before: number, fm: FoodlensMeasurement) => before += fm.getCalories() , 0);
  }
}



export class BloodpressureMeasurement extends DeviceDataBase {

  static deserializer(value: any): BloodpressureMeasurement {
    return new BloodpressureMeasurement(value);
  }
  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmmss');
  }

  constructor(clone?: BloodpressureMeasurement) {
    super();
    if (clone) {
      Object.assign(this, clone);
    }
    if (this.date instanceof firebase.firestore.Timestamp) {
      this.date = this.date.toDate();
    }
    if (typeof (this.systolic) === 'string') {
      this.systolic = parseInt(this.systolic, 10);
    }
    if (typeof (this.diastolic) === 'string') {
      this.diastolic = parseInt(this.diastolic, 10);
    }
    if (typeof (this.mean) === 'string') {
      this.mean = parseInt(this.mean, 10);
    }
    if (typeof (this.rate) === 'string') {
      this.rate = parseInt(this.rate, 10);
    }

  }
}

export class HbA1C extends DeviceDataBase {
  static deserializer(value: any): HbA1C {
    if (value.date instanceof firebase.firestore.Timestamp) {
      return new HbA1C(value.date.toDate(), value.measurement);
    }
    return new HbA1C(value.date, value.measurement);
  }

  getPrimaryKey(): string {
    return moment(this.date).format('YYYYMMDDHHmmss');
  }

  constructor(date: Date, msr: number) {
    super();
    this.date = date;
    this.measurement = msr;
  }
}
