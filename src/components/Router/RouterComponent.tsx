import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Router, navigate } from "@reach/router"
import Home from '../../components/Home/Home';
import MapModule from '../../components/Map/MapModule';
import SoloGame from '../../components/Solo/SoloGame';
import Manager from '../../components/Manager/Manager';

interface RouterProps extends DefaultProps {
}
interface RouterState {
}

@inject(injector)
@observer
class RouterComponent extends React.Component <RouterProps, RouterState> {

    constructor(props: RouterProps){
        super(props)
        this.state = {}
    }

    render() {
        let MyComponent = this.props.ui.router.currentRoute.component
        console.log('this.props', this.props)
        return (
            <div className="router">
                <Router style={{display: 'flex', width: '100%', height: '100%'}}>
                    <Home path="/" />
                    <MapModule path="/map" />
                    <Manager path='/manager' />
                    <SoloGame path='/solo' />
                </Router>
            </div>
        );
    }
}

export default RouterComponent;
