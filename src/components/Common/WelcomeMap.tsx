import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {WelcomeMap as WelcomeMapModel} from '../../modules/WelcomeMap'

import { MissionType } from '../../modules/Welcome';
import { Street } from '../../modules/Street';

interface WelcomeMapProps extends DefaultProps {
    canCheckPark?: boolean
    onHouseClick?: Function
    onParkClick?: Function
    onStreetClick?: Function
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
        house.build(20)
    }
    
    renderStreets(){
        return this.state.map.streets.map( (s, streetIndex) => 
            <div className={'street street-' + streetIndex} key={streetIndex}
                onClick={() => this.props.onStreetClick(s)}
            >
            {s.houses.map( (h, i) => {
                let house = s.houses[i]
                let isHouseSelected = house === this.props.ui.solo.selectedHouse
                return <div 
                    key={s.streetLine + '-' + i} 
                    className={'house-line-' + s.streetLine + '-spot-'+ i +' house ' + (isHouseSelected ? 'house-selected' : '')} 
                    onClick={() => this.props.onHouseClick(h)}
                >
                    <div className={house.hasPool ? 'house-with-pool-construction-number' : 'house-construction-number'}>
                        {house.construction}
                    </div>
                </div> 
            })}
            </div>
        )
    }


    clickOnPark(s: Street, i: number){
        console.log('click on park', s, i)
        // if(this.props.canCheckPark && i === s.parkChecked){
        if(i === s.parkChecked){
            console.log('build park')
            s.buildPark()
        }
        else if(i === s.parkChecked - 1){
            console.log('build park')
            s.removePark()
        }
    }
    
    renderParks(){
        return this.state.map.streets.map(s => 
            s.getParksScores().slice(0, -1).map( (pSpot, i) => {
                return <div 
                    key={s.streetLine + '-' + i} 
                    className={'park-line-' + s.streetLine + '-spot-'+ i +' park'} 
                    onClick={() => this.props.onParkClick(s, i)}
                >
                    {s.parkChecked > i && <div className='park-checked'>X</div>}
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
