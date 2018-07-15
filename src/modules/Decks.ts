import {Deck} from './Deck'
import {Plan} from './Plan'
import {Construction} from './Construction'
import { Reward, PlanLevel, JsonConstruction, JsonPlan, GameMode } from './Welcome';
import { Mission } from './Mission';

/**
 * Plans
 */

const dataPlans = require('../datas/plans.json')
// console.log('dataPlans', dataPlans)
let planList: Plan[] = []
Object.keys(dataPlans).forEach( (level: string) => {
    let levelType = Number.parseInt(level)
    Object.keys(dataPlans[level]).forEach(k => {
        dataPlans[level][k].forEach( (p: JsonPlan) => {
            // console.log('plan', p)
            planList.push(
                new Plan(
                    p.reward,
                    new Mission(p.mission.type, p.mission.constructionNeeded),
                    levelType
                )
            )
        })
    })
})
// console.log('planList', planList, planList.length)

export class PlanDeck extends Deck<Plan> {

    constructor(
        gameMode = GameMode.Normal, 
        datas = gameMode === GameMode.Normal ? planList.filter(p => p.mission.type === 0) : planList
    ){
        super(datas)
    }
}

/**
 * Construction
 */
const datasPlan = require('../datas/constructions.json')
// console.log('constructions', datas)
let constructionList: Construction[] = []
Object.keys(datasPlan).forEach( (effect: string) => {
    // console.log('list of effect construction', effect, datas[effect])
    let effectType = Number.parseInt(effect)
    Object.keys(datasPlan[effect]).forEach(houseNumberStr => {
        let houseNumber = Number.parseInt(houseNumberStr)
        // console.log('nb cards', datas[effect][houseNumberStr])
        for (let index = 0; index < datasPlan[effect][houseNumberStr]; index++) {
            constructionList.push(new Construction(houseNumber, effectType))
        }
    })
})
// console.log('constructionlist', constructionList, constructionList.length)
 
export const constructions = constructionList

export class ConstructionDeck extends Deck<Construction> {

    constructor(datas: Construction[]){
        super(datas)
    }
}
