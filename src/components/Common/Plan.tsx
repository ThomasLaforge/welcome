import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {Plan as PlanModel} from '../../modules/Plan'

import { PlanMissionType } from '../../modules/Welcome';

interface PlanProps extends DefaultProps {
    plan: PlanModel
    onClick?: Function
}
interface PlanState {
}

@inject(injector)
@observer
class Plan extends React.Component <PlanProps, PlanState> {

    constructor(props: PlanProps){
        super(props)
        this.state = {}
    }

    renderDistrictNeeded(){
        return this.props.plan.mission.constructionNeeded.map( (nbCosntructionNeeded, i) =>
            <div className='plan-mission-construction' key={i}>
                <div className='plan-mission-construction-start'>[</div>
                    {new Array(nbCosntructionNeeded).fill('').map( (e, j) => 
                        <div className="mission-construction-spot" key={j}>*</div>
                    )}
                <div className='plan-mission-construction-end'>]</div>
            </div>
        )
    }

    render() {
        let plan = this.props.plan
        let classNameDone = plan.isComplete ? 'rewards-first-complete' : ''

        return (
            <div className="plan" onClick={() => this.props.onClick && this.props.onClick() }>
                <div className='plan-mission'>
                    {plan.mission.type === PlanMissionType.Districts ? this.renderDistrictNeeded() : plan.mission.type}
                </div>
                <div className='plan-rewards'>
                    <div className={'plan-rewards-first ' + classNameDone}>
                        {plan.reward.firstPlayer}                    
                    </div>
                    <div className='plan-rewards-others'>
                        {plan.reward.others}
                    </div>
                </div>
            </div>
        );
    }
}

export default Plan;
