import { createCustomError, falseList, isDisabled } from '@/utils/index';

function Custom() {
  if (typeof window !== 'undefined' && !customElements.get('r-input')) {
    class CustomElement extends HTMLElement {
      static get observedAttributes() {
        return [
          'label',
          'disabled',
          'name',
          'placeholder',
          'type',
          'icon',
          'status',
        ];
      }
      _input: HTMLDivElement;
      _label: HTMLLabelElement | undefined;
      _inputContent: HTMLInputElement;
      _icon: HTMLElement | undefined;
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        this._input = document.createElement('div');
        this._input.setAttribute('class', 'ran-input');
        this._input.setAttribute('part', 'ran-input');
        this._inputContent = document.createElement('input');
        this._inputContent.setAttribute('class', 'ran-input-content');
        this._inputContent.setAttribute('part', 'ran-input-content');
        this._input.appendChild(this._inputContent);
        shadowRoot.appendChild(this._input);
      }
      /**
       * @description: 获取input的值
       * @return {String}
       */
      get value() {
        return this.getAttribute('value');
      }
      /**
       * @description: 设置input的值
       * @param {String} value
       */
      set value(value) {
        if (!isDisabled(this) && value) {
          this.setAttribute('value', value);
          this._input.setAttribute('value', value);
        } else {
          this.removeAttribute('value');
          this._input.removeAttribute('value');
        }
      }
      /**
       * @description: 获取input的占位字符
       * @return {String}
       */
      get placeholder() {
        return this.getAttribute('placeholder');
      }
      /**
       * @description: 设置input的占位字符
       * @param {String} value
       */
      set placeholder(value) {
        if (value) {
          this.setAttribute('placeholder', value);
        } else {
          this.removeAttribute('placeholder');
        }
      }
      /**
       * @description: input是否为必选
       * @return {String}
       */
      get required() {
        return this.getAttribute('required');
      }
      /**
       * @description: 设置input是否为必选，除非设置成false，否则都是必填
       * @param {*} value
       */
      set required(value) {
        if (!value || value === 'false') {
          this.removeAttribute('required');
        } else {
          this.setAttribute('required', '');
        }
      }
      /**
       * @description: 获取input上disabled属性
       * @return {String | null}
       */
      get disabled() {
        return isDisabled(this);
      }
      /**
       * @description: 设置input的disabled属性
       * @param {String} value
       */
      set disabled(value) {
        if (falseList.includes(value)) {
          this.removeAttribute('disabled');
          this._input.removeAttribute('disabled');
          this._inputContent.removeAttribute('disabled');
        } else {
          this.setAttribute('disabled', '');
          this._input.setAttribute('disabled', '');
          this._inputContent.setAttribute('disabled', '');
        }
      }
      /**
       * @description: 获取类似于Metiral Design的输入体验。
       */
      get label() {
        return this.getAttribute('label') || '';
      }
      /**
       * @description: 设置类似于Metiral Design的输入体验。
       */
      set label(value: string) {
        this.setAttribute('label', value);
      }
      /**
       * @description: 获取input框的状态
       */
      get status() {
        return this.getAttribute('status') || '';
      }
      /**
       * @description: 设置input框的状态
       */
      set status(value: string) {
        if (value) {
          this.setAttribute('status', value);
          this._input.setAttribute('status', value);
        } else {
          this.removeAttribute('status');
          this._input.removeAttribute('status');
        }
      }
      /**
       * @description: 与form组件联动时，收集的属性名
       * @return {String}
       */
      get name() {
        return this.getAttribute('name') || '';
      }
      /**
       * @description: 设置name属性
       * @param {string} value
       */
      set name(value: string) {
        this.setAttribute('name', value);
      }
      /**
       * @description: 当input类型为number类型时，可以获取min属性
       * @return {String}
       */
      get min() {
        return this.getAttribute('min') || '';
      }
      /**
       * @description: 当input类型为number类型时，设置min属性
       * @param {string} value
       */
      set min(value: string) {
        if (this.type === 'number') this.setAttribute('min', value);
      }
      /**
       * @description: 当input类型为number类型时，可以获取max属性
       * @return {String}
       */
      get max() {
        return this.getAttribute('max') || '';
      }
      /**
       * @description: 当input类型为number类型时，设置max属性
       * @param {string} value
       */
      set max(value: string) {
        if (this.type === 'number') this.setAttribute('max', value);
      }
      /**
       * @description: 当input类型为number类型时，可以获取step属性
       * @return {String}
       */
      get step() {
        return this.getAttribute('step') || '';
      }
      /**
       * @description: 当input类型为number类型时，设置step属性
       * @param {string} value
       */
      set step(value: string) {
        if (this.type === 'number') this.setAttribute('step', value);
      }
      /**
       * @description: 获取一个icon
       * @return {String}
       */
      get icon() {
        return this.getAttribute('icon');
      }
      /**
       * @description: 设置icon来表示标识
       * @param {string|null} value
       */
      set icon(value) {
        if (value) {
          this.setAttribute('icon', value);
        } else {
          this.removeAttribute('icon');
        }
      }
      /**
       * @description: 获取input的类型
       * @return {string|null}
       */
      get type() {
        return this.getAttribute('type');
      }
      /**
       * @description: 设置input的类型
       * @param {string|null} value
       */
      set type(value) {
        if (value) {
          this.setAttribute('type', value);
        } else {
          this.removeAttribute('type');
        }
      }
      /**
       * @description: 原生的input方法
       * @param {Event} event
       */
      customInput = (event: Event) => {
        event.stopPropagation();
        const target = event.target as HTMLInputElement;
        this.value = target ? target.value : '';
        // 增加onchange事件
        this.customChange();
        // 默认input事件
        this.dispatchEvent(
          new CustomEvent('input', {
            detail: {
              value: this.value,
            },
          }),
        );
      };
      /**
       * @description: 增加change方法，同时兼容大小写的情况
       */
      customChange = () => {
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              value: this.value,
            },
          }),
        );
      };
      /**
       * @description: 监听placeholder属性函数
       * @param {string} name
       * @param {string} value
       */
      listenPlaceholder(name: string, value: string) {
        if (name === 'placeholder' && this._inputContent) {
          if (value != null) {
            this._inputContent.setAttribute('placeholder', value);
          } else {
            this._inputContent.removeAttribute('placeholder');
          }
        }
      }
      /**
       * @description: 监听label属性函数
       * @param {string} name
       * @param {string} value
       */
      listenLabel(name: string, value: string) {
        if (name === 'label' && this._inputContent) {
          if (value != null) {
            if (this._label) {
              this._label.innerHTML = value;
            } else {
              this._label = document.createElement('label');
              this._label.innerHTML = value;
              this._label.setAttribute('class', 'ran-input-label');
              this._label.setAttribute('part', 'ran-input-label');
              this._input.appendChild(this._label);
            }
          } else {
            this._input.removeAttribute('label');
            if (this._label) {
              this._input.removeChild(this._label);
              this._label = undefined;
            }
          }
        }
      }
      /**
       * @description: 监听type属性
       * @param {string} name
       * @param {string} value
       */
      listenType(name: string, value: string) {
        if (name === 'type' && this._inputContent) {
          if (value) {
            this._inputContent.setAttribute('type', value);
          } else {
            this._inputContent.removeAttribute('type');
            this._inputContent.removeAttribute('min');
            this._inputContent.removeAttribute('max');
            this._inputContent.removeAttribute('step');
          }
        }
      }
      /**
       * @description: 监听status属性
       * @param {string} name
       * @param {string} value
       */
      listenStatus(name: string, value: string) {
        if (name === 'status' && this._input) {
          if (value) {
            this._input.setAttribute('status', value);
          } else {
            this._input.removeAttribute('status');
          }
        }
      }
      /**
       * @description: 监听disabled属性
       * @param {string} name
       * @param {string} value
       */
      listenDisabled(name: string, value: string) {
        if (name === 'disabled' && this._input) {
          if (falseList.includes(value)) {
            this._input.removeAttribute('disabled');
          } else {
            this._input.setAttribute('disabled', '');
            this._inputContent.setAttribute('disabled', '');
          }
        }
      }
      /**
       * @description:  监听icon属性
       * @param {string} name
       * @param {string} value
       */
      listenIcon(name: string, value: string, oldValue: string) {
        if (name === 'icon' && value && value !== oldValue) {
          this.removeAttribute('label');
          this.setAttribute('icon', value);
          this.dealIcon();
        }
      }
      /**
       * @description: 处理icon属性的问题
       */
      dealIcon = () => {
        if (!this._icon) {
          this._icon = document.createElement('r-icon');
          const { width, height } = this._inputContent.getBoundingClientRect();
          const size = Math.min(width, height);
          this._icon.setAttribute('size', `${size}`);
          this._inputContent.insertAdjacentElement('beforebegin', this._icon);
        }
        this.icon && this._icon.setAttribute('name', this.icon);
      };
      /**
       * @description: 聚合监听事件
       * @param {string} name
       * @param {string} oldValue
       * @param {string} newValue
       */
      listenEvent(name: string, oldValue: string, newValue: string) {
        this.listenPlaceholder(name, newValue);
        this.listenLabel(name, newValue);
        this.listenStatus(name, newValue);
        this.listenDisabled(name, newValue);
        this.listenIcon(name, newValue, oldValue);
      }
      connectedCallback() {
        // 如果一开始就设置了input的值，则初始化input的值
        if (this.value) {
          this._inputContent.value = this.value;
          this._input.setAttribute('value', this.value);
        }
        if (this.status) {
          this._input.setAttribute('status', this.status);
        }
        if (isDisabled(this)) {
          this._input.setAttribute('disabled', '');
          this._inputContent.setAttribute('disabled', '');
        }
        if (this.type) {
          this._inputContent.setAttribute('type', this.type);
        }
        this._inputContent.addEventListener('input', this.customInput);
        if (document.readyState === 'complete') {
          this.dealIcon();
        }
      }
      disconnectCallback() {
        this._inputContent.removeEventListener('input', this.customInput);
      }
      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
      ) {
        this.listenEvent(name, oldValue, newValue);
      }
    }
    customElements.define('r-input', CustomElement);
    return CustomElement;
  } else {
    return createCustomError('document is undefined or r-input is exist');
  }
}

export default Custom();
