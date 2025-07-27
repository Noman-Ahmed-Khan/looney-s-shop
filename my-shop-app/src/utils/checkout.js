import { products,loadProducts } from '../data/products.js';
import { cartMap,cartQuantity,updateCartQuantity,saveToStorage,removeItemFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions,setDeliveryDate,selectedDates,removeDeliveryDate } from '../data/deliveryOptions.js';
import { updateTotalCostCents,updateTotalShippingCostCents,initializePayment,totalCostCents,totalShippingCostCents } from '../data/paymentSummary.js';


  
function updateCheckout(){  
  homeLinkByItem.innerHTML=(cartQuantity==1)?  `${cartQuantity} item `:`${cartQuantity} items`;
  document.querySelector('.payment-summary-quantity').textContent=`Items (${cartQuantity}):`;
  document.querySelector('.payment-summary-product-cost-money').textContent=`$${formatCurrency(totalCostCents)}`;
  document.querySelector('.payment-summary-shipping-cost-money').textContent=`$${formatCurrency(totalShippingCostCents)}`;
  document.querySelector('.payment-summary-without-tax-money').textContent=`$${formatCurrency(totalCostCents+totalShippingCostCents)}`;
  document.querySelector('.payment-summary-tax-money').textContent=`$${formatCurrency((totalCostCents+totalShippingCostCents)*0.1)}`;
  document.querySelector('.payment-summary-with-tax-money').textContent=`$${formatCurrency((totalCostCents+totalShippingCostCents)*1.1)}`;
}

const homeLinkByItem = document.querySelector('.return-to-home-link');
homeLinkByItem.addEventListener('click', () => {
  initializePayment();
});

document.querySelector('.js-checkout-amazon-mobile-logo').addEventListener('click', () => {
  initializePayment();
});

document.querySelector('.js-amazon-logo').addEventListener('click', () => {
  initializePayment();
});



document.addEventListener('DOMContentLoaded', () => {
  initializePayment();
  updateCheckout();
});

window.onload=()=>{
  initializePayment();
  updateCheckout();
}


