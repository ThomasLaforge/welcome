export enum ConstructionEffect {
    Surveyor,
    RealEstateAgent,
    Ladscaper,
    PoolManufacturer,
    TempAgency,
    Bis
}

export interface Reward {
    firstPlayer: number,
    others: number
}

export enum PlanLevel {
    One,
    Two,
    Three
}