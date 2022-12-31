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

describe('Objednávka pro MŠ_ZŠ', () => {

    it('Should open order page', () => {

        browser.reloadSession();
        browser.url('');
        browser.pause(2000);
        let forTeacherElement = $$('.nav-item.dropdown')[1];
         forTeacherElement.click();
         const orderForSchools = forTeacherElement.$$(".dropdown-item")[1];
         expect(orderForSchools).isExisting;
         expect(orderForSchools).isDisplayed;
         expect(orderForSchools).isClickable;
         orderForSchools.click();
         browser.pause(3000);
         const inputIco = $('#ico');
         expect(inputIco).isExisting;
         expect(inputIco).isDisplayed;
         const titleOfPage = $('.card').$('.card-body').$('h3').getText();  
         console.log('TITULNI STRANKA JE: ' + titleOfPage);
         expect('Objednávka akce').toEqual(titleOfPage);
    
     });
 
     it('Filling name and address from Ares', () =>{
        browser.reloadSession();
         browser.url('/objednavka/pridat');
         
         const inputIco = $('#ico');
         inputIco.setValue(ICO);
         browser.keys('Enter');
         browser.pause(4000);
 
         //asertace Aresu
         const value = browser.execute((id) =>{
             return document.getElementById(id).value;
          }, 'client');
          const valueOfAdress = browser.execute((id) =>{
             return document.getElementById(id).value;
          }, 'address');
          console.log('HODNOTA JE: ' + value);
          console.log('ADRESA JE: ' + valueOfAdress);
          //browser.pause(3000);

          expect(clientName).toEqual(value);
          expect(address).toEqual(valueOfAdress); 
     })

     it('Fill the order Primestsky tabor', () => {
 
         browser.reloadSession();
         browser.url('/objednavka/pridat');
         
         const inputIco = $('#ico');
         inputIco.setValue(ICO);
         browser.keys('Enter');
         browser.pause(4000);
         const inputZastoupenaOsobou = $('#substitute');
         inputZastoupenaOsobou.setValue(substituteName);
         const inputContantName = $('#contact_name');
         inputContantName.setValue(contactName);
         const inputContactTel = $('#contact_tel');
         inputContactTel.setValue(contactPhone);
         const inputContactMail = $('#contact_mail');
         inputContactMail.setValue(contactEmail);
 
        // VYPLNIT POZADOVANY TERMIN
        $('#start_date_1').setValue(startDate);
        $('#end_date_1').setValue(endDate);
        browser.pause(5000);
 
        
        const bottonPrimestskyTabor = $('#nav-home-tab');
        bottonPrimestskyTabor.click();
        $('#camp-date_part').selectByVisibleText('Odpolední');
 
        const inputPocetDeti = $('#camp-students');
        inputPocetDeti.setValue('17');
        const inputVeVeku = $('#camp-age');
        const inputAdults = $('#camp-adults');
        inputVeVeku.setValue('6 - 9');
        inputAdults.setValue('2');
        browser.pause(3000);
     
      //klikni na objednani
       $('.btn.btn-primary').click();
        browser.pause(5000);
        
        const titleOfPage = $('.card').$('.card-body').$('h3').getText();
        expect(titleOfPage).isExisting;
        expect(inputIco).isNotExisting;
        expect($('.card').$('.card-body').$('p')).isExisting;
        console.log(titleOfPage);

        //asertace, ze jde objednavka odeslat
        expect('Děkujeme za objednávku').toEqual(titleOfPage); 
     });

     it('Do not sent order withou fillig inputs', () => {
 
        browser.reloadSession();
        browser.url('/objednavka/pridat');
        
        const inputIco = $('#ico');
        inputIco.setValue(ICO);
        browser.keys('Enter');
        browser.pause(4000);
        const inputZastoupenaOsobou = $('#substitute');
        inputZastoupenaOsobou.setValue(substituteName);
        const inputContantName = $('#contact_name');
        inputContantName.setValue(contactName);
        const inputContactTel = $('#contact_tel');
        inputContactTel.setValue(contactPhone);
        const inputContactMail = $('#contact_mail');
        inputContactMail.setValue(contactEmail);

       // VYPLNIT POZADOVANY TERMIN
       $('#start_date_1').setValue(startDate);
       $('#end_date_1').setValue(endDate);
       browser.pause(5000);

       
       const bottonPrimestskyTabor = $('#nav-home-tab');
       bottonPrimestskyTabor.click();
       $('#camp-date_part').selectByVisibleText('Odpolední');

       const inputPocetDeti = $('#camp-students');
       inputPocetDeti.setValue('17');
       browser.pause(3000);
    
     //klikni na objednani
      $('.btn.btn-primary').click();
       browser.pause(5000);
     
    //asertace, ze se neda objednavka odeslat
       const titleOfPage = $('.card').$('.card-body').$('h3').getText();
       console.log('TITUL STRANKY: ' + titleOfPage);
       expect('Objednávka akce').toEqual(titleOfPage);   
       expect(inputIco).isExisting;
     });  

});