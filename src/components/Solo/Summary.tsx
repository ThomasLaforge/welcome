import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import Construction from '../Common/Construction';
import ConstructionEffect from '../Common/ConstructionEffect';

interface SummaryProps extends DefaultProps {
}
interface SummaryState {
}

@inject(injector)
@observer
export default class Summary extends React.Component <SummaryProps, SummaryState> {

    constructor(props: SummaryProps){
        super(props)
        this.state = {}
    }

    render() {
        let uiSolo = this.props.ui.solo
        
        return (
            <div className='confirmation'>
                <div className='confirmation-construction'>
                    <div className='confirmation-construction'>
                        Vous souhaitew construire cette construction:
                    </div>
                    <div className="merged-construction">
                        <Construction card={uiSolo.computedConstruction} />
                    </div>                            
                </div>
                <div className='confirmation-where'>
                    <div className='confirmation-where-text'>
                        Au lieu indiqué par une bordure bleu 
                    </div>                            
                </div>
                <div className='confirmation-effect'>
                    <div className='confirmation-effect-text'>
                        Et appliquer cet effet:
                    </div>                            
                    <div className='confirmation-effect-type'>
                        <ConstructionEffect effect={uiSolo.computedConstruction.effect} />
                    </div>
                    <div className='confirmation-effect-where-text'>
                        Au lieu indiqué par une bordure bleu 
                    </div>    
                </div>
                { uiSolo.game.isInAdvancedMode() && uiSolo.selectedRoundabout &&
                    <div className='confirmation-roundabout'>
                        <div className='confirmation-roundabout-text'>
                            Et ajouter un rond point à l'endroit indiqué en orange:
                        </div>
                    </div>
                }
            </div>
        );
    }
}