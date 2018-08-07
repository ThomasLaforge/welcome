import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Fence from './Fence';

import {WelcomeMap as WelcomeMapModel} from '../../modules/WelcomeMap'
import { MissionType, MapMode, SoloPhase, EffectType } from '../../modules/Welcome';
import { Street } from '../../modules/Street';
import BisZone from '../Solo/EffectZones/BisZone';
import Field from './Field';

interface WelcomeMapProps extends DefaultProps {
    canCheckPark?: boolean
    onHouseClick?: Function
    onParkClick?: Function
    onStreetClick?: Function
    onFenceClick?: Function
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
    
    renderStreets(){
        let uiSolo = this.props.ui.solo
        let inSurveyorPhase = uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Surveyor
        let inBisPhase = uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Bis

        return this.state.map.streets.map( (s, streetIndex) => 
            <div className={'street street-' + streetIndex} key={streetIndex}
                onClick={() => this.props.onStreetClick(s)}
            >
            {s.fields.map( (field, i) => 
                <Field 
                    key={i}
                    field={field}
                    streetLine={streetIndex}
                    position={i}
                    onFieldClick={this.props.onHouseClick}
                />
            )}
            {s.fences.map( (f, i) => <Fence 
                key={i}
                streetNumber={streetIndex}  
                fence={f}
                show={inSurveyorPhase}
                onClick={() => this.props.onFenceClick(f)}
            />)}
            </div>
        )
    }
    
    renderParks(){
        // console.log('renderParks', this.state.map.streets.map(s => s.nbParkChecked))
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
