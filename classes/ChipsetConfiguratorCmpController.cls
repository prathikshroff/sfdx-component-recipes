/**
 * @name              : ChipsetConfiguratorCmpController.cls
 * @author            : pchannab
 * @usage             : 
 * @last modified on  : 06-27-2022
 * @last modified by  : pchannab
 * Modifications Log
 * Ver   Date         Author     Modification
 * 1.0   06-20-2022   pchannab   Initial Version
**/
public with sharing class ChipsetConfiguratorCmpController {
    /**
    * @description 
    * @author pchannab | 06-20-2022 
    * @param String chipName 
    * @return List<Product2> 
    **/
    @AuraEnabled(cacheable=true)
    public static List<SearchResultsWrapper> searchProducts(String chipName){
        try {
            String strChipName = chipName+'%';
            List<SearchResultsWrapper> lstSearchResultsWrap = new List<SearchResultsWrapper>();
            List<Product2> lstProducts = [Select Id, Name, Family, ProductCode, Chip_Family__c, CP_Family_Membership__c, CP_EPR_Family__c, CP_EPR_Subfamily__c From Product2 Where IsActive = true AND Data_Source_Identifier__c = 'TDV.Chip_Family_Membership_V' AND Chip_Family__c LIKE :strChipName LIMIT 20];
            if(lstProducts.size() > 0 && lstProducts != null) {
                for(Product2 product : lstProducts) {
                    SearchResultsWrapper wrapper = new SearchResultsWrapper();
                    wrapper.Id = product.Id;
                    wrapper.Name = product.Name;
                    wrapper.ChipFamily = product.Chip_Family__c;
                    wrapper.Primary = product.CP_Family_Membership__c;
                    wrapper.EPRFamily = product.CP_EPR_Family__c;
                    wrapper.EPRSubfamily = product.CP_EPR_Subfamily__c;
                    wrapper.ChipProduct = product.Family;
                    wrapper.ProductCode = product.ProductCode;
                    wrapper.showTBDButton = product.CP_Family_Membership__c == 'Primary' ? 'slds-show' : 'slds-hide';
                    lstSearchResultsWrap.add(wrapper);
                }
                return lstSearchResultsWrap;
            }
            else {
                return null;
            }
        } catch (Exception e) {
            System.debug('Product Search Error: '+e.getMessage());
            return null;
        }
    }

    public class SearchResultsWrapper {
        @AuraEnabled
        public String Id;
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public String ChipProduct;
        @AuraEnabled
        public String ProductCode;
        @AuraEnabled
        public String ChipFamily;
        @AuraEnabled
        public String EPRFamily;
        @AuraEnabled
        public String EPRSubfamily;
        @AuraEnabled
        public String Primary;
        @AuraEnabled
        public String showTBDButton;
    }
}
