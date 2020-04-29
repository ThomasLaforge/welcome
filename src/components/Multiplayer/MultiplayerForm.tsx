import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'
import { Input, Button } from '@material-ui/core';
import { navigate } from "@reach/router"

interface MultiplayerFormProps extends DefaultProps {
}
interface MultiplayerFormState {
    gameId
}

@inject(injector)
@observer
class MultiplayerForm extends React.Component <MultiplayerFormProps, MultiplayerFormState> {

    constructor(props: MultiplayerFormProps){
        super(props)
        this.state = {
            gameId: ''
        }
    }

    defaultOnClick = () => {
        console.log('click on menu item')
    }

    render() {
        return (
            <div className="multiplayer-form">
                <Input 
                    className='multiplayer-form-input'
                    value={this.state.gameId} 
                    onChange={(e) => this.setState({gameId: e.target.value })} 
                />
                <Button
                    className='multiplayer-form-button'
                    onClick={this.handleStartGame}
                >Start !</Button>
            </div>
        );
    }

    handleStartGame = () => {
        console.log('gameId to load', this.state.gameId)
        this.props.solo.gameId = this.state.gameId
        this.props.solo.restart()
        navigate('/solo')
    }
}

export default MultiplayerForm;
