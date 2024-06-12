import TodoItem from "./toItem.js";

export default class TodoList extends HTMLElement {
    constructor() {
        super();
        this.todos = [];
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();   
    }

    add(todo) {
        this.todos.push(todo);
        this.render();
    }

    remove(index) {
        this.todos.splice(index, 1);
        this.render();
    }

    render() {
        const inputSection = `<input type="text"> <button>Agregar</button>`;
        const elementsToRender = this.todos.map((todo, index) => {
            return `<todo-item index="${index}" text="${todo}"></todo-item>`
        }).join('');
        this.shadowRoot.innerHTML = `
        <style>
            input{
                background-color: white;
                color: #008CBA;
                border-color:#008CBA;
                width: 50%;

            }

            button{
                background-color: white;
                color: #008CBA;
                border-radius: 10px;
                border-color:#008CBA;
                padding: 5px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
            }

            button:hover{
                background-color:#008CBA;
                color: white;
                border: 2px solid #008CBA;
            }
        </style>
        ${inputSection}<br>${elementsToRender}`;
        this.addListenerOnButton();
        this.addListenerOnItems();
    }

    addListenerOnButton() {
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            const {value} = this.shadowRoot.querySelector('input[type="text"]');
            this.add(value);
        });
    }

    addListenerOnItems() {
        const arregloTodoItems = this.shadowRoot.querySelectorAll('todo-item');     
        arregloTodoItems.forEach(todoItem => {
            todoItem.addEventListener('todo-item-clicked', () => {
                this.remove(todoItem.index);
            });
        });
    }


}

customElements.define('todo-item', TodoItem);