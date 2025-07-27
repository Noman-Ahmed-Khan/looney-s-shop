import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

    export const deliveryOptions=[{
            day: dayjs().add(7,'day').format('dddd MMM, DD'),
            priceCents: 0,
        },{
            day: dayjs().add(3,'day').format('dddd MMM, DD'),
            priceCents: 499,
        },{
            day: dayjs().add(1,'day').format('dddd MMM, DD'),
            priceCents: 999,
        }];

    export let selectedDates=new Map(JSON.parse(localStorage.getItem('selectedDates')));
    
    export function saveSelectedDates(){
        localStorage.setItem('selectedDates',JSON.stringify(Array.from(selectedDates)));
    }
    
    export function setDeliveryDate(dateOption,itemId){
        selectedDates.set(itemId, deliveryOptions[dateOption]); 
        saveSelectedDates();
    };
    export function removeDeliveryDate(itemId){
        selectedDates.delete(itemId); 
        saveSelectedDates();
    };