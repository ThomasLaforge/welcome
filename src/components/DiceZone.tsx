import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Dice as DiceModel} from '../modules/Dice'
import {RollOfDice as RollOfDiceModel} from '../modules/RollOfDice'

import Dice from './Dice';
import Button from 'material-ui/Button';
import { DevelopementType } from '../modules/Developements';

interface DiceZoneProps extends DefaultProps {
}

interface DiceZoneState {
    wantToRollOneMore: boolean
}

@inject(injector)
@observer
export default class DiceZone extends React.Component<DiceZoneProps, DiceZoneState> {
    constructor(props: DiceZoneProps) {
        super(props);
        this.state = {
            wantToRollOneMore: false
        };
    }

    get diceRoll(){
        return this.props.ui.diceRoll
    }

    roll = () => {
        let diceRoll = this.props.ui.diceRoll
        diceRoll.roll()
    }

    stop = () => {
        this.props.ui.diceRoll.stop()
        if(!this.props.ui.diceRoll.needResolution() && !this.props.game.developements.isValidate(DevelopementType.Conduite) ){
            let gameResult = this.props.game.getResult(this.props.ui.diceRoll.getResult())
            this.props.game.step1(gameResult)
        }
    }

    validate = () => {
        this.props.ui.diceRoll.validate()
        let gameResult = this.props.game.getResult(this.props.ui.diceRoll.getResult())
        this.props.game.step1(gameResult)
    }

    rollAgain = () => {
        this.setState({ wantToRollOneMore: !this.state.wantToRollOneMore })
    }

    renderResults(){
        console.log('render result')
        const res = this.props.ui.diceRoll.getResult()
        const gameRes = this.props.game.getResult(res)

        return <div className="dice-roll-result">
            {/* <div className='dice-roll-result-description'>
                food: {gameRes.food}, 
                money: {gameRes.money},
                resource: {gameRes.resources},
                worker: {gameRes.workers},
                disaster: {gameRes.disasters}
            </div> */}
        </div>
    }

    render() {
        let diceRoll = this.props.ui.diceRoll

        return <div className="dice-roll-zone">
            <div className='dice-roll'>
                <div className='dice-roll-counter'>
                    Lancé {this.props.ui.diceRoll.turn} / 3
                </div>
                <div className="dice-roll-zone-dices">
                    {diceRoll.dices.map((d, k) => 
                        <div key={k} className="dice-roll-zone-dices-elt">
                            <Dice 
                                dice={d} 
                                wantToRollOneMore={this.state.wantToRollOneMore}
                            />
                        </div>
                    )}
                </div>
                <div className="dice-roll-zone-action">        
                    {!diceRoll.isOver() && 
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className={'dice-roll-button'}
                            onClick={this.roll}
                        >
                            Roll
                        </Button>
                    }
                    {!diceRoll.isOver() && 
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className={'dice-roll-button'}
                            onClick={this.stop}
                        >
                            Stop
                        </Button>
                    }
                    {this.props.game.developements.isValidate(DevelopementType.Conduite) && diceRoll.isOver() && !diceRoll.hasRollOneMore && 
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className={'dice-roll-button'}
                            onClick={this.rollAgain}
                        >
                            {this.state.wantToRollOneMore ? 'Cancel' : 'Roll one again'}
                        </Button>
                    }
                    {diceRoll.isOver() &&
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className={'dice-roll-button'}
                            onClick={this.validate}
                        >
                            Finish
                        </Button>
                    }
                </div>
                {/* <div className="dice-roll-zone-results">            
                    {diceRoll.isOver() && this.renderResults()}
                </div> */}
            </div>
            
            <div className='disasters-help'>
                <table>
                    <thead>
                        <tr>
                            <th>Cause</th>
                            <th>Résultat</th>
                            <th>Effet</th> 
                        </tr>
                    </thead>                    
                    <tbody>
                        <tr>
                            <td>Pas de nourriture</td>
                            <td>Famine</td>
                            <td>-1 pt (par ville)</td>
                        </tr>
                        <tr>
                            <td>1 Crâne</td>
                            <td>Aucune</td>
                            <td>Pas d’effet</td>
                        </tr>
                        <tr>
                            <td>2 Crâne</td>
                            <td>Sécheresse</td>
                            <td>-2 pts</td>
                        </tr>
                        <tr>
                            <td>3 Crâne</td>
                            <td>Peste</td>
                            <td>-3 pts</td>
                        </tr>
                        <tr>
                            <td>4 Crâne</td>
                            <td>Invasion</td>
                            <td>-4 pts</td>
                        </tr>
                        <tr>
                            <td>5+ Crâne</td>
                            <td>Révolte</td>
                            <td>Perte toutes marchandises</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}