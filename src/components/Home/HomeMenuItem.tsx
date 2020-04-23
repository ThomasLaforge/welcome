import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { RouteDescriptor } from '../Router/Router';
import { navigate } from "@reach/router"

interface HomeMenuItemProps extends DefaultProps {
    route: string,
    title: string,
    className: string
}
interface HomeMenuItemState {
}

@inject(injector)
@observer
class HomeMenuItem extends React.Component <HomeMenuItemProps, HomeMenuItemState> {

    constructor(props: HomeMenuItemProps){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className={"home-solo-elt " + this.props.className} 
                onClick={() => navigate(this.props.route)}
            >
                <div className='home-solo-elt-icon' />
                <div className='home-solo-elt-title'>{this.props.title}</div>
            </div>
        );
    }
}

export default HomeMenuItem;
