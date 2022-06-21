/**
 * @description       : 
 * @author            : pchannab
 * @usage             : 
 * @last modified on  : 06-20-2022
 * @last modified by  : pchannab
**/
import { LightningElement } from 'lwc';
import search from '@salesforce/apex/ChipsetConfiguratorCmpController.searchProducts';

const searchResultsTableColumns = [
    {label: 'Chip Family', fieldName: 'Chip_Family__c', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
    {label: 'Name', fieldName: 'Name', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
    {label: 'Action', type: "button", typeAttributes: {  
        label: 'Add',  
        name: 'Add',  
        title: 'Add',  
        disabled: false,  
        value: 'add',  
        iconPosition: 'left',
        variant: 'brand-outline'
    }}  
];

export default class ChipsetConfiguratorListButton extends LightningElement {

    searchResults;
    searchTerm;
    selectedRecId;
    selectedRecName;
    searchResultsTableColumns = searchResultsTableColumns;
    searchResultsDropdown = false;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    
    connectedCallback() {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log('URL: '+urlParams.get('oppId'));
    }

    handleSearch(event) {
        let queryTerm = event.target.value;
        // console.log(queryTerm);
        if(queryTerm.length <= 0 || queryTerm === undefined){
            this.searchResultsDropdown = false;
        }
        if(queryTerm.length > 0 && (event.keyCode === 13 || queryTerm !== undefined)) {
            this.searchTerm = queryTerm;
            search({chipName : queryTerm})
            .then(result => {            
                // console.log('JSON '+JSON.stringify(result));
                if(result.length > 0 && result !== undefined) {
                    this.searchResults = result;
                    this.searchResultsDropdown = true;
                    if(event.keyCode === 13){
                        this.searchResultsDropdown = false;
                    }
                    // if(this.searchResults.length > 0) {
                    //     this.searchResults.splice(0, this.searchResults.length-1, new RegExp(queryTerm, "gi"), (match) => `<mark>${match}</mark>`);
                    // // }
                    // for(var i = 0; i < this.searchResults.length; i++){
                    //     let re = new RegExp(queryTerm, "gi");
                    //     this.searchResults[i].Name = this.searchResults[i].Name.replace(re, `<mark>${re}</mark>`);
                    // }
                    // console.log('JSON MARK'+JSON.stringify(this.searchResults));
                }
                else{
                    this.searchTerm = queryTerm;
                    this.searchResultsDropdown = false;
                }
            })
            .catch(error => {
                console.log(error);
                this.searchResultsDropdown = false;
            })
        }

    }

    clearSearch() {
        this.searchResults = null;
    }

    setSelectedRecord(event) {
        console.log('click');
        this.selectedRecId = event.currentTarget.dataset.id;
        this.selectedRecName = event.currentTarget.dataset.name;
        console.log('Selected Record: '+this.selectedRecId+' '+this.selectedRecName);
        this.searchResultsDropdown = false;
    }

    callRowAction(event) {
        const recId = event.detail.row.Id;
        console.log('Add clicked: '+recId);
    }

    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.searchResults];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.searchResults = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
}