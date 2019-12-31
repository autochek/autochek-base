
export interface GlucoseGoal {
  bMealMin: number;
  aMealMin: number;
  sleepMin: number;

  // web+app
  bMeal: number;
  aMeal: number;
  sleep: number;

}


export interface BpGoal {
  // web+app
  pressureBig: number;
  pressureSmall: number;
}

export interface BodyscaleGoal {

  // web+app
  weightMax: number;
  weightMin: number;


  // web
  bmiMax: number;
  bmiMin: number;

  // weightAvg:number, //deprecated
  // bmiAvg:number, //deprecated
}

export interface ActivityGoal {
  // app+web
  step: number;

  // web
  // calMin:number, //deprecate
  // calMax:number, //deprecate
}

export interface DietGoal {
  // web+app
  calConsumptionMax: number;
  // web
  calConsumptionMin: number;
}





// ================================ //

export class GoalBase {
  static record = 'goal';




  static deserializer(fb: object) {
    return new GoalBase();
  }
}

export class ActivityGoal extends GoalBase {
  static record = 'activity_goal';



  constructor() {
    super();
    // this.step = step;
    // this.calMax = calMax;
    // this.calMin = calMin;
  }

  static deserializer(fb: ActivityGoal): ActivityGoal {
    if (!fb) {
      return null;
    }
    return Object.assign(new ActivityGoal(), fb);
  }

  static getDefault(): ActivityGoal {
    const obj = new ActivityGoal();
    obj.step = 5000;
    return obj;
  }
}

export class DietGoal extends GoalBase {
  static record = 'diet_goal';

  constructor() {
    super();
  }

  static deserializer(fb: DietGoal): DietGoal {
    if (!fb) {
      return null;
    }
    return Object.assign(new DietGoal(), fb);
  }

  static getDefault(): DietGoal {
    const obj = new DietGoal();
    obj.calConsumptionMax = 1800;
    obj.calConsumptionMin = 1600;
    return obj;
  }
}


export class GlucoseGoal extends GoalBase {
  static record = 'glucose_goal';
  constructor() {
    super();
  }

  static deserializer(fb: GlucoseGoal): GlucoseGoal {
    if (!fb) {
      return null;
    }
    return Object.assign(new GlucoseGoal(), fb);
  }

  static getDefault(): GlucoseGoal {

    const obj = new GlucoseGoal();
    obj.bMealMin = 80;
    obj.aMealMin = 100;
    obj.sleepMin = 90;
    obj.bMeal = 130;
    obj.aMeal = 200;
    obj.sleep = 140;

    return obj;
  }
}

export class BpGoal extends GoalBase {
  static record = 'bloodpressure_goal';
  constructor() {
    super();
  }

  static deserializer(fb: BpGoal): BpGoal {
    if (!fb) {
      return null;
    }
    return Object.assign(new BpGoal(), fb);
  }

  static getDefault(): BpGoal {
    const obj = new BpGoal();
    obj.pressureSmall = 60;
    obj.pressureBig = 140;
    return obj;
  }
}

export class BodyscaleGoal extends GoalBase {
  static record = 'bodyscale_goal';
  constructor() {
    super();

  }

  static deserializer(fb: BodyscaleGoal): BodyscaleGoal {
    if (!fb) {
      return null;
    }
    fb.weightMax = Number(fb.weightMax);
    fb.weightMin = Number(fb.weightMin);
    fb.bmiMax = Number(fb.bmiMax);
    fb.bmiMin = Number(fb.bmiMin);
    return Object.assign(new BodyscaleGoal(), fb);
  }

  static getDefault(height: number): BodyscaleGoal {
    const obj = new BodyscaleGoal();

    obj.bmiMin = 18.5;
    obj.bmiMax = 23;

    obj.weightMin = Math.floor((obj.bmiMin) * (height / 100) * (height / 100));
    obj.weightMax = Math.floor((obj.bmiMax) * (height / 100) * (height / 100));

    return obj;
  }
}



// ===UserHealth===
export type TypeDiabeteType = '1형' | '2형' | '임신성';
export const TemplateDiabeteType: TypeDiabeteType[] = ['1형', '2형', '임신성'];
export type TypeDiabeteDiasesePeriod = '1년미만' | '1년' | '2년~10년' | '10년이상';
export const TemplateDiabeteDiseasePeriod: TypeDiabeteDiasesePeriod[] = ['1년미만', '1년', '2년~10년', '10년이상'];
export type TypeDiabeteRemedy = '습관교정' | '경구약' | '인슐린';
export const TemplateDiabeteRemedy: TypeDiabeteRemedy[] = ['습관교정', '경구약', '인슐린'];

export interface UserHealthDiabete {
  diabeteType: TypeDiabeteType;
  diseasePeriod: TypeDiabeteDiasesePeriod;
  remedy: TypeDiabeteRemedy;
  familyHistory: boolean;
}

export type TypeHasSmoked = 'never' | 'ex' | 'current';
export const TemplateHasSmoked = ['never', 'ex', 'current'];
export interface UserHealthDrinkSmoke {
  hasDrink: boolean;
  drinkCycle: number; // per week
  drinkAmount: number; // cups per each

  hasSmoked: TypeHasSmoked; // 'never','ex','current'
}
