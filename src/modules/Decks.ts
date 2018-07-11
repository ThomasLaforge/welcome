import {Deck} from './Deck'
import {Plan} from './Plan'
import {Construction} from './Construction'
import { Reward, PlanLevel, JsonConstruction, JsonPlan } from './Welcome';

/**
 * Plans
 */

const planList: Plan[] = []
// require('../datas/plans.json').map( (p: JsonPlan) => 
//     new Plan(p.reward, [], p.level) 
// )

export class PlanDeck extends Deck<Plan> {

    constructor(datas = planList){
        super(datas)
    }
}

/**
 * Construction
 */
let datas = require('../datas/constructions.json')
// console.log('constructions', datas)
let constructionList: Construction[] = []
Object.keys(datas).forEach( (effect: string) => {
    // console.log('list of effect construction', effect, datas[effect])
    let effectType = Number.parseInt(effect)
    Object.keys(datas[effect]).forEach(houseNumberStr => {
        let houseNumber = Number.parseInt(houseNumberStr)
        // console.log('nb cards', datas[effect][houseNumberStr])
        for (let index = 0; index < datas[effect][houseNumberStr]; index++) {
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
