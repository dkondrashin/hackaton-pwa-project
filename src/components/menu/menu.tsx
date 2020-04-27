import { MainService } from 'components/main.service';
import { MenuTemplates } from 'components/menu/menu-templates/menu-templates';
import React from 'react';
import './menu.styl';

import { templatesService } from 'components/templates.service';

// import '@style/vars.styl';

type TPosition = {
    x?: number,
    y?: number
};

type TMenuState = {
    isMenuShown: boolean,
    areTemplatesShown: boolean
}

export class Menu extends React.PureComponent<{}, TMenuState> {
    // readonly state: Readonly<TMenuState> = {
    //     isMenuShown: false
    // };
    readonly state: Readonly<TMenuState>;

    private menuCurtainElement: HTMLDivElement | null;
    // private menuCurtainElement: any | null = React.createRef();
    private rafPending: boolean;
    private initialTouchPos: TPosition | null = null;
    private lastTouchPos: TPosition | null = null;

    static getGesturePointFromEvent(evt): TPosition {
        const point: { x?: number, y?: number } = {};

        if(evt.targetTouches) {
            // Prefer Touch Events
            point.x = evt.targetTouches[0].clientX;
            point.y = evt.targetTouches[0].clientY;
        } else {
            // Either Mouse event or Pointer Event
            point.x = evt.clientX;
            point.y = evt.clientY;
        }

        return point;
    };

    componentDidMount(): void {
        // Отписываться нет смысла, т.к. меню всегда работает
        MainService.isMenuOpened$.subscribe(isOpened => {
            // if (isOpened) {
            //     setTimeout(() => this.subscribeTouchEvents(), 1000);
            //     // this.setState({ isMenuShown: isOpened })
            // } else {
            //     this.unsubscribeTouchEvents();
            // }

            this.setState({ isMenuShown: isOpened })
        });

        // setTimeout(() => this.subscribeTouchEvents(), 1000);
        // this.listenTouchEvents();
    }

    onCloseMenu = () => {
        MainService.isMenuOpened$.next(false);
    };

    render(): JSX.Element | null {
        console.log(this.state);
        if (!this.state) return null;

        const menuAnimClass = this.state.isMenuShown ? 'menu--opened' : 'menu--closed';
        const curtainAnimClass = this.state.isMenuShown ? 'menu-curtain--opened' : 'menu-curtain--closed';

        const templatesList = this.state.areTemplatesShown ? null : <MenuTemplates/>;

        return <div className={`menu ${menuAnimClass}`}>
            {/*return <div className="menu">*/}
            {/*<div className="menu-curtain" ref={this.makeCurtainRef}>*/}
            <div className={`menu-curtain ${curtainAnimClass}`}>
                <div className="menu-curtain__title" onClick={this.onCloseMenu}/>
                <div className="menu-curtain__list">
                    <div className="menu-curtain__list-item">Шаблоны</div>
                    <div className="menu-curtain__list-sublist">
                        {templatesList}
                    </div>

                    <div className="menu-curtain__list-item">Группы</div>
                </div>
            </div>
        </div>;
    }

