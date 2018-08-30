import { Fence } from "./Fence";
import { Construction } from "./Construction";
import { Field } from "./Field";
import { Plan } from "./Plan";

export enum EffectType {
    Surveyor = 0,
    RealEstateAgent = 1,
    Landscaper = 2,
    PoolManufacturer = 3,
    Interim = 4,
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
    type: PlanMissionType,
    constructionNeeded?: number[]
}

export enum PlanMissionType {
    Districts = 0,
    FiveBis = 1,
    BottomStreetFull = 2,
    TopStreetFull = 3,
    SevenFences = 4,
    Edges = 5,
    ParksAndPoolsMiddleLine = 6,
    ParksAndPoolsBottomLine = 7,
    TwoLineFullPark = 8,
    TwoLineFullPool = 9,
    StreetFullParksAndPoolsWithOneRoundabout = 10,
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

export const MAX_NB_ROUNDABOUT_TO_BUILD = 2