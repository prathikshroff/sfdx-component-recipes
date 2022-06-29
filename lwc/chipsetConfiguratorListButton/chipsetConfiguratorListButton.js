/**
 * @description       : 
 * @author            : pchannab
 * @usage             : 
 * @last modified on  : 06-28-2022
 * @last modified by  : pchannab
**/
import { LightningElement, track } from 'lwc';
import search from '@salesforce/apex/ChipsetConfiguratorCmpController.searchProducts';

const searchResultsTableColumns = [
    {label: 'Chip Family', fieldName: 'ChipFamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'CP EPR Family', fieldName: 'EPRFamily', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
    {label: 'CP EPR Sub-Family', fieldName: 'EPRSubfamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Name', fieldName: 'Name', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Chip Product', fieldName: 'ChipProduct', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Product Code', fieldName: 'ProductCode', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Primary/Attached', fieldName: 'Primary', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {type: "button", typeAttributes: {  
        label: 'Add',  
        name: 'Add',  
        title: 'Add',  
        disabled: false,  
        value: 'add',  
        iconPosition: 'left',
        variant: 'brand-outline',
    }}, 
    {type: "button", typeAttributes: {  
        label: 'Add TBD',  
        name: 'Add TBD',  
        title: 'Add TBD',  
        disabled: false,  
        value: 'addTbd',  
        iconPosition: 'left',
        variant: 'brand-outline',
        // class: {fieldName: 'showTBDButton'}
    }}
];

