
export let totalCostCents=Number(localStorage.getItem('totalCostCents')) || 0;
export function updateTotalCostCents(cents){
    totalCostCents+=cents;
    localStorage.setItem('totalCostCents', String(totalCostCents));
}

export let totalShippingCostCents=Number(localStorage.getItem('totalShippingCostCents')) || 0;;
export function updateTotalShippingCostCents(cents){
    totalShippingCostCents+=cents;
    localStorage.setItem('totalShippingCostCents', String(totalShippingCostCents));
}

export function initializePayment(){
    localStorage.setItem('totalCostCents', JSON.stringify(0));
    localStorage.setItem('totalShippingCostCents', JSON.stringify(0));
    
    console.log("-----------------------------")
    console.log(totalCostCents=Number(localStorage.getItem('totalCostCents')))
    console.log(totalShippingCostCents=Number(localStorage.getItem('totalShippingCostCents')))
    console.log("-----------------------------")
}

