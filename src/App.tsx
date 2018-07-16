import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import { Store } from './modules/Store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'

import Manager from './components/Manager';
import WelcomeMap from './components/WelcomeMap';
import SoloGame from './components/SoloGame';

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
                {/* <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton> */}
                <Typography variant="title" color="inherit">
                  Welcome
                </Typography>
              </Toolbar>
            </AppBar>
            {/* <Manager /> */}
            {/* <WelcomeMap /> */}
            <SoloGame />
          </div>
      </Provider>
    );
  }
}

export default App;