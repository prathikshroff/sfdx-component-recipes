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
import LightningDatatable from 'lightning/datatable';
import DataTableRadioButtonTemplate from './radio-button-template.html';

export default class ChipsetConfigCustomDatatable extends LightningDatatable {
    static customTypes = {
        radio: {
            template: DataTableRadioButtonTemplate,
            typeAttributes: ['value']
        }
    };
}