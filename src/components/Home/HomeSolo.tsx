import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Input, Button } from '@material-ui/core';
import { RouteEnum } from '../../modules/Welcome';

interface HomeSoloProps extends DefaultProps {
}
interface HomeSoloState {
    initialGameIdentifier: string
}

@inject(injector)
@observer
class HomeSolo extends React.Component <HomeSoloProps, HomeSoloState> {

    constructor(props: HomeSoloProps){
        super(props)
        this.state = {
            initialGameIdentifier: '9yiN2h0xcvdh5sNu5i3psKhZ2CAFJ3IYS5yhyHvcNrHpFDUevcxTotg8iElhJlTyXIQoH73uoF7COOCG3F5hpfrbTAImCKTzgsxI7fzIN9toESVQuv9UpcGsxwhYqfKs5VsmQI2SX4fDcvuZuzC73UyigUpAcWSofGHP9FVTqnSD3fziD4ugktwt4qHqteio2tLDi9hMHwUeUens5HMAsqfASmCpuLHbU5iYF5sNtkc2UyTbs1IZioCz'
        }
    }

    handleStartGame = () => {
        this.props.solo.gameId = this.state.initialGameIdentifier
        this.props.solo.restart()
        this.props.ui.router.switchRoute(RouteEnum.Solo)
    }

    render() {
        return (
            <div className="home-solo">
                <Input
                    className=''
                    value={this.state.initialGameIdentifier}
                    multiline
                    onChange={(update: any) => this.setState({ initialGameIdentifier: update.target.value})}
                />
                <Button onClick={this.handleStartGame}>Start</Button>
                <Button onClick={() => this.setState({initialGameIdentifier: ''})}>Reset</Button>
            </div>
        );
    }
}

export default HomeSolo;
