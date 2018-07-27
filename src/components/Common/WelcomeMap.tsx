import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {WelcomeMap as WelcomeMapModel} from '../../modules/WelcomeMap'

import { MissionType, MapMode, SoloPhase } from '../../modules/Welcome';
import { Street } from '../../modules/Street';

interface WelcomeMapProps extends DefaultProps {
    canCheckPark?: boolean
    onHouseClick?: Function
    onParkClick?: Function
    onStreetClick?: Function
    mode: MapMode
}
interface WelcomeMapState {
    map: WelcomeMapModel
}

@inject(injector)
@observer
class WelcomeMap extends React.Component <WelcomeMapProps, WelcomeMapState> {

    constructor(props: WelcomeMapProps){
        super(props)
        this.state = {
            map: new WelcomeMapModel()
        }
    }

    clickOnHouse(s: Street, i: number){
        let house = s.houses[i]
        console.log('click on house', /*s.streetLine, i, house,*/ house.hasPool)
    }
    
    renderStreets(){
        return this.state.map.streets.map( (s, streetIndex) => 
            <div className={'street street-' + streetIndex} key={streetIndex}
                onClick={() => this.props.onStreetClick(s)}
            >
            {s.houses.map( (h, i) => {
                let house = s.houses[i]
                let isHouseSelected = house === this.props.ui.solo.selectedHouse

                let houseClassName = 'house-line-' + s.streetLine + '-spot-'+ i +' house'
                if(isHouseSelected) { houseClassName += ' ' + 'house-selected' }
                if(
                        this.props.ui.solo.currentPhase === SoloPhase.HouseSelection 
                    &&  this.props.mode === MapMode.Solo 
                    &&  this.props.solo.houseCanBeSelected(house, this.props.ui.solo.computedConstruction)
                ) { 
                    houseClassName += ' ' + 'house-can-be-selected' 
                }
                return <div 
                    key={s.streetLine + '-' + i} 
                    className={houseClassName} 
                    onClick={() => this.props.onHouseClick(h)}
                >
                    <div className={house.hasPool ? 'house-with-pool-construction-number' : 'house-construction-number'}>
                        {house.construction && house.construction.houseNumber}
                    </div>
                </div> 
            })}
            </div>
        )
    }
    
    renderParks(){
        return this.state.map.streets.map(s => 
            s.getParksScores().slice(0, -1).map( (pSpot, i) => {
                return <div 
                    key={s.streetLine + '-' + i} 
                    className={'park-line-' + s.streetLine + '-spot-'+ i +' park'} 
                    onClick={() => this.props.onParkClick(s, i)}
                >
                    {s.nbParkChecked > i && <div className='park-checked'>X</div>}
                </div>
            })
        )
    }

    render() {
        return (
            <div className="map">
                {this.renderStreets()}
                {this.renderParks()}
            </div>
        );
    }
}

export default WelcomeMap;
