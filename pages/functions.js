
export function openOrderPage () {
    browser.url('');
    browser.pause(2000);
    let forTeacherElement = $$('.nav-item.dropdown')[1];
    forTeacherElement.click();
    const orderForSchools = forTeacherElement.$$(".dropdown-item")[1];
    orderForSchools.click();
    const SHORT_WAIT = 3000;
    browser.pause(SHORT_WAIT);
 }
 
 export function getInputIco() {
    return $('#ico');
 }
 
 export function setIcoAndWait (ico) {
    getInputIco().setValue(ico);
    browser.keys('Enter');
    const SHORT_WAIT = 3000;
    browser.pause(SHORT_WAIT);        
 }
 
 export function setSubstituteName(name){
    const inputZastoupenaOsobou = $('#substitute');
    inputZastoupenaOsobou.setValue(name);
 }
 
 export function setContactName(name) {
    const inputContantName = $('#contact_name');
    inputContantName.setValue(name);
 }
 
 export function setContactPhone(phoneNumber) {
    const inputContactTel = $('#contact_tel');
    inputContactTel.setValue(phoneNumber);
 }
 
 export function setContactMail(mail) {
    const inputContactMail= $('#contact_mail');
    inputContactMail.setValue(mail);
 }
 
 export function setFirstDate(start, end) {
    $('#start_date_1').setValue(start);
    $('#end_date_1').setValue(end);
 }
 
 export function getPrimestskyTabor() {
    return $('#nav-home-tab');
 }
 
 export function chooceOdpoledni() {
    $('#camp-date_part').selectByVisibleText('Odpolední');
 }
 
 export function getPocetDeti() {
    return $('#camp-students');
 }
 
 export function getVeVeku() {
    return $('#camp-age');
 }
 
 export function getAdults() {
    return $('#camp-adults');
 }
 
 export function getBottonOrder() {
    return $('.btn.btn-primary');
 }
 
 export function getTitleOfPage() {
    return $('.card').$('.card-body').$('h3').getText();
 }
