import { addClassToElement, removeClassToElement } from 'ranuts';
import { HTMLElementSSR, createCustomError } from '@/utils/index';
import './index.less'

// index.ts:29 Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children
// index.ts:31 Uncaught DOMException: Failed to construct 'CustomElement': The result must not have attributes

export class Popover extends (HTMLElementSSR()!) {
    _slot: HTMLSlotElement;
    popoverBlock: HTMLDivElement;
    popoverContent?: HTMLDivElement;
    popoverArrow?: HTMLDivElement;
    popoverInner?: HTMLDivElement;
    popoverInnerBlock?: HTMLDivElement;
    removePopoverTimeId?: NodeJS.Timeout;
    static get observedAttributes(): string[] {
        return ['placement', 'arrow', 'trigger'];
    }
    constructor() {
        super();
        this._slot = document.createElement('slot');
        this.popoverBlock = document.createElement('div')
        this.popoverBlock.setAttribute('class', 'ran-popover-block')
        this.popoverBlock.setAttribute("role", "tooltip")
        this.popoverBlock.appendChild(this._slot)
    }
    get placement(): string {
        return this.getAttribute('placement') || 'top'
    }
    set placement(value: string) {
        this.setAttribute('placement', value);
    }
    get arrow(): string {
        return this.getAttribute('arrow') || ''
    }
    set arrow(value: string) {
        this.setAttribute('arrow', value);
    }
    get trigger(): string {
        return this.getAttribute('trigger') || ''
    }
    set trigger(value: string) {
        this.setAttribute('trigger', value);
    }
    get getPopupContainerId(): string {
        return this.getAttribute('getPopupContainerId') || ''
    }
    set getPopupContainerId(value: string) {
        this.setAttribute('getPopupContainerId', value);
    }
    createContent = (content: HTMLCollection): void => {
        if (!content) return
        if (!this.popoverContent) {
            const div = document.createElement('div')
            this.popoverContent = document.createElement('div')
            this.popoverContent.setAttribute('class', 'ran-popover-content')
            this.popoverContent.addEventListener('click', this.clickContent)
            this.popoverArrow = document.createElement('div')
            this.popoverArrow.setAttribute('class', 'ran-popover-content-arrow')
            this.popoverInner = document.createElement('div')
            this.popoverInner.setAttribute('class', 'ran-popover-content-inner')
            this.popoverInnerBlock = document.createElement('div')
            this.popoverInnerBlock.setAttribute('class', 'ran-popover-content-inner-block')
            this.popoverContent.appendChild(this.popoverArrow)
            this.popoverContent.appendChild(this.popoverInner)
            this.popoverInner.appendChild(this.popoverInnerBlock)
            div.appendChild(this.popoverContent)
            document.body.appendChild(div)
        }
        if (this.popoverInnerBlock && content.length > 0) {
            this.popoverInnerBlock.innerHTML = ''
            const Fragment = document.createDocumentFragment()
            for(const child of content){
                Fragment.appendChild(child)
            }
            this.popoverInnerBlock.appendChild(Fragment)
        }
    }
    watchContent = (e: Event): void => {
        const { value } = (<CustomEvent>e).detail
        this.createContent(value.content)
        this.placementPosition()
    }
    placementPosition = (): void => {
        if (!this.popoverInnerBlock || !this.popoverContent) return;
        this.popoverContent?.style.setProperty('display', 'block')
        this.popoverContent?.style.setProperty('opacity', '1')
        const rect = this.getBoundingClientRect();
        const { top, left, bottom, width } = rect;
        this.popoverContent.style.setProperty('--ran-x', `${(left + window.scrollX).toFixed(2)}px`);
        this.popoverContent.style.setProperty('--ran-y', `${(top + window.scrollY).toFixed(2)}px`);
        let popoverTop = bottom + window.scrollY;
        let popoverLeft = left + window.scrollX;
        const root = document.getElementById(this.getPopupContainerId);
        const arrowHeight = 8
        let popoverArrowTransform = `translateX(-50%) translateY(-40%) rotate(0deg)`
        let popoverArrowTop = -arrowHeight
        let popoverArrowLeft = left + this.popoverContent.clientWidth / 2 - arrowHeight / 2
        if (this.placement === 'top') {
            popoverTop = top + window.scrollY - this.popoverContent.clientHeight - arrowHeight;
            if (this.getPopupContainerId && root) {
                popoverTop = top - root.getBoundingClientRect().top - this.popoverContent.clientHeight;
                popoverLeft = left - root.getBoundingClientRect().left;
            }
            popoverArrowTransform = 'translateX(-50%) translateY(40%) rotate(180deg)'
            popoverArrowTop = this.popoverContent.clientHeight - arrowHeight;
            popoverArrowLeft = width / 2
        }
        this.popoverArrow?.style.setProperty('inset', `${popoverArrowTop}px auto auto ${popoverArrowLeft}px`)
        this.popoverArrow?.style.setProperty('transform', popoverArrowTransform)
        this.popoverContent.style.setProperty('inset', `${popoverTop}px auto auto ${popoverLeft}px`);
    };
    hoverPopover = (): void => {
        if (this.removePopoverTimeId) {
            clearTimeout(this.removePopoverTimeId)
            this.removePopoverTimeId = undefined
        }
    }
    clickContent = (e: Event): void => {
        e.stopPropagation()
    }
    clickPopover = (e: Event): void => {
        e.stopPropagation()
        this.placementPosition()
    }
    clickRemovePopover = (): void => {
        this.hoverRemovePopover()
    }
    popoverTrigger = (): void => {
        this.removeEventListener('mouseenter', this.hoverPopover);
        this.removeEventListener('click', this.hoverPopover);
        this.removeEventListener('mouseleave', this.hoverRemovePopover);
        this.removeEventListener('click', this.clickPopover);
        document.removeEventListener('click', this.clickRemovePopover)
        if (this.trigger === 'hover') {
            this.addEventListener('mouseenter', this.placementPosition);
            this.addEventListener('mouseleave', this.hoverRemovePopover);
        } else {
            this.addEventListener('click', this.clickPopover);
            document.addEventListener('click', this.clickRemovePopover)
        }
    }
    hoverRemovePopover = (): void => {
        if (this.removePopoverTimeId) {
            clearTimeout(this.removePopoverTimeId)
            this.removePopoverTimeId = undefined
        }
        this.removePopoverTimeId = setTimeout(() => {
            this.popoverContent?.style.setProperty('opacity', '0')
            setTimeout(() => {
                this.popoverContent?.style.setProperty('display', 'none')
            }, 300);
        }, 100);
    }
    connectedCallback(): void {
        this.setAttribute('class', 'ran-popover')
        this.appendChild(this.popoverBlock)
        for (const element of this.children) {
            if (element.tagName === 'R-CONTENT') {
                element.addEventListener('change', this.watchContent)
                this.createContent(element.children)
            }
        }
        this.popoverTrigger()
    }
    disconnectCallback(): void {
        this.removeEventListener('mouseenter', this.hoverPopover);
        this.removeEventListener('mouseleave', this.hoverRemovePopover);
        this.removeEventListener('click', this.hoverPopover);
        this.removeEventListener('click', this.placementPosition);
        document.removeEventListener('click', this.clickRemovePopover)
        this.popoverContent?.removeEventListener('click', this.clickContent)
    }
    attributeChangedCallback(n: string, o: string, v: string): void {
        if (o !== v) {
            if (n === 'trigger') {
                this.popoverTrigger()
            }
        }
    }
}

function Custom() {
    if (typeof document !== 'undefined' && !customElements.get('r-popover')) {
        customElements.define('r-popover', Popover);
        return Popover;
    } else {
        return createCustomError('document is undefined or r-popover is exist');
    }
}

export default Custom();