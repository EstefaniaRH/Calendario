import CustomHeader from "./header.js";
import MiniCalendar from "./mini-calendar.js";
import TodoList from "./ToDo/tolist.js";

export default class Calendar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.date = new Date();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const month = this.date.getMonth();
        const year = this.date.getFullYear();

        this.shadowRoot.innerHTML = `
            <style>
                *{
                    color: #70757A;
                }
                .calendar {
                    font-family: Arial, sans-serif;
                    display: inline-block;
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 4px;
                    width:80%;
                    height: 800px;
                }
                .calendar-days {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    height:100%;
                    text-align: center;
                }
                .calendar-day {
                    line-height: 40px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    position: relative;
                }
                .calendar-day-header {
                    font-weight: bold;
                }
                .contenedor-botton{
                     display:flex;
                     flex-direction: row;
                     justify-content: space-between;
                }

            </style>
            <header-cal></header-cal>
            <section class="contenedor-botton">
                <mini-calendar></mini-calendar>
                <div class="calendar">
                    <div class="calendar-days">
                        ${this.getDayHeaders()}
                        ${this.getDaysInMonth(year, month)}
                    </div>
                </div>
            </section>
            
        `;
    }

    getDayHeaders() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map(day => `<div class="calendar-day calendar-day-header">${day}</div>`).join('');
    }

    getDaysInMonth(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysHTML = '';

        // Fill initial empty days
        for (let i = 0; i < firstDay; i++) {
            daysHTML += `<div class="calendar-day"></div>`;
        }

        // Fill actual days
        for (let day = 1; day <= daysInMonth; day++) {
            daysHTML += `
            <style>
                div{
                    display:flex;
                    flex-direction: column;
                }
            </style>
            
            <div class="calendar-day" data-date="${year}-${month + 1}-${day}">${day}
            <todo-list></todo-list></div>`;
        }

        return daysHTML;
    }

}
customElements.define('todo-list', TodoList);
customElements.define('header-cal', CustomHeader);
customElements.define('mini-calendar', MiniCalendar);