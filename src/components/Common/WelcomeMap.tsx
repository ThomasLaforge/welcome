import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {WelcomeMap as WelcomeMapModel} from '../../modules/WelcomeMap'
import { MapMode, SoloPhase, EffectType } from '../../modules/Welcome';
import { SoloGameUIStore } from '../../modules/Stores/SoloGameUIStore';

import Fence from './Fence';
import Field from './Field';

interface WelcomeMapProps extends DefaultProps {
    canCheckPark?: boolean
    onHouseClick?: Function
    onParkClick?: Function
    onStreetClick?: Function
    onFenceClick?: Function
    mode: MapMode
    soloGame?: SoloGameUIStore
    map: WelcomeMapModel
}
interface WelcomeMapState {
}

@inject(injector)
@observer
class WelcomeMap extends React.Component <WelcomeMapProps, WelcomeMapState> {

    constructor(props: WelcomeMapProps){
        super(props)
        this.state = {}
    }
    
    renderStreets(){
        let uiSolo = this.props.soloGame
        let inSurveyorPhase = this.props.mode === MapMode.Solo && uiSolo.currentPhase === SoloPhase.EffectChoices && uiSolo.computedConstruction.effectType === EffectType.Surveyor

        return this.props.map.streets.map( (s, streetIndex) => 
            <div className={'street street-' + streetIndex} key={streetIndex}
                onClick={() => this.props.onStreetClick && this.props.onStreetClick(s)}
            >
            {s.fields.map( (field, i) => 
                <Field 
                    key={i}
                    field={field}
                    streetLine={streetIndex}
                    position={i}
                    onFieldClick={this.props.onHouseClick}
                    selectedField={this.props.mode === MapMode.MapOnly ? this.props.ui.map.selectedField : uiSolo.selectedHouse}
                />
            )}
            {s.fences.map( (f, i) => <Fence 
                key={i}
                streetNumber={streetIndex}  
                fence={f}
                show={inSurveyorPhase}
                onClick={() => this.props.onFenceClick && this.props.onFenceClick(f)}
            />)}
            </div>
        )
    }
    
    renderParks(){
        // console.log('renderParks', this.state.map.streets.map(s => s.nbParkChecked))
        return this.props.map.streets.map(s => 
            s.getParksScores().slice(0, -1).map( (pSpot, i) => {
                return <div 
                    key={s.streetLine + '-' + i} 
                    className={'park-line-' + s.streetLine + '-spot-'+ i +' park'} 
                    onClick={() => this.props.onParkClick && this.props.onParkClick(s, i)}
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
