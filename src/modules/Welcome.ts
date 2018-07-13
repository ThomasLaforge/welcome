export enum EffectType {
    Surveyor = 0,
    RealEstateAgent = 1,
    Landscaper = 2,
    PoolManufacturer = 3,
    TempAgency = 4,
    Bis = 5
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

export interface JsonConstruction {
    houseNumber,
    effect
}

export interface JsonPlan {
    reward: Reward,
    mission: MissionJson
}

export interface MissionJson {
    type: MissionType,
    constructionNeeded?: number[]
}

export enum MissionType {
    District = 0
}

export enum GameMode {
    Normal,
    Advanced
}