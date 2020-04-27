import React from 'react';
import './variants-list.component.styl';

import { MainService } from 'components/main.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type TVariantsListProps = {
    variants: Array<string>,
    onRemove: (variant: string) => void
}

type TVariantsListState = {
    variants: Array<string>;
}


export class VariantsListComponent extends React.PureComponent<TVariantsListProps, TVariantsListState> {
    readonly state: Readonly<TVariantsListState> = {
        variants: []
    };

    // private unsubscribe$: Subject<void> = new Subject<void>();

    // componentDidMount(): void {
    //     MainService.randomNumber$
    //         .pipe(takeUntil(this.unsubscribe$))
    //         .subscribe((randomNumber) => {
    //             this.props.showVariant(this.state.variants[randomNumber]);
    //         })
    // }
    //
    // componentWillUnmount(): void {
    //     this.unsubscribe$.next();
    //     this.unsubscribe$.complete();
    // }

    // onRemove = (event: Event | undefined, variant: string): void => {
    // onRemove = (event: Event | undefined, variant: string): any => {
    onRemove = (variant: string): void => {
        this.props.onRemove(variant);
    };

    render(): JSX.Element {
        const variantsList = this.props.variants.map((variant: string) => {
            // add remove icon?
            return <div className="variants-list__variant" key={variant}>
                <div className="variants-list__variant-name">{variant}</div>
                <div className="variants-list__variant-remove-icon" onClick={this.onRemove.bind(this, variant)}/>
            </div>;
        });

        return <div className="variants-list">
            {variantsList}
        </div>;
    }
}