const selectedProductsTableColumn = [
    {label: 'Choose Primary', type: 'radio', typeAttributes: {value: {fieldName: 'Id'}}, sortable: false},
    {label: 'Chip Family', fieldName: 'ChipFamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'CP EPR Family', fieldName: 'EPRFamily', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
    {label: 'CP EPR Sub-Family', fieldName: 'EPRSubfamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Primary/Attached', fieldName: 'Primary', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Chip Product', fieldName: 'ChipProduct', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    {label: 'Product Code', fieldName: 'ProductCode', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},    
    {label: 'Name', fieldName: 'Name', editable: false, sortable: false, hideDefaultActions: true, wrapText: true}
];

// const customDatatableCols = [
//     {label: 'Chip Family', fieldName: 'ChipFamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
//     {label: 'Choose Primary', type: 'radio', typeAttributes: {value: {fieldName: 'Id'}}, sortable: false},
//     {label: 'CP EPR Family', fieldName: 'EPRFamily', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
//     {label: 'CP EPR Sub-Family', fieldName: 'EPRSubfamily', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
//     {label: 'Primary/Attached', fieldName: 'Primary', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
//     {label: 'Chip Product', fieldName: 'ChipProduct', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
//     {label: 'Product Code', fieldName: 'ProductCode', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},    
//     {label: 'Name', fieldName: 'Name', editable: false, sortable: false, hideDefaultActions: true, wrapText: true}
// ];

export default class ChipsetConfiguratorListButton extends LightningElement {

    searchResults;
    collection;
    searchTerm;
    selectedRecId;
    selectedRecName;
    recordsAdded = [];    
    tbdRecordsAdded = [];
    searchResultsTableColumns = searchResultsTableColumns;
    selectedProductsTableColumn = selectedProductsTableColumn;
    // customDatatableCols = customDatatableCols;
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

    // constructor() {
    //     super();
    //     this.searchResultsTableColumns = [
    //             {label: 'Chip Family', fieldName: 'Chip_Family__c', editable: false, sortable: true, hideDefaultActions: true, wrapText: true},
    //             {label: 'Name', fieldName: 'Name', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    //             {label: 'Primary', fieldName: 'CP_Family_Membership__c', editable: false, sortable: false, hideDefaultActions: true, wrapText: true},
    //             {label: 'Is TBD', editable: true, fieldName: 'Is_TBD', type: 'boolean'},
    //             {label: 'Action', type: "button", typeAttributes: {  
    //                 rowActions: this.getRowActions
    //             }}  
    //         ];
    // }

    // getRowActions(row, doneCallback) {
    //     const actions = [];
    //         if (row['CP_Family_Membership__c'] === 'Primary') {
    //             actions.push({
    //                 'label': 'Add',
    //                 'title': 'Add',
    //                 'name': 'Add',
    //                 'disabled': false,
    //                 'value': 'add',  
    //                 'iconPosition': 'left',
    //                 'variant': 'brand-outline'
    //             }, 
    //             {'label': 'Add TBD',
    //             'title': 'Add TBD',
    //             'name': 'Add TBD',
    //             'disabled': false,
    //             'value': 'addTbd',  
    //             'iconPosition': 'left',
    //             'variant': 'brand-outline'});
    //         } else {
    //             actions.push({
    //                 'label': 'Add',
    //                 'title': 'Add',
    //                 'name': 'Add',
    //                 'disabled': false,
    //                 'value': 'add',  
    //                 'iconPosition': 'left',
    //                 'variant': 'brand-outline'
    //             }, 
    //             {'label': 'Add TBD',
    //             'title': 'Add TBD',
    //             'name': 'Add TBD',
    //             'disabled': true,
    //             'value': 'addTbd',  
    //             'iconPosition': 'left',
    //             'variant': 'brand-outline'}
    //             );
    //         }
    //         // simulate a trip to the server
    //         setTimeout(() => {
    //             doneCallback(actions);
    //         }), 200);
    // }

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
                console.log('JSON '+JSON.stringify(result));
                if(result.length > 0 && result !== undefined) {
                    this.searchResults = result;
                    this.collection = this.searchResults;
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
        this.searchResultsDropdown = false;
    }

    setSelectedRecord(event) {
        console.log('click');
        this.selectedRecId = event.currentTarget.dataset.id;
        this.selectedRecName = event.currentTarget.dataset.name;
        console.log('Selected Record: '+this.selectedRecId+' '+JSON.stringify(this.collection));
        
        let searchBoxSelectedData = JSON.parse(JSON.stringify(this.collection));
        // console.log('Filter: '+searchBoxSelectedData.filter((record) => record.Id === this.selectedRecId));
        searchBoxSelectedData = searchBoxSelectedData.filter((record) => record.Id === this.selectedRecId);
        // console.log('Seearch Box Selected: '+searchBoxSelectedData);
        if(searchBoxSelectedData.length > 0) {
            this.collection = searchBoxSelectedData;
        }
        // console.log('Collection: '+this.collection);
        this.searchResultsDropdown = false;
    }

    callRowAction(event) {            
        const recId = event.detail.row.Id;
        console.log('Add clicked: '+recId);
        // this.collection.splice(this.collection.findIndex(obj => obj.Id === recId), 1);
        // console.log(this.searchResults.findIndex(obj => {
        //         return obj.Id === this.tbdRecordsAdded[0].Id;}));
        
        if((this.tbdRecordsAdded.length === 1 && recId === this.tbdRecordsAdded[0].Id) || (this.tbdRecordsAdded.length === 0 && recId)) {
            this.tbdRecordsAdded = [];
            this.removeRowsFromSearchResultsTable(recId);
        }        
        
        // this.recordsAdded
    }

    removeRowsFromSearchResultsTable(record) {
        console.log('Record being added: '+record);
        // this.addRecordsToSelectedProductsTable(record);
        let newData = JSON.parse(JSON.stringify(this.collection));
        newData = newData.filter((row) => row.Id !== record);
        let addedData = JSON.parse(JSON.stringify(this.collection));        
        addedData = addedData.filter((row) => row.Id === record);
        if(addedData.length > 0) {
            this.addRecordsToSelectedProductsTable(addedData[0]);
            
            console.log('Here: '+JSON.stringify(this.recordsAdded));
        }
        this.collection = newData;
        console.log('Removed Item: '+JSON.stringify(this.collection));
    }

    addRecordsToSelectedProductsTable(addedRecord) {   
        this.recordsAdded = this.recordsAdded.concat(addedRecord);
        console.log('Added Record: '+JSON.stringify(this.recordsAdded));
    }

    getSelectedTBDProductRow(event) {
        console.log('Checkbox: '+JSON.stringify(event.detail.draftValues));
        this.tbdRecordsAdded.push(event.detail.draftValues[0]);
        console.log('tbdRecordsAdded: '+JSON.stringify(this.tbdRecordsAdded));
    }

    radioButtonClick(event) {
        // console.log('Radio Clicked: Before preventDefault');
        // event.preventDefault();
        // console.log('Radio Clicked');
        let dataReceived = event.detail.value;
        console.log("🚀 ~ file: chipsetConfiguratorListButton.js ~ line 248 ~ ChipsetConfiguratorListButton ~ radioButtonClick ~ dataReceived: "+ dataReceived);
        
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
        const cloneData = [...this.collection];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.collection = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
}