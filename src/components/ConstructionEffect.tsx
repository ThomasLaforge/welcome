import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {EffectType} from '../modules/Welcome'
import {ConstructionEffect as ConstructionEffectModel} from '../modules/ConstructionEffect'


interface ConstructionEffectProps extends DefaultProps {
    effect: EffectType
}
interface ConstructionEffectState {
}

@inject(injector)
@observer
class ConstructionEffect extends React.Component <ConstructionEffectProps, ConstructionEffectState> {

    constructor(props: ConstructionEffectProps){
        super(props)
        this.state = {}
    }

    render() {
        let effect = new ConstructionEffectModel(this.props.effect)
        return (
            <div className="construction-effect">
                <div className={'construction-effect-icon ' + effect.cssClassName} />
            </div>
        );
    }
}

export default ConstructionEffect;
