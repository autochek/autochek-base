

export enum EnumGroupType {
	Hospital = 0,
	Company = 1,
	HealthCenter = 2,
	DiabeticConsumableMaterials = 3
}
export namespace EnumAdmitUnlockFileStatus {

	export function toDisplayName(value: EnumGroupType) {
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
