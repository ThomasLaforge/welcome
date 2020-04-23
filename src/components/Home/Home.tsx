import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Input, Button } from '@material-ui/core';
import { RouteEnum } from '../../modules/Welcome';
import HomeMenuItem from './HomeMenuItem';

interface HomeProps extends DefaultProps {
}
interface HomeState {
}

@inject(injector)
@observer
class Home extends React.Component <HomeProps, HomeState> {

    constructor(props: HomeProps){
        super(props)
        this.state = {}
    }

    defaultOnClick = () => {
        console.log('click on menu item')
    }

    render() {
        return (
            <div className="home">
                <div className="home-menu">
                    <HomeMenuItem 
                        className='home-menu-solo' 
                        title='Solo'
                        route={RouteEnum.Solo}
                    />
                    <HomeMenuItem 
                        className='home-menu-multi' 
                        route={RouteEnum.Multi}
                        title='Multi'
                    />
                    <HomeMenuItem 
                        className='home-menu-map' 
                        route={RouteEnum.Map} 
                        title='Map'
                    />
                    <HomeMenuItem 
                        className='home-menu-manager' 
                        route={RouteEnum.Manager} 
                        title='Cards'
                    />
                </div>
            </div>
        );
    }
}

export default Home;
