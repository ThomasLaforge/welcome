import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import { Store } from './modules/Store'
import { RouteEnum, MapMode } from './modules/Welcome'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import PeopleIcon from '@material-ui/icons/People';
import MapIcon from '@material-ui/icons/Map';
import CasinoIcon from '@material-ui/icons/Casino';
import AppsIcon from '@material-ui/icons/Apps';

import Manager from './components/Manager/Manager';
import MapModule from './components/Map/MapModule';
import SoloGame from './components/Solo/SoloGame';

import './styles/main.scss';
import RouterComponent from './components/Router/RouterComponent';

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
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
                  <AppsIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  Welcome
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer open={this.state.drawerOpened} onClose={this.toggleDrawer}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
              >
                <List component="nav">
                  <ListItem button onClick={() => this.state.store.uiStore.router.switchRoute(RouteEnum.Solo)}>
                    <ListItemIcon>
                      <VideogameAssetIcon />
                    </ListItemIcon>
                    <ListItemText primary="Solo" />
                  </ListItem>
                  <ListItem button disabled onClick={() => this.state.store.uiStore.router.switchRoute(RouteEnum.Multi)}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Multi" />
                  </ListItem>
                  <ListItem button onClick={() => this.state.store.uiStore.router.switchRoute(RouteEnum.Manager)}>
                    <ListItemIcon>
                      <CasinoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manager" />
                  </ListItem>
                  <ListItem button onClick={() => this.state.store.uiStore.router.switchRoute(RouteEnum.Map)}>
                    <ListItemIcon>
                      <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Map" />
                  </ListItem>
                </List>
              </div>
            </Drawer>

            <RouterComponent />

          </div>
      </Provider>
    );
  }
}

export default App;