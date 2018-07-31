import {EffectType} from './Welcome'

export class Effect {

    public type: EffectType;

	constructor(type: EffectType) {
        this.type = type
	}

    // Statics
	static isAutoActivateEffect(effect: EffectType){
		return effect === EffectType.PoolManufacturer || effect === EffectType.Landscaper
	}
	static isSkippableEffect(effect: EffectType){
		return !Effect.isAutoActivateEffect(effect)
	}

}