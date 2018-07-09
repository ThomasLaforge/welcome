import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import { Store } from './modules/Store'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Drawer from 'material-ui/Drawer'

import Game from './components/Game';
import EndGame from './components/EndGame';
import RoundCounter from './components/RoundCounter';
import Scores from './components/Scores';
import './styles/main.scss';

@observer
class App extends React.Component<{}, { store: Store, drawerOpened: boolean} > {

  constructor(props: any){
    super(props);
    this.state = {
      store: new Store(),
      drawerOpened: false
    }
  }

  toggleDrawer = () => {
    this.setState({ drawerOpened: ! this.state.drawerOpened })
  }

  render() {
    return (
      <Provider store={this.state.store} >
          <div className="app">
          {/* https://codesandbox.io/s/kk2889j305 */}
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  Roll Through The Ages
                </Typography>
                <div className='toolbar-round-counter'>
                  <RoundCounter />
                  <Scores />              
                </div>  
              </Toolbar>
            </AppBar>
            <Drawer open={this.state.drawerOpened} onClose={() => this.setState({drawerOpened: false})}>
              
            </Drawer>
            {this.state.store.gameStore.isOver() ? <EndGame /> : <Game />}
          </div>
      </Provider>
    );
  }
}

export default App;