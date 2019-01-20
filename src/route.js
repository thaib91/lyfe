import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Accountable from './components/Accountable/Accountable';
import Skillshare from './components/Skillshare/Skillshare';

export default (
    <Switch>
        {/* <Route exact path='/'/> */}
        <Route  exact path='/' component={Landing}/>
        <Route  path='/accountable' component={Accountable}/>
        <Route  path='/skillshare' component={Skillshare}/>
    </Switch>
)