import React from 'react';
import './main.component.styl';
import { AddAppOfferComponent } from '../add-app-offer.component/add-app-offer.component';
import { modalService } from '../../common/modal/modal.service';

export class MainComponent extends React.PureComponent {
    deferredPrompt: any;

    generate = (): void => {
        console.log('random generated!');

    };

    // openNewModal = (): void => {
    //     modalService.openModal(<AddAppOfferComponent/>);
    // };
    //
    // choiceHandler(): void {
    //
    // }
    //
    // handleAppInstallPrompt = (e: any) => {
    //     console.log(e, 'beforeinstallprompt e');
    //     // Prevent Chrome 67 and earlier from automatically showing the prompt
    //     e.preventDefault();
    //     // Stash the event so it can be triggered later.
    //     this.deferredPrompt = e;
    //     // Update UI notify the user they can add to home screen
    //     // btnAdd.style.display = 'block';
    // };
    //
    // handlePromptReaction = (e: any) => {
    //     // hide our user interface that shows our A2HS button
    //     btnAdd.style.display = 'none';
    //     // Show the prompt
    //     this.deferredPrompt && this.deferredPrompt.prompt();
    //     // Wait for the user to respond to the prompt
    //     this.deferredPrompt && this.deferredPrompt.userChoice
    //         .then((choiceResult) => {
    //             if (choiceResult.outcome === 'accepted') {
    //                 console.log('User accepted the A2HS prompt');
    //             } else {
    //                 console.log('User dismissed the A2HS prompt');
    //             }
    //             this.deferredPrompt = null;
    //         });
    // }
    //
    // checkAppInstallPrompt(): void {
    //     let deferredPrompt: any = null;
    //
    //     window.addEventListener('beforeinstallprompt', (e) => {
    //         console.log(e, 'beforeinstallprompt e');
    //         // Prevent Chrome 67 and earlier from automatically showing the prompt
    //         e.preventDefault();
    //         // Stash the event so it can be triggered later.
    //         deferredPrompt = e;
    //         // Update UI notify the user they can add to home screen
    //         btnAdd.style.display = 'block';
    //     });
    //
    //     window.addEventListener('click', (e) => {
    //         // hide our user interface that shows our A2HS button
    //         btnAdd.style.display = 'none';
    //         // Show the prompt
    //         deferredPrompt && deferredPrompt.prompt();
    //         // Wait for the user to respond to the prompt
    //         deferredPrompt && deferredPrompt.userChoice
    //             .then((choiceResult) => {
    //                 if (choiceResult.outcome === 'accepted') {
    //                     console.log('User accepted the A2HS prompt');
    //                 } else {
    //                     console.log('User dismissed the A2HS prompt');
    //                 }
    //                 deferredPrompt = null;
    //             });
    //     });
    // }
    //
    // componentDidMount(): void {
    //     modalService.openModal(<AddAppOfferComponent onChoose={this.choiceHandler}/>);
    //     this.checkAppInstallPrompt();
    // }

    render(): JSX.Element {
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
