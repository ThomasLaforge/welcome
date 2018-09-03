import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Input } from '@material-ui/core';

interface HomeProps extends DefaultProps {
}
interface HomeState {
    initialGameIdentifier: string
}

@inject(injector)
@observer
class Home extends React.Component <HomeProps, HomeState> {

    constructor(props: HomeProps){
        super(props)
        this.state = {
            initialGameIdentifier: ''
        }
    }

    render() {
        return (
            <div className="home">
                <Input 
                    value={this.state.initialGameIdentifier}
                    onChange={(update: any) => this.setState({ initialGameIdentifier: update.target.value})}
                />
            </div>
        );
    }
}

export default Home;
