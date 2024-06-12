export default class MiniCalendar extends HTMLElement {
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

        const cruz = '<svg width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"></path><path fill="#4285F4" d="M30 16H20l-4 4h14z"></path><path fill="#FBBC05" d="M6 16v4h10l4-4z"></path><path fill="#EA4335" d="M20 16V6h-4v14z"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>';
        const group = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>';
        this.shadowRoot.innerHTML = `
            <style>
                .calendar {
                    font-family: Arial, sans-serif;
                    display: inline-block;
                    border: 1px solid #ccc;
                    padding: 10px;
                    width: 100%
                    border-radius: 4px;
                }
                .calendar-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .calendar-header button {
                    background: none;
                    border: none;
                    font-size: 1.2em;
                    cursor: pointer;
                }
                .calendar-days {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 5px;
                    text-align: center;
                }
                .calendar-day {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                }
                .calendar-day-header {
                    font-weight: bold;
                }
                .calendar-day:not(.calendar-day-header) {
                    cursor: pointer;
                }

                .mini{
                    display: flex;
                    flex-direction: column;
                    margin: 15px;
                    width: 95%;
                    height: 700px;
                    margin-left:20px;
                    
                }

                .asid{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    
                }

                #crear{
                    margin-bottom: 20px;
                    width: 150px;
                    height: 50px;
                    border-style: none;
                    border-radius: 30px;
                    color: #7d8187;
                    display:flex;
                    align-items: center;
                    font-size: 25px;
                    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
                    
                }

                input{
                    margin: 15px;
                    height: 30px;
                }
                
                .fin{
                    margin-top:300px
                }
                #lala{
                    width: 100%;
                    display:flex;
                    flex-position: row;
                }
                #span{
                    justify-content: center;
                    align-items: center;
                }


            </style>

            <section class="mini">
                <div class="asid">
                    <Button id="crear">${cruz}Crear</Button>
                    
                    <div class="calendar">
                        <div class="calendar-header">
                            <span id="lala">${this.getMonthName(month)} ${year}</span>
                            <button id="prev-month">&lt;</button>
                            <button id="next-month">&gt;</button>
                        </div>
                        <div class="calendar-days">
                            ${this.getDayHeaders()}
                            ${this.getDaysInMonth(year, month)}
                        </div>
                    </div>
                    
                    <input type="text" name="" id="" placeholder="Buscar gente">
                    <span>Mis calendarios</span>
                    <span>Otros calendarios</span>
                </div>

                <span class="fin">Terminos - Privacidad</span>
           
            </section>
            
        `;

        this.shadowRoot.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
        this.shadowRoot.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
    }

    getMonthName(monthIndex) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
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
            daysHTML += `<div class="calendar-day">${day}</div>`;
        }

        return daysHTML;
    }

    changeMonth(change) {
        this.date.setMonth(this.date.getMonth() + change);
        this.render();
    }
}