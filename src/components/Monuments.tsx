import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Monuments as MonumentsModel, Building as BuildingModel} from '../modules/Monuments'
import {GamePhase} from '../modules/RollTTAges'
import Button from 'material-ui/Button'

interface MonumentsProps extends DefaultProps {
}

interface MonumentsState {
}

@inject(injector)
@observer
export default class Monuments extends React.Component<MonumentsProps, MonumentsState> {
    constructor(props: MonumentsProps) {
        super(props);
        this.state = {
        };
    }

    renderMonuments(){
        // console.log('buildings', this.props.game.monuments.buildings)
        return this.props.game.monuments.buildings.map( (b, k) => <Building building={b} key={k} />)
    }

    render() {
        return <div className={'monuments'}>
            <h2>Monuments</h2>
            <div className='building-list'>
                {this.renderMonuments()}
            </div>
            {/* <Button onClick={() => {this.props.game.Monuments.nbJobsDone++}}>Add</Button> */}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface BuildingProps extends DefaultProps {
    building: BuildingModel
}

interface BuildingState {
}

@inject(injector)
@observer
class Building extends React.Component<BuildingProps, BuildingState> {
    constructor(props: BuildingProps) {
        super(props);
        this.state = {

        };
    }

    onClick = () => {
        if(this.props.game.phase === GamePhase.Phase_3_City_And_Monuments && this.props.ui.availableWorkers){
            if(!this.props.building.isBuilt()){
                this.props.ui.buyBuilding(this.props.building)
            }
            else{
                console.log('try to build an already built monument')
            }
        }
    }

    render() {
        let b = this.props.building
        let BuildingDoneClass = b.isBuilt() ? ' building-done' : ''

        return <div className={'building' + BuildingDoneClass} onClick={this.onClick}>
            <div className={'building-img building-img-' + b.cssClassName}/>
            <div className='building-name'>{b.name + ' (' + b.points + ')'}</div>
            {b && b.nbNeededWorker && 
                <div className="building-population">
                    {b.nbWorker || 0} / {b.nbNeededWorker}
                </div>
            }
        </div>
    }
}