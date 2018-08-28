import {EffectType} from './Welcome'

export class Effect {

    public type: EffectType;

	constructor(type: EffectType) {
        this.type = type
	}

    // Statics
	static isAutoActivateEffect(effect: EffectType){
		return [EffectType.PoolManufacturer, EffectType.Landscaper, EffectType.Interim].includes(effect) 
	}
	static isSkippableEffect(effect: EffectType){
		return !Effect.isAutoActivateEffect(effect)
	}

}