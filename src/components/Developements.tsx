import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Developements as DevelopementsModel, Developement as DevelopementModel} from '../modules/Developements'

import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import {FormControlLabel} from 'material-ui/Form'


interface DevelopementsProp extends DefaultProps {
}

interface DevelopementsStat {
}

@inject(injector)
@observer
export default class Developements extends React.Component<DevelopementsProp, DevelopementsStat> {
    constructor(props: DevelopementsProp) {
        super(props);
        this.state = {
        };
    }

    renderDevelopements(){
        return this.props.game.developements.developements.map( (d, k) => <Dev dev={d} key={k} />)
    }

    render() {
        return <div className={'developements'}>
            <h2 className={'developements-title'}>Developements</h2>
            {this.renderDevelopements()}
            {/* <Button onClick={() => {this.props.game.Developements.nbJobsDone++}}>Add</Button> */}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface DevProps extends DefaultProps {
    dev: DevelopementModel
}

interface DevState {
}

@inject(injector)
@observer
class Dev extends React.Component<DevProps, DevState> {

    constructor(props: DevProps) {
        super(props);
        this.state = {
        };
    }

    tryToBuy = () => {
        this.props.game.step4(this.props.ui.currentMoney, this.props.dev)
    }

    render() {
        const dev = this.props.dev
        const devDoneClass = dev.validate ? ' dev-done' : ''

        return <div className={'dev' + devDoneClass}> 
                <div className="dev-elt">
                <FormControlLabel
                    title={dev.definition}
                    control={
                        <Checkbox
                            checked={dev.validate}
                            onChange={this.tryToBuy}
                            value={dev.cost + ' : ' + dev.definition}
                            color="primary"
                            disabled={dev.validate || dev.cost > this.props.ui.currentMoney}
                        />
                    }
                    label={dev.cost + ' - ' + dev.name + ' (' + dev.points + ') : ' + dev.shortDescription}
                />   
                </div>
        </div>
    }
}