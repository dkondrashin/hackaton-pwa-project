// import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Router } from 'react-router-dom';
import { AppComponent } from './App.component';

// const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter>
        <AppComponent/>
    </BrowserRouter>,
    document.getElementById('root')
);