loadProducts(()=>{
  
  let cartItemHTML=``
  cartMap.forEach((valueObject,itemId)=>{
      const product=products.get(itemId)
    
      updateTotalCostCents(product.priceCents*valueObject.quantity);
      updateTotalShippingCostCents(deliveryOptions[Number(valueObject.deliveryOption)].priceCents);
      cartItemHTML+=`
          <div class="cart-item-container js-${itemId}-cart-item-container">
              <div class="delivery-date js-${itemId}-delivery-date">
                Delivery date: ${deliveryOptions[Number(valueObject.deliveryOption)].day}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image" src="${product.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                      ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-${itemId}-quantity-label">${valueObject.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${itemId}" data-product-price-cents="${product.priceCents}" data-product-delivery-opt="${valueObject.deliveryOption}">
                      Update
                    </span>
                    <input class="quantity-input js-${itemId}-quantity-input" placeholder="Enter Quantity" min="1">
                    <span class="save-quantity-link link-primary js-${itemId}-save-quantity-link">Save</span>
                    
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${itemId}" data-product-quantity="${valueObject.quantity}" data-product-price-cents="${product.priceCents}" data-product-delivery-opt="${valueObject.deliveryOption}">
                      Delete
                    </span>
                  </div>
                  <div class="delivery-options" data-product-id=${itemId}>
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" ${(valueObject.deliveryOption===0)? 'checked':''} class="delivery-option-input" data-date-option="0" data-product-quantity="${valueObject.quantity}" name="delivery-option-${itemId}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryOptions[0].day}
                        </div>
                        <div class="delivery-option-price">
                          ${deliveryOptions[0].priceCents === 0 ? 'Free' : '$' + formatCurrency(deliveryOptions[0].priceCents)} - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" ${(valueObject.deliveryOption===1)? 'checked':''} class="delivery-option-input" data-date-option="1" data-product-quantity="${valueObject.quantity}" name="delivery-option-${itemId}">
                      <div>
                        <div class="delivery-option-date">
                            ${deliveryOptions[1].day}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryOptions[1].priceCents === 0 ? 'Free' : '$' + formatCurrency(deliveryOptions[1].priceCents)} - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" ${(valueObject.deliveryOption===2)? 'checked':''} class="delivery-option-input" data-date-option="2" data-product-quantity="${valueObject.quantity}" name="delivery-option-${itemId}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryOptions[2].day}
                        </div>
                        <div class="delivery-option-price">
                          ${deliveryOptions[2].priceCents === 0 ? 'Free' : '$' + formatCurrency(deliveryOptions[2].priceCents)} - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
  });
  
  
  updateCheckout();
  
  document.querySelector('.js-order-summary').innerHTML=cartItemHTML;
  
  // action for delete button on cart item
  document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      // get data from html element
      const itemId=link.dataset.productId;
      const priceCents=link.dataset.productPriceCents;
      
      const product=cartMap.get(itemId)
      const quantity=Number(product.quantity);
      const opt=product.deliveryOption;
  
  
      // update data
      removeItemFromCart(itemId,quantity);
      removeDeliveryDate(itemId);
  
      updateTotalCostCents(-(quantity*priceCents));
      updateTotalShippingCostCents(-(deliveryOptions[opt].priceCents));
      console.log(totalShippingCostCents)
      // update page element
      updateCheckout();
    });
  });
  
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      // Get data from the HTML element
      const itemId = link.dataset.productId;
      const priceCents = Number(link.dataset.productPriceCents)
  
      // Show input box and save button, hide update button
      const container = document.querySelector(`.js-${itemId}-cart-item-container`);
      container.classList.add('is-editing-quantity');
  
      // Add action for the save button
      const saveBtn = document.querySelector(`.js-${itemId}-save-quantity-link`);
      if (!saveBtn.dataset.listenerAdded) {
        saveBtn.addEventListener('click', () => {
          handleSave(itemId, priceCents, container);
        });
        saveBtn.dataset.listenerAdded = true; // Mark listener as added
      }
    });
  });
  
  function handleSave(itemId, priceCents, container) {
    // Get updated quantity from the input box, minimum quantity is 1
    const updatedQuantity = Number(document.querySelector(`.js-${itemId}-quantity-input`).value);
  
    const product = cartMap.get(itemId);
    const previousQuantity = Number(product.quantity);
    const opt = product.deliveryOption;
  
    // Update data
    console.log("-------------------------------------")
    console.log(`Prev Cart Quantity: ${cartQuantity}`)
    console.log(`Prev item Quantity: ${previousQuantity}`)
    console.log(`New item Quantity: ${updatedQuantity}`)
    console.log(`New Cart Quantity: ${cartQuantity - previousQuantity + updatedQuantity}`)
    updateCartQuantity(Number(cartQuantity) - Number(previousQuantity) + updatedQuantity);
    
    updateTotalCostCents(priceCents * (updatedQuantity - previousQuantity));
  
    cartMap.set(itemId, { quantity: updatedQuantity, deliveryOption: opt });
    saveToStorage(cartMap,cartQuantity);
  
    // Update the page element
    document.querySelector(`.js-${itemId}-quantity-label`).textContent = updatedQuantity;
    updateCheckout();
  
    // Show update button, hide input box and save button
    container.classList.remove('is-editing-quantity');
  }
  
  
  document.querySelectorAll('.delivery-option-input').forEach((option)=>{
    option.addEventListener('click',()=>{
      
      // get data from html element
      const itemId=(option.name).slice(16);
      
      const opt=Number(option.dataset.dateOption);
      const quantity=option.dataset.productQuantity;
      const prePriceCents = selectedDates.get(itemId)?.priceCents || 0;
  
      // Update data
      updateTotalShippingCostCents(deliveryOptions[opt].priceCents - prePriceCents);
      setDeliveryDate(opt,itemId);
      cartMap.set(itemId,{quantity:quantity,deliveryOption: opt})
  
      // update page element
      document.querySelector(`.js-${itemId}-delivery-date`).textContent=`Delivery date: ${deliveryOptions[opt].day}`
      saveToStorage(cartMap,cartQuantity);
      updateCheckout();
  
    });
  });
});
