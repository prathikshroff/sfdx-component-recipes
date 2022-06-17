import { LightningElement } from 'lwc';
import search from '@salesforce/apex/ChipsetConfiguratorCmpController.searchProducts';

export default class ChipsetConfiguratorListButton extends LightningElement {

    searchResults;
    selectedRecId;
    selectedRecName;
    
    connectedCallback() {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log('URL: '+urlParams.get('oppId'));
    }

    handleSearch(event) {
        let queryTerm = event.target.value;
        // console.log(queryTerm);
        search({chipName : queryTerm})
        .then(result => {            
            // console.log('JSON '+JSON.stringify(result));
            this.searchResults = result;
            // if(this.searchResults.length > 0) {
            //     this.searchResults.splice(0, this.searchResults.length-1, new RegExp(queryTerm, "gi"), (match) => `<mark>${match}</mark>`);
            // // }
            // for(var i = 0; i < this.searchResults.length; i++){
            //     let re = new RegExp(queryTerm, "gi");
            //     this.searchResults[i].Name = this.searchResults[i].Name.replace(re, `<mark>${re}</mark>`);
            // }
            // console.log('JSON MARK'+JSON.stringify(this.searchResults));
        })
        .catch(error => {
            console.log(error);
        })
    }

    clearSearch() {
        this.searchResults = null;
    }

    setSelectedRecord(event) {
        console.log('click');
        this.selectedRecId = event.currentTarget.dataset.id;
        this.selectedRecName = event.currentTarget.dataset.name;
        console.log('Selected Record: '+this.selectedRecId+' '+this.selectedRecName);
        this.searchResults = false;
    }
}