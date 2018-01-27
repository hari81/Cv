import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import App from '../App';
import Orders from './components/Orders';
import CancelOrder from './components/CancelOrder';

const RouterComponent = () =>
  (
    <Router >

        <Scene key="auth">
            <Scene key="login" component={App} hideNavBar initial />


        </Scene>

        <Scene key="main">
            <Scene hideNavBar key="order" component={Orders} initial />
            <Scene key="cancelOrder" component={CancelOrder} hideNavBar />

        </Scene>
    </Router>
  );


export default RouterComponent;
