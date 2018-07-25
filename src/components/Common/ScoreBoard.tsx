import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { GameMode } from '../../modules/Welcome';

interface ScoreBoardProps extends DefaultProps {
}
interface ScoreBoardState {
}

@inject(injector)
@observer
class ScoreBoard extends React.Component <ScoreBoardProps, ScoreBoardState> {

    constructor(props: ScoreBoardProps){
        super(props)
        this.state = {
        }
    }

    renderPlanScores(){
        let nbPlan = 3
        let planScores = []

        for (let i = 0; i < nbPlan; i++) {
            planScores.push(
                <div className={'plan-score plan-score-' + i}>
                    {this.props.solo.planScore(i)}
                </div>
            )            
        }

        return planScores
    }
    renderTotalScores(){
        return []
    }
    renderParkScores(){
        return []
    }
    renderPoolScores(){
        return []
    }
    renderBisScores(){
        return []
    }
    renderRealEstateScores(){
        return []
    }
    renderSurveyorScores(){
        return []
    }
    renderRoundaboutScore(){
        return []
    }


    renderSpots(){
        return <React.Fragment>
            {this.renderPlanScores()}
            {this.renderTotalScores()}
            {this.renderParkScores()}
            {this.renderPoolScores()}
            {this.renderBisScores()}
            {this.renderRealEstateScores()}
            {this.renderSurveyorScores()}
            {this.props.solo.mode === GameMode.Advanced && this.renderRoundaboutScore()}
        </React.Fragment>
    }

    render() {
        return <div className='score-board'>
            {this.renderSpots()}
        </div>
    }
}

export default ScoreBoard;
