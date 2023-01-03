export type RelativeDistance = [number, number]

export interface GameObject {
	refferencePoint: GameObject | undefined
	distanceToRef: RelativeDistance | undefined
}




class Actor implements GameObject {
	refferencePoint: GameObject | undefined
	distanceToRef: RelativeDistance | undefined

	constructor() {

	}
}




type Admin = {
	name: string
}





type UnitType = {
	subUnitType: UnitType[] | undefined
	name: string
}
const Team: UnitType = {
	name: "Takım",
	subUnitType: undefined,
}
const Region: UnitType = {
	name: "Bölge",
	subUnitType: [Team],
}
const Country: UnitType = {
	name: "Ülke",
	subUnitType: [Region],
}




type Unit = {
	unitType: UnitType
	subUnits: Unit[]
	admin: Admin
}
const Türkiye: Unit = {
	admin: { name: "onur" },
	unitType: Country,
	subUnits: [],
}
const Karadeniz: Unit = {
	admin: { name: "Enver" },
	unitType: Region,
	subUnits: [],
}






if (Türkiye.unitType.subUnitType?.includes(Karadeniz.unitType))
	Türkiye.subUnits.push(Karadeniz)












// class GameObject {
// 	mass = 0
// 	size = 0
// 	force = 0

// 	constructor() {}

// 	update() {

// 	}

// 	draw(ctx: CanvasRenderingContext2D) {

// 	}
// }





export {
}