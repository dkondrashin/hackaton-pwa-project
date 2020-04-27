import { templatesService, TTemplateValue } from 'components/templates.service';
import React, { ChangeEvent } from 'react';
import './main.component.styl';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddAppOfferComponent } from '../add-app-offer.component/add-app-offer.component';
import { modalService } from '../../common/modal/modal.service';
// import { VariantsListComponent } from 'components/variants-list/variants-list.component';
import { VariantsListComponent } from '../variants-list/variants-list.component';
import { VariantInputRow } from '../variant-input-row/variant-input-row.component';
import { GeneratedGroups } from 'components/generated-groups/generated-groups';

import { MainService } from 'components/main.service';

type TMainState = {
    allVariants: Array<string>;
    generatedVariants: Array<Array<string>>;
};

export class MainComponent extends React.PureComponent<{}, TMainState> {
    readonly state: Readonly<TMainState> = {
        allVariants: [],
        generatedVariants: []
    };

    private unsubscribe$: Subject<void> = new Subject<void>();
    private groupsAmount: number = 0;
    private groupsLimit: number = 0;
    private templateName: string;

    // TODO: later try better add to desktop modal
    deferredPrompt: any;

    private listenTemplate(): void {
        templatesService.currentTemplate$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((template: Array<TTemplateValue>) => {
                this.setState({ allVariants: template })
            });
    }

    componentDidMount(): void {
        this.listenTemplate();
    }

    componentWillUnmount(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    generate = (): void => {
        if (this.groupsAmount) {
            const groups = MainService.divideOnGroups(this.state.allVariants, this.groupsAmount, this.groupsLimit);
            this.setState({ generatedVariants: groups });
            return;
        }

        const randomNum = MainService.getRandomNumber(this.state.allVariants.length);
        this.setState({
            generatedVariants: [[this.state.allVariants[randomNum]]]
        });
    };

    handleInputAdd = (newVariant: string) => {
        if (this.state.allVariants.includes(newVariant)) return;

        this.setState((state: TMainState) => {
            return { allVariants: state.allVariants.concat(newVariant) };
        })
    };

    handleRemove = (removedVariant: string) => {
        this.setState((state: TMainState) => {
            return { allVariants: state.allVariants.filter((variant: string) => variant !== removedVariant) };
        })
    };

    handleGroupsAmountChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.groupsAmount = Number(event.target.value) || 0;
    };

    handleGroupsLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.groupsLimit = Number(event.target.value) || 0;
    };

    handleTemplateNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.templateName = event.target.value || '';
    };

    handleTemplateSave = (): void => {
        templatesService.addTemplate(this.templateName, this.state.allVariants);
    };

    render(): JSX.Element | null {
        // if (!this.state || !this.state.generatedNumber) return null;

        return <div className="main-wrapper">
            <div className="main">
                <VariantInputRow onInputAdd={this.handleInputAdd}/>

                <VariantsListComponent
                    variants={this.state.allVariants}
                    onRemove={this.handleRemove}
                />

                <div className="main__divider"/>

                <div className="main__options">
                    <div className="main__counter">
                        <label className="main__counter-label">Кол-во групп:</label>
                        <input className="main__counter-input" type={'number'} onChange={this.handleGroupsAmountChange}/>
                    </div>

                    <div className="main__counter">
                        <label className="main__counter-label">Ограничение:</label>
                        <input className="main__counter-input" type={'number'} onChange={this.handleGroupsLimitChange}/>
                    </div>

                    <div className="main__save-template">
                        <label className="main__save-template-label">Сохранить как шаблон</label>
                        <div className="main__save-template-row">
                            <input className="main__save-template-input" maxLength={30} onChange={this.handleTemplateNameChange}/>
                            <button className="main__save-template-button" onClick={this.handleTemplateSave}/>
                        </div>
                    </div>
                </div>

                <div className="main__divider"/>

                <div className="main__generated">
                    <GeneratedGroups groups={this.state.generatedVariants}/>
                    {/*{this.state.generatedVariant}*/}
                </div>

                <button className="main__random-button" onClick={this.generate}>Start Random!</button>
            </div>
        </div>;
    }
}

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

// componentDidMount(): void {
//     servicewor
// }
