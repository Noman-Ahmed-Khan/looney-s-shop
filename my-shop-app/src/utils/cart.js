export let cartMap;
export function loadCartFromStorage(){
    cartMap=new Map(JSON.parse(localStorage.getItem('cartMap')));
}
loadCartFromStorage();
let cartCount=document.querySelector('.js-cart-quantity');
if(!cartCount) cartCount=document.querySelector('.return-to-home-link');
export let cartQuantity=JSON.parse(localStorage.getItem('cartQuantity')) || 0;
if (cartCount) cartCount.textContent = cartQuantity;
else console.warn('Cart count element not found.');


export function updateCartQuantity(quantity){
    cartQuantity=quantity;
    localStorage.setItem('cartQuantity',String(cartQuantity));
}

export function saveToStorage(cartMap,cartQuantity){
    localStorage.setItem('cartMap',JSON.stringify(Array.from(cartMap)));
    localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
}

export function addItemToCart(itemId){
  const quantityReq=Number((document.querySelector(`.product-quantity-selector-${itemId}`)).value);
        
console.log(cartMap)
  const flag=cartMap.get(itemId);
  if (flag && flag.quantity>0) cartMap.set(itemId,{quantity: Number(flag.quantity)+quantityReq,deliveryOption: flag.deliveryOption});
  else cartMap.set(itemId,{quantity: quantityReq,deliveryOption: 0});

  cartQuantity+=quantityReq;
  if(cartCount) cartCount.textContent=cartQuantity;
  else console.warn('Cart count element not found.');
  
  
  let tmp=document.querySelector(`.item-${itemId}-added-to-cart`);
  if(cartCount) tmp.classList.add(`opacity-reveal`)
  else console.warn('element not found.');

  setTimeout(() => {
    tmp.classList.remove(`opacity-reveal`)
        },700);    
        saveToStorage(cartMap,cartQuantity);
}

export function removeItemFromCart(itemId,itemQuantity){
    cartMap.delete(itemId);
    const container=document.querySelector(`.js-${itemId}-cart-item-container`)
    container.remove();
    cartQuantity-=itemQuantity;
    saveToStorage(cartMap,cartQuantity);
}
  
