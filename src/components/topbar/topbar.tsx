import { MainService } from 'components/main.service';
import React from 'react';
import './topbar.styl';

export function Topbar(): JSX.Element {
    const handleMenuCLick = () => {
        MainService.isMenuOpened$.next(true);
    };

    return <div className="topbar">
        <div className="topbar__content">
            <div className="topbar__menu-icon" onClick={handleMenuCLick}/>
            <div className="topbar__app-name">Decider</div>
        </div>
    </div>;
}
