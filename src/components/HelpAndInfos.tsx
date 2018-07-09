import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import Dice from './Dice'

interface HelpAndInfosProps extends DefaultProps {
}

interface HelpAndInfosState {
}

@inject(injector)
@observer
export default class HelpAndInfos extends React.Component<HelpAndInfosProps, HelpAndInfosState> {
    constructor(props: HelpAndInfosProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div className='help-and-infos'>
            <div className='game-order'>
                <h2 className='game-order-title'>Ordre de jeu</h2>
                <div className='game-order-list'>
                    <ol>
                        <li>Lancer les dés et récupérer les marchandises et la Nourriture</li>
                        <li>Alimenter les villes et résoudre les désastres</li>
                        <li>Construire les villes et/ou les monuments</li>
                        <li>Acheter au maximum un développement</li>
                        <li>Défausser les marchandises au-delà de six</li>
                    </ol>
                </div>
            </div>
            <div className='dice-help'>
                <div className='dice-img'>

                </div>
                <div className='dice-description'>
                    
                </div>
            </div>
        </div>
    }
}