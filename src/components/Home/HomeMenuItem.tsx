import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { RouteDescriptor } from '../Router/Router';

interface HomeMenuItemProps extends DefaultProps {
    route: RouteDescriptor,
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
                onClick={() => this.props.ui.router.switchRoute(this.props.route)}
            >
                <div className='home-solo-elt-icon' />
                <div className='home-solo-elt-title' />
            </div>
        );
    }
}

export default HomeMenuItem;
