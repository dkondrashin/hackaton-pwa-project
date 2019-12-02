// import { AppRoutes } from 'app-routes';
// import { ModalWrapper } from 'common/modal/modal-wrapper';
import React from 'react';
import { Route, Switch } from 'react-router';

// import './App.component.styl';


export function AppComponent() {
    return <div className="app-component app-component__default-background">
        {/*<div className="app-component__navigation">*/}
        {/*    <NavigationComponent/>*/}
        {/*</div>*/}

        <span>Start</span>

        {/*<div className="app-component__indent"/>*/}

        <Switch>
            {/*<Route exact path={AppRoutes.HOME} component={CardsWrapperComponent}/>*/}
            {/*<Route path={AppRoutes.PAY_TABLE} component={PayTableComponent}/>*/}
        </Switch>

        {/*<ModalWrapper/>*/}
    </div>;
}
