import React from 'react';

import './add-app-offer.component.styl';

export class AddAppOfferComponent extends React.PureComponent {
    render(): JSX.Element {
        return <div className="add-app-offer">
            <div className="add-app-offer__question">
                Добавим приложение на главный экран?
            </div>


            <div className="add-app-offer__buttons">
                <div className="add-app-offer__accept">Конечно</div>

                <div className="add-app-offer__reject">Не, позже</div>
            </div>
        </div>;
    }
}
