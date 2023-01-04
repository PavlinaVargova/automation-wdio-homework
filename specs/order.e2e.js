import {
    ICO,
    clientName,
    address,
    substituteName,
    contactName,
    contactPhone,
    contactEmail,
    startDate,
    endDate
} from './fixtures.js'

import {
   openOrderPage,
   getInputIco,
   setIcoAndWait,
   setSubstituteName,
   setContactName,
   setContactPhone,
   setContactMail,
   setFirstDate,
   getPrimestskyTabor,
   chooceOdpoledni,
   getPocetDeti,
   getVeVeku,
   getAdults,
   getBottonOrder,
   getTitleOfPage,
} from '../pages/functions.js'


const SHORT_WAIT = 3000;
const LONG_WAIT = 5000;

describe('Objednávka pro MŠ_ZŠ', () => {


   beforeEach( () => {
      browser.reloadSession();
      openOrderPage();
   })
   


    it('Should open order page', () => {

         let forTeacherElement = $$('.nav-item.dropdown')[1];
         const orderForSchools = forTeacherElement.$$(".dropdown-item")[1];
         expect(orderForSchools).isExisting;
         expect(orderForSchools).isDisplayed;
         expect(orderForSchools).isClickable;  
         expect(getTitleOfPage()).toEqual('Objednávka akce');
    
     });
 
     it('Filling name and address from Ares', () =>{
         
         setIcoAndWait(ICO);

         browser.pause(SHORT_WAIT);
      
         //asertace Aresu
         const value = browser.execute((id) =>{
             return document.getElementById(id).value;
          }, 'client');
          const valueOfAdress = browser.execute((id) =>{
             return document.getElementById(id).value;
          }, 'address');
          
          expect(clientName).toEqual(value);
          expect(address).toEqual(valueOfAdress); 
     })

     it('Fill the order Primestsky tabor', () => {
 
         setIcoAndWait(ICO);
         
         setSubstituteName(substituteName);
         setContactName(contactName);
         setContactPhone(contactPhone);
         setContactMail(contactEmail);
         setFirstDate(startDate, endDate);
         
         browser.pause(SHORT_WAIT);
         
         getPrimestskyTabor().click();
         chooceOdpoledni();
         getPocetDeti().setValue('17');
         getVeVeku().setValue('6 - 9');
         getAdults().setValue('2');  
         getBottonOrder().click();
         
         browser.pause(LONG_WAIT);

        //asertace
         expect(getInputIco()).isNotExisting;
         expect($('.card').$('.card-body').$('p')).isExisting;
         expect(getTitleOfPage()).toEqual('Děkujeme za objednávku');
     });


     it('Do not sent order withou fillig inputs', () => {

         setIcoAndWait(ICO);
         setSubstituteName(substituteName);
         setContactName(contactName);
         setContactPhone(contactPhone);
         setContactMail(contactEmail);
         setFirstDate(startDate, endDate);
         browser.pause(SHORT_WAIT);
         getPrimestskyTabor().click();
         chooceOdpoledni();
         getPocetDeti().setValue('17');
         getBottonOrder().click();
         browser.pause(LONG_WAIT);
     
         //asertace, ze se neda objednavka odeslat 
         expect(getTitleOfPage()).toEqual('Objednávka akce');
         expect(getInputIco()).isExisting;
     });  
});