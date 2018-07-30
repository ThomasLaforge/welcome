import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Fence as FenceModel } from '../../modules/Fence';

interface FenceProps extends DefaultProps {
    fence: FenceModel
    streetNumber: number
    onClick: Function
    selectionMode: boolean
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
        else if(this.props.selectionMode){
            if(this.props.ui.solo.optionsPlay.surveyorFence === this.props.fence){
                className += ' ' + 'fence-selected'
            }
            else {
                className += ' ' + 'fence-selectable'
            }
        }

        return <div 
            className={className} 
            onClick={() => this.props.onClick()}
        />
    }
}

export default Fence;