    // EXPERIMENTAL
    // makeCurtainRef = (node: HTMLDivElement | null): void => { this.menuCurtainElement = node; };
    //
    // subscribeTouchEvents = () => {
    //     if (!this.menuCurtainElement) return;
    //     // @ts-ignore
    //     const curtain = this.menuCurtainElement;
    //     // const curtain = this.menuCurtainElement.current;
    //     console.log('curtain in listenTouchEvents:', curtain);
    //     console.log('this.menuCurtainElement in listenTouchEvents:', this.menuCurtainElement);
    //
    //     // Check if pointer events are supported.
    //     if (window.PointerEvent) {
    //         // Add Pointer Event Listener
    //         curtain.addEventListener('pointerdown', this.handleGestureStart, true);
    //         curtain.addEventListener('pointermove', this.handleGestureMove, true);
    //         curtain.addEventListener('pointerup', this.handleGestureEnd, true);
    //         curtain.addEventListener('pointercancel', this.handleGestureEnd, true);
    //     } else {
    //         // Add Touch Listener
    //         curtain.addEventListener('touchstart', this.handleGestureStart, true);
    //         curtain.addEventListener('touchmove', this.handleGestureMove, true);
    //         curtain.addEventListener('touchend', this.handleGestureEnd, true);
    //         curtain.addEventListener('touchcancel', this.handleGestureEnd, true);
    //
    //         // Add Mouse Listener
    //         curtain.addEventListener('mousedown', this.handleGestureStart, true);
    //     }
    // };
    //
    // unsubscribeTouchEvents = () => {
    //     if (!this.menuCurtainElement) return;
    //     // @ts-ignore
    //     const curtain = this.menuCurtainElement;
    //     // const curtain = this.menuCurtainElement.current;
    //     console.log('curtain in listenTouchEvents', curtain);
    //
    //     // Check if pointer events are supported.
    //     if (window.PointerEvent) {
    //         // Add Pointer Event Listener
    //         curtain.removeEventListener('pointerdown', this.handleGestureStart, true);
    //         curtain.removeEventListener('pointermove', this.handleGestureMove, true);
    //         curtain.removeEventListener('pointerup', this.handleGestureEnd, true);
    //         curtain.removeEventListener('pointercancel', this.handleGestureEnd, true);
    //     } else {
    //         // Add Touch Listener
    //         curtain.removeEventListener('touchstart', this.handleGestureStart, true);
    //         curtain.removeEventListener('touchmove', this.handleGestureMove, true);
    //         curtain.removeEventListener('touchend', this.handleGestureEnd, true);
    //         curtain.removeEventListener('touchcancel', this.handleGestureEnd, true);
    //
    //         // Add Mouse Listener
    //         curtain.removeEventListener('mousedown', this.handleGestureStart, true);
    //     }
    // };
    //
    // // Handle the start of gestures
    // handleGestureStart = (evt) => {
    //     if (!this.menuCurtainElement) return;
    //     // @ts-ignore
    //     const curtain = this.menuCurtainElement;
    //     // const curtain = this.menuCurtainElement.current;
    //
    //     evt.preventDefault();
    //
    //     if(evt.touches && evt.touches.length > 1) {
    //         return;
    //     }
    //
    //     // Add the move and end listeners
    //     if (window.PointerEvent) {
    //         evt.target.setPointerCapture(evt.pointerId);
    //     } else {
    //         // Add Mouse Listeners
    //         document.addEventListener('mousemove', this.handleGestureMove, true);
    //         document.addEventListener('mouseup', this.handleGestureEnd, true);
    //     }
    //
    //     this.initialTouchPos = Menu.getGesturePointFromEvent(evt);
    //
    //     curtain.style.transition = 'initial';
    // };
    //
    // onAnimFrame = (currentXPosition) => {
    //     if(!this.rafPending) {
    //         return;
    //     }
    //
    //     if (!this.menuCurtainElement) return;
    //     // @ts-ignore
    //     const curtain = this.menuCurtainElement;
    //     // const curtain = this.menuCurtainElement.current;
    //
    //     // @ts-ignore
    //     const differenceInX = this.initialTouchPos.x - this.lastTouchPos.x;
    //
    //     // ????
    //     // const currentXPosition = curtain.getBoundingClientRect().x;
    //     console.log('currentXPosition', currentXPosition);
    //     // @ts-ignore
    //     console.log('this.initialTouchPos.x', this.initialTouchPos.x);
    //     // @ts-ignore
    //     console.log('this.lastTouchPos.x', this.lastTouchPos.x);
    //     //
    //
    //     const newXTransform = (currentXPosition - differenceInX)+'px';
    //     const transformStyle = 'translateX('+newXTransform+')';
    //     curtain.style.webkitTransform = transformStyle;
    //     // @ts-ignore
    //     curtain.style.MozTransform = transformStyle;
    //     // @ts-ignore
    //     curtain.style.msTransform = transformStyle;
    //     curtain.style.transform = transformStyle;
    //
    //     this.rafPending = false;
    // };
    //
    // handleGestureMove = (evt) => {
    //     console.log('handleGestureMove:', evt);
    //     console.log('handleGestureMove X:', evt.x);
    //     evt.preventDefault();
    //
    //     if(!this.initialTouchPos) {
    //         return;
    //     }
    //
    //     this.lastTouchPos = Menu.getGesturePointFromEvent(evt);
    //
    //     if(this.rafPending) {
    //         return;
    //     }
    //
    //     this.rafPending = true;
    //
    //     const currentX = evt.x;
    //     window.requestAnimationFrame(() => this.onAnimFrame(currentX));
    //     // window.requestAnimFrame(this.onAnimFrame);
    // };
    //
    // // Handle end gestures
    // handleGestureEnd = (evt) => {
    //     console.log('handleGestureEnd                      END X:', evt.x);
    //     evt.preventDefault();
    //
    //     if(evt.touches && evt.touches.length > 0) {
    //         return;
    //     }
    //
    //     this.rafPending = false;
    //
    //     // Remove Event Listeners
    //     if (window.PointerEvent) {
    //         evt.target.releasePointerCapture(evt.pointerId);
    //     } else {
    //         // Remove Mouse Listeners
    //         document.removeEventListener('mousemove', this.handleGestureMove, true);
    //         document.removeEventListener('mouseup', this.handleGestureEnd, true);
    //     }
    //
    //     // updateSwipeRestPosition();
    //
    //     this.initialTouchPos = null;
    // };
    // EXPERIMENTAL
}
