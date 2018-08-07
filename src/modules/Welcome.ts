import { Fence } from "./Fence";
import { Construction } from "./Construction";
import { Field } from "./Field";
import { Plan } from "./Plan";

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

export enum Route {
    Solo,
    Multi,
    Map,
    Manager
}

export interface JsonConstruction {
    houseNumber: number,
    effect: EffectType
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

export interface OptionsPlay {
    estateChoice?: number,
    surveyorFence?: Fence,
    tempAgencyConstruction?: Construction
    bisField?: Field
}

export interface SpecialSoloCard {
    kind: 'SpecialSoloCard'
}

export enum SoloPhase {
    ConstructionSelection,
    HouseSelection,
    EffectChoices,
    RoundAbout,
    Confirmation
}

export enum MapMode {
    Solo,
    Multi,
    MapOnly
}

export interface CompletedPlan {
    plan: Plan,
    soloCardDrawed: boolean
}