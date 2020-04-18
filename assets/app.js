let currencies =[];
let currencyId = 0;

// Initialization after the HTML document has been loaded...
window.addEventListener('DOMContentLoaded', () => {

    // Function calls for initial page loading activities...
    doLoadCurrencies();
    
});

/* 
    --------------------------------------------
    ACTION FUNCTIONS
    --------------------------------------------
*/

async function doLoadCurrencies() {
    currencies = await fetchCurrencies();
    console.log(currencies);

    let currenciesDiv1 = document.querySelector('#currenciesList');
    let currenciesDiv2 = document.querySelector('#ratesList');
    let currenciesDiv3 = document.querySelector('#amend');
    let currenciesDiv4 = document.querySelector('#converter');

    let htmlContent1 = '';
    let htmlContent2 = '';
    let htmlContent3 = '';
    let htmlContent4 = '';

    for (let currency of currencies) {
        htmlContent1 = htmlContent1 + /*html*/`
            <div class="currency-details">
                <td class="detail-value">${currency.currency}</td>
            </div>`;

        htmlContent2 = htmlContent2 + /*html*/`
            <div class="currency-details">
                <td class="detail-value">${currency.eurRate}</td>
            </div>`;
    
        htmlContent3 = htmlContent3 + /*html*/`
         <div class= "currency-details">
         <td class="detail-value"><button onclick=editDeletePopup(${currency.id})>Amend</button></td>
         </div>`;

         htmlContent4 = htmlContent4 + /*html*/`
         <div class= "currency-details">
         <td class="detail-value"><button onclick=convertCurrenciesPopup(${currency.id})>Convert</button></td>
         </div>`;

    currenciesDiv1.innerHTML = htmlContent1;
    currenciesDiv2.innerHTML = htmlContent2; 
    currenciesDiv3.innerHTML = htmlContent3; 
    currenciesDiv4.innerHTML = htmlContent4; 
}
}

/* 
    --------------------------------------------
    DISPLAY FUNCTIONS
    --------------------------------------------
*/

async function convertCurrenciesPopup(myCurrencyId) {
    await openPopup(POPUP_CONF_300_300, 'convertCurrencyTemplate');
   
        let currency = currencies.find(c => c.id === myCurrencyId);
        currencyId = currency.id;

        let myCurrencyNameInputElement = document.querySelector('#thisCurrency');
        myCurrencyNameInputElement.value = currency.currency;

        let currenciesDiv = document.querySelector('#convert');
        let htmlContent = '';
        htmlContent = htmlContent + /*html*/`
         <div class= "currency-details">
         <td class="detail-value"><button onclick=convert(${currency.id})>Convert</button></td>
         </div>`;
         currenciesDiv.innerHTML = htmlContent;
      }
    
async function convert(myCurrencyId){
    
    let currency = currencies.find(c => c.id === myCurrencyId);
        currencyId = currency.id;
    
    let amount = document.querySelector('#amount').value;
    let rate = currency.eurRate;

    let result = amount*rate;
    let myCurrencyResultElement = document.querySelector('#result');

    myCurrencyResultElement.value = result;
    
 }

async function editDeletePopup(myCurrencyId){
    await openPopup(POPUP_CONF_300_400, 'editDeleteTemplate');

        let currency = currencies.find(c => c.id === myCurrencyId);
        currencyId = currency.id;
      
        let myCurrencyNameInputElement = document.querySelector('#editName');
        let myRateInputElement = document.querySelector('#editRate');

        myCurrencyNameInputElement.value = currency.currency;
        myRateInputElement.value = currency.eurRate;

    }
        
async function doEditCurrency(currencyId) {
    let errors = validateCurrencyEditForm();
    if (errors.length === 0) {
            let myCurrencyNameInputElement = document.querySelector('#editName');
            let myRateInputElement = document.querySelector('#editRate');

            let currencyName = myCurrencyNameInputElement.value;
            let currencyRate = myRateInputElement.value 
            let myCurrency = {
                id: currencyId,
                currency: currencyName,
                eurRate: currencyRate
            };
       
          await postCurrency(myCurrency); 
          doLoadCurrencies();  
          closePopup();
}
displayCurrencyErrors(errors);
}

function validateCurrencyEditForm() {
    let myCurrencyNameInputElement = document.querySelector('#editName');
    let myRateInputElement = document.querySelector('#editRate');

    let errors = [];

    if (myCurrencyNameInputElement.value.length < 3 || myCurrencyNameInputElement.value.length > 3) {
        errors.push('Currency name must contain 3 letters');
    }

    if (myRateInputElement.value.length < 1) {
        errors.push('Please add currency rate');
    } else if (myRateInputElement = isNaN(myRateInputElement.value)) {
        errors.push('Rate must be a number');
    }
    return errors;

}


async function doDeleteCurrency(currencyId) {
    if(confirm('Do you really want to delete this currency?')) {
        await deleteCurrency(currencyId);
        doLoadCurrencies();
        closePopup();
    }
}

async function currencyAddingPopup() {
    await openPopup(POPUP_CONF_300_400, 'currencyAddTemplate');
}

async function addNewCurrency() {
    let errors = validateCurrencyForm();
    if (errors.length === 0) {
       let myCurrencyNameInputElement = document.querySelector('#addName');
       let myRateInputElement = document.querySelector('#addRate');
    
        let newCurrency = {
          currency: myCurrencyNameInputElement.value,
          eurRate: myRateInputElement.value 
    };

       await postNewCurrency(newCurrency);
       await doLoadCurrencies();
       closePopup();
    } 
    displayCurrencyErrors(errors);
    
}

function validateCurrencyForm() {
    let myCurrencyNameInputElement = document.querySelector('#addName');
    let myRateInputElement = document.querySelector('#addRate');
    

    let errors = [];

    if (myCurrencyNameInputElement.value.length < 3 || myCurrencyNameInputElement.value.length > 3) {
        errors.push('Currency name must contain 3 letters');
    }

    if (myRateInputElement.value.length < 1) {
        errors.push('Please add currency rate');
    } else if (myRateInputElement = isNaN(myRateInputElement.value)) {
        errors.push('Rate must be a number');
    }
    return errors;

}

function displayCurrencyErrors(errors) {
    let errorDivElement = document.querySelector('#errorBox');
    if (errors.length > 0) {
        let errorsHtml = '';
        for (let error of errors) {
            errorsHtml = errorsHtml + /*html*/`<div>${error}</div>`;
        }
        errorDivElement.innerHTML = errorsHtml;
        errorDivElement.style.display = 'block';
    } else {
        errorDivElement.style.display = 'none';
    }
}







