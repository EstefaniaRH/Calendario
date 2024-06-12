export default class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.text = '';
        this.index = 0;
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('todo-item-clicked', {composed: true, bubbles: true, detail: this.index}))
        });
    }

    static observedAttributes = ['index', 'text'];

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "index") {
            this.index = newValue;
        }

        if(name === "text") {
            this.text = newValue;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                input{
                    color:#008CBA;
                }
            </style>
            <input id="todo${this.index}" type="checkbox"> ${this.text}
        `;
    }
}