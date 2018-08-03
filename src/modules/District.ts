import { observable } from "mobx";
import { Field } from "./Field";

export class District {

    @observable public fields: Field[];

    constructor(fields: Field[]){
        this.fields = fields
    }

    isComplete(){
        return this.fields.filter(f => f.built).length === this.fields.length
    }

    isReasyForPlan(){
        return this.isComplete() && this.fields.filter(h => h.usedForPlans).length === 0
    }

    get length(){
        return this.fields.length
    }

}