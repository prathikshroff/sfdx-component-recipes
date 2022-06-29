/**
 * @name              : 
 * @author            : pchannab
 * @usage             : 
 * @last modified on  : 06-28-2022
 * @last modified by  : pchannab
 * Modifications Log
 * Ver   Date         Author     Modification
 * 1.0   06-28-2022   pchannab   Initial Version
**/
import { api, LightningElement } from 'lwc';

export default class DatatableRadioButton extends LightningElement {
    // @api name;
    @api value;

    handleRadioButtonChange(event) {
        event.preventDefault();
        this.value = event.target.value;
        console.log("~ file: datatableRadioButton.js ~ line 19 ~ DatatableRadioButton ~ handleRadioButtonChange ~ value"+this.value);
        // this.dispatchEvent(new CustomEvent('radio'), {
        //     composed: true,
        //     bubbles: true,
        //     // cancelable: true,
        //     detail: {
        //         data: {value: this.value}
        //     }
        // });
        const evnt = new CustomEvent('radio', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {                
                value: this.value
            },
        });
        this.dispatchEvent(evnt);
    }
}