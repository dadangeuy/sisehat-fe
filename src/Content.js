import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "./pages/index";
import NotFound, {UnderConstruction} from "./pages/error/index";
import {Signup} from "./pages/signup/index";
import Doctor from "./pages/services/doctor/index";

export default class Content extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path={'/signup'} component={Signup}/>
                    <Route exact path={'/services/doctor'} component={Doctor}/>
                    <Route exact path={'/services/drug'} component={UnderConstruction}/>
                    <Route exact path={'/about'} component={UnderConstruction}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}