import { IModalConfig, TModalSubscriber, TModalWrapperState } from 'common/modal/interface';

export class ModalService {
  private subscribers: Array<TModalSubscriber> = [];

  private defaultConfig: IModalConfig = {
    bodyOpenClassName: 'ReactModal__Body--open',
    closeTimeoutMS: 20,
    onRequestClose: (): void => this.closeModal()
  };

  private state: TModalWrapperState = {
    component: void 0,
    config: void 0,
    isModalOpen: false
  };

  private notify(): void {
    this.subscribers.forEach(
      (subscriber: TModalSubscriber) => subscriber(this.state)
    );
  }

  private mergeConfig(customConfig: IModalConfig = {}): IModalConfig {
    const mergedRequestClose = (): void => {
      customConfig.beforeClose && customConfig.beforeClose();
      customConfig.onRequestClose && customConfig.onRequestClose();
      // tslint:disable-next-line
      this.defaultConfig.onRequestClose!();
      customConfig.afterClose && customConfig.afterClose();
    };

    const mergedBodyClass = customConfig.bodyOpenClassName
        ? `${this.defaultConfig.bodyOpenClassName} ${customConfig.bodyOpenClassName}`
        : this.defaultConfig.bodyOpenClassName;

    return {
      ...this.defaultConfig,
      ...customConfig,
      ...{
        bodyOpenClassName: mergedBodyClass,
        onRequestClose: mergedRequestClose
      }
    };
  }

  openModal(component: JSX.Element, config?: IModalConfig): void {
    this.state = {
      component,
      config: this.mergeConfig(config),
      isModalOpen: true
    };
    this.notify();
  }

  closeModal = (): void => {
    this.state = {
      isModalOpen: false
    };
    this.notify();
  };

  subscribe(handler: (state: TModalWrapperState) => void): () => void {
    this.subscribers.push(handler);

    return (): void => {
        this.subscribers = this.subscribers.filter((sub: TModalSubscriber) => sub !== handler);
      // const index = this.subscribers.indexOf(handler);
      // if (index === -1) { return; }
      // this.subscribers.splice(index, 1);
    };
  }
}

export const modalService = new ModalService();
