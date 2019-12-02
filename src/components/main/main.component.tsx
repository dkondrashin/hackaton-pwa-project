import React from 'react';

import './main.component.styl';

export class MainComponent extends React.PureComponent {
    generate = (): void => {
        console.log('random generated!');

    };

    render() {
        return <div className="main-wrapper">
            <div className="main">
                <div className="main__title">
                    Main menu
                </div>

                <button className="main__random-button" onClick={this.generate}>Start Random!</button>
            </div>
        </div>;
    }
}
