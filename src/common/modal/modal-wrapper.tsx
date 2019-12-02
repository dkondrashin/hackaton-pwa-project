import { TModalWrapperState } from 'common/modal/interface';
import { modalService, ModalService } from 'common/modal/modal.service';
import React from 'react';
import Modal from 'react-modal';

Modal.defaultStyles = {
    content: {
        width: 'max-content',
        height: 'max-content'
    },
    overlay: {
        bottom: '0px',
        left: '0px',
        position: 'fixed',
        right: '0px',
        top: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export class ModalWrapper extends React.PureComponent<{}, TModalWrapperState> {
    private modalService: ModalService = modalService;
    private modalServiceSubscription: () => void;

    readonly state: Readonly<TModalWrapperState> = {
        component: undefined,
        config: void 0,
        isModalOpen: false
    };

    componentDidMount(): void {
        this.modalServiceSubscription = this.modalService.subscribe((modalState: TModalWrapperState) => {
            this.setState((state: TModalWrapperState) => ({ ...state, ...modalState }));
        });
    }

    componentWillUnmount(): void {
        this.modalServiceSubscription();
    }

    render(): JSX.Element {
        return <Modal
            isOpen={this.state.isModalOpen}
            {...this.state.config}
        >
            {this.state.component}
        </Modal>
    }
}
