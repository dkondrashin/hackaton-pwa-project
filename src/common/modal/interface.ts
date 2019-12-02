export interface IModalConfig {
    closeTimeoutMS?: number;
    style?: {
        overlay?: object,
        content?: object
    };
    contentLabel?: string;
    portalClassName?: string;
    overlayClassName?: string;
    className?: string;
    bodyOpenClassName?: string;
    htmlOpenClassName?: string;
    ariaHideApp?: boolean;
    shouldFocusAfterRender?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    shouldCloseOnEsc?: boolean;
    shouldReturnFocusAfterClose?: boolean;
    role?: string;
    data?: object;
    onAfterOpen?(): void;
    beforeClose?(): void;
    afterClose?(): void;
    // @deprecated use beforeClose or afterClose
    onRequestClose?(): void;
    parentSelector?(): HTMLElement;
    // tslint:disable-next-line
    overlayRef?(ref: any): void;
    // tslint:disable-next-line
    contentRef?(ref: any): void;
}

export type TModalWrapperState = {
    component?: JSX.Element,
    config?: IModalConfig,
    isModalOpen: boolean
};

export type TModalSubscriber = (state: TModalWrapperState) => void;
