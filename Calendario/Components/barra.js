export class Barra extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }


    connectedCallback(){

    }

    render(){
        
        this.shadowRoot.innerHTML = `   

        `;
    }
}