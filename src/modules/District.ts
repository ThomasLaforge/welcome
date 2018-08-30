import { observable } from "mobx";
import { Field } from "./Field";

export class District {

    @observable public fields: Field[];

    constructor(fields: Field[]){
        this.fields = fields
    }

    complete(){
        this.fields.forEach(f => f.useForPlan())
    }

    isComplete(){
        return this.fields.filter(f => f.built).length === this.fields.length
    }

    isReadyForPlan(){
        return this.isComplete() && this.fields.filter(h => h.usedForPlans).length === 0
    }

    get length(){
        return this.fields.length
    }

}