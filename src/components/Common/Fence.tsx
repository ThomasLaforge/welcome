import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Fence as FenceModel } from '../../modules/Fence';
import { SoloPhase } from '../../modules/Welcome';

interface FenceProps extends DefaultProps {
    fence: FenceModel
    streetNumber: number
    onClick?: Function
    show?: boolean
}
interface FenceState {
}

@inject(injector)
@observer
class Fence extends React.Component <FenceProps, FenceState> {

    constructor(props: FenceProps){
        super(props)
        this.state = {
        }
    }

    render() {
        let className = 'fence fence-' + this.props.streetNumber + '-' + this.props.fence.position
        if(this.props.fence.built){
            className += ' ' + 'fence-built'
        }
        else {
            if([SoloPhase.EffectChoices, SoloPhase.RoundAbout, SoloPhase.Confirmation].indexOf(this.props.ui.solo.currentPhase) !== -1){
                if(this.props.ui.solo.optionsPlay.surveyorFence === this.props.fence){
                    className += ' ' + 'fence-selected'
                }
                else {
                    className += ' ' + 'fence-selectable'
                }
            }
            else{
                return null
            }
        }

        return <div 
            className={className} 
            onClick={() => this.props.onClick && this.props.onClick()}
        />
    }
}

export default Fence;
