/// <reference types="cypress" />

describe('проверяем доступность приложения', function() {
    beforeEach(()=>{
        cy.intercept('GET', 'api/ingredients', {
            fixture: 'ingredients.json'
          });
    })
    it('сервис должен быть доступен по адресу localhost:5173', function() {
        cy.visit('/'); 
    });
});
