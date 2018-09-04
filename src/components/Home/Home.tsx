import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Input, Button } from '@material-ui/core';
import { RouteEnum } from '../../modules/Welcome';

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

    handleStartGame = () => {
        this.props.solo.gameId = this.state.initialGameIdentifier
        this.props.solo.restart()
        this.props.ui.router.switchRoute(RouteEnum.Solo)
    }

    render() {
        return (
            <div className="home">
                <Input 
                    value={this.state.initialGameIdentifier}
                    onChange={(update: any) => this.setState({ initialGameIdentifier: update.target.value})}
                />
                <Button onClick={this.handleStartGame}>Start</Button>
                <Button onClick={() => this.setState({initialGameIdentifier: ''})}>Reset</Button>
            </div>
        );
    }
}

export default Home;
