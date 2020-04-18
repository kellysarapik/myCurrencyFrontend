
async function fetchCurrencies() {
    let result = await fetch(`${API_URL}/currency/all`);
    let currencies = await result.json();
    return currencies;
}

async function postCurrency(myCurrency) {
    await fetch(`${API_URL}/currency/edit`,
    {method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(myCurrency)
    });
}

async function deleteCurrency(currencyId) {
    await fetch(`${API_URL}/currency/${currencyId}`, {
        method: 'DELETE'
    });
}

async function postNewCurrency(newCurrency) {
    await fetch(`${API_URL}/currency/new`,
    {method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(newCurrency)
    });
}

