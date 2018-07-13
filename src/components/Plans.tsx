import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Plan from './Plan'

import Button from '@material-ui/core/Button';

interface PlansProps extends DefaultProps {
}
interface PlansState {
}

@inject(injector)
@observer
class Plans extends React.Component <PlansProps, PlansState> {

    constructor(props: PlansProps){
        super(props)
        this.state = {}
    }

    resetPlansComplete = () => {
        this.props.manager.plans.resetComplete()
    }

    renderPlans(){
        return this.props.manager.plans.plans.map( (p, k) => <Plan plan={p} key={k} />)
    }

    render() {
        return (
            <div className="plans-zone">
                <div className="plans">
                    {this.renderPlans()}
                </div>

                <div className="plans-actions">
                    <Button variant="outlined" color="primary" onClick={this.resetPlansComplete}>Reset complete</Button>
                </div>
            </div>
        );
    }
}

export default Plans;
