import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { GameMode } from '../../modules/Welcome';
import { SoloGame } from '../../modules/SoloGame';

interface ScoreBoardProps extends DefaultProps {
    soloGame: SoloGame
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
                <div key={i} className={'plan-score plan-score-' + i}>
                    {this.props.soloGame.planScore(i)}
                </div>
            )            
        }
        planScores.push(
            <div key={nbPlan} className='total-plan-score'>
                {this.props.soloGame.totalPlanScore}
            </div>
        )

        return planScores
    }
    renderTotalScore(){
        return <div className='total-score'>
            {this.props.soloGame.totalScore}
        </div>
    }
    renderParkScores(){
        let nbPark = 3
        let parkScores = []

        for (let i = 0; i < nbPark; i++) {
            parkScores.push(
                <div key={i} className={'park-score park-score-' + i}>
                    {this.props.soloGame.parkScore(i)}
                </div>
            )
        }
        parkScores.push(
            <div key={nbPark} className='total-park-score'>
                {this.props.soloGame.totalParkScore}
            </div>
        )

        return parkScores
    }
    renderPoolScores(){
        let maxNbPool = 9
        let poolScores = []
        let i = 0
        while (i < this.props.soloGame.nbPoolBuilt && i < maxNbPool + 1) {
            poolScores.push(
                <div key={i} className={'pool-score pool-score-' + i}>
                    {'X'}
                </div>
            )
            i++
        }
        poolScores.push(
            <div key={maxNbPool + 1} className='total-pool-score'>
                {this.props.soloGame.totalPoolScore}
            </div>
        )

        return poolScores
    }
    renderBisScores(){
        let maxNbBis = 9
        let bisScores = []
        let i = 0
        while (i < this.props.soloGame.nbBisBuilt && i <= maxNbBis) {
            bisScores.push(
                <div key={i} className={'bis-score bis-score-' + i}>
                    {'X'}
                </div>
            )
            i++
        }
        bisScores.push(
            <div key={maxNbBis + 1} className='total-bis-score'>
                {this.props.soloGame.bisScore}
            </div>
        )

        return bisScores
    }
    renderRealEstateScores(){
        let estateScores = []
        let soloGame = this.props.soloGame

        for (let i = 0; i < 6; i++) {
            let nbDistrictOfSize = soloGame.map.getNbCompleteDistricts(i+1) 
            let districtEstateValue = soloGame.estate.getDistrictValue(i+1)
            let multiplicator = soloGame.estate.getMultiplicator(i+1)
            let score = nbDistrictOfSize * multiplicator

            // Estate improvements
            for (let j = 0; j < Math.min(4, i + 1); j++) {
                estateScores.push(
                    <div className={'estate-improvement estate-improvement-' + i + '-' + j} key={i + '-' + j}>{districtEstateValue > j ? 'X' : ''}</div>
                )
            }
            // Mulitplicators
            estateScores.push(
                <div className={'estate-multiplicator estate-multiplicator-' + i} key={i + 'multiplicator'}>{nbDistrictOfSize}</div>
            )
            // Totals
            estateScores.push(
                <div className={'estate-total estate-total-' + i} key={i + 'total'}>{score}</div>
            )
        }

        return estateScores
    }
    renderInterimScores(){
        let interimScores = []
        let i = 0;

        while (i < this.props.soloGame.nbInterimUsed) {
            interimScores.push(
                <div key={i} className={'interim-score interim-score-' + i}>
                    {'X'}
                </div>
            )
            i++
        }
        interimScores.push(
            <div key={this.props.soloGame.nbInterimUsed} className='total-interim-score'>
                {this.props.soloGame.interimScore}
            </div>
        )

        return interimScores
    }

    renderRoundaboutScores(){
        let roundaboutScores = []
        let i = 0;

        while (i < this.props.soloGame.nbroundaboutUsed) {
            roundaboutScores.push(
                <div className={'roundabout-score roundabout-score-' + i}>X</div>
            )
            i++
        }

        return roundaboutScores
    }

    unbuiltScores(){
        let unbuiltScores = []
        let i = 0;

        while (i < this.props.soloGame.nbUnbuiltUsed) {
            unbuiltScores.push(
                <div className={'unbuilt-score unbuilt-score-' + i}>X</div>
            )
            i++
        }

        return unbuiltScores
    }

    renderSpots(){
        return <React.Fragment>
            {this.renderPlanScores()}
            {this.renderTotalScore()}
            {this.renderParkScores()}
            {this.renderPoolScores()}
            {this.renderBisScores()}
            {this.renderRealEstateScores()}
            {this.renderInterimScores()}
            {this.unbuiltScores()}
            <div className='total-penalties-score'>0</div>
            {this.props.soloGame.mode !== GameMode.Advanced && this.renderRoundaboutScores()}
        </React.Fragment>
    }

    render() {
        return <div className='score-board'>
            {this.renderSpots()}
        </div>
    }
}

export default ScoreBoard;
