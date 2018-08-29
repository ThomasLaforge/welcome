import { observable } from "mobx";

export class EstateManager {

    @observable public estateValues;

    constructor(estateValues = new Array(6).fill(0)){
        this.estateValues = estateValues
    }

    increment(districtSize: number){
        this.estateValues[districtSize - 1]++
    }

    getDistrictValue(districtSize: number){
        return this.estateValues[districtSize - 1]
    }

    getMultiplicator(districtSize: number){
        let multis = [
            [1, 3],
            [2, 3, 4],
            [3, 4, 5, 6],
            [4, 5, 6, 7, 8],
            [5, 6, 7, 8, 10],
            [6, 7, 8, 10, 12]
        ]

        let indexDistrictSize = districtSize - 1
        let indexDistrictValue = this.getDistrictValue(districtSize) < multis[indexDistrictSize].length - 1 ? this.getDistrictValue(districtSize) : multis[indexDistrictSize].length - 1
        
        return multis[indexDistrictSize][indexDistrictValue]
    }
}