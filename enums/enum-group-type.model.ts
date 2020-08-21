

export enum EnumGroupType {
	Hospital = 0,
	Company = 1,
	HealthCenter = 2,
	DiabeticConsumableMaterials = 3
}
export namespace EnumGroupType {

	export function toDisplayShortName(value: EnumGroupType) {
		switch (value) {
			case EnumGroupType.Hospital:
				return "병의원";
			case EnumGroupType.Company:
				return "회사";
			case EnumGroupType.HealthCenter:
				return "보건소";
			case EnumGroupType.DiabeticConsumableMaterials:
				return "당뇨소모성재료";
			default:
				return value;
		}
	}
}
