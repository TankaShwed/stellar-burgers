/// <reference types="cypress" />

describe('burger constructor', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
  });
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
  describe('не авторизированный', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('нет имени пользователя ', () => {
      cy.get('[data-cy="user-name"]')
        .contains('Личный кабинет')
        .should('exist');
    });
    it('булка должна быть пуста', () => {
      cy.get('[data-cy="burger-maket"]')
        .contains('Выберите булки')
        .should('exist');
    });
    it('начинка должна быть пуста', () => {
      cy.get('[data-cy="burger-maket"]')
        .contains('Выберите начинку')
        .should('exist');
    });
    describe('булка', () => {
      beforeEach(() => {
        cy.get('[data-cy="ing-1"]').contains('Добавить').click();
      });
      it('в макете не должно быть фразы: "Выберите булки"', () => {
        cy.get('[data-cy="burger-maket"]')
          .contains('Выберите булки')
          .should('not.exist');
      });
      it('добавлена булка: булка-1', () => {
        cy.get('[data-cy="burger-maket"]').contains('булка-1').should('exist');
      });
      describe('замена', () => {
        beforeEach(() => {
          cy.get('[data-cy="ing-8"]').contains('Добавить').click();
        });
        it('в макете должны булка-1 замениться на булка-2', () => {
          cy.get('[data-cy="burger-maket"]')
            .contains('булка-2')
            .should('exist');
        });
      });
    }),
      describe('начинка', () => {
        beforeEach(() => {
          cy.get('[data-cy="ing-2"]').contains('Добавить').click();
          cy.get('[data-cy="ing-3"]').contains('Добавить').click();
        });
        it('добавлена начинка: Нога Магнолии', () => {
          cy.get('[data-cy="burger-maket"]')
            .contains('Нога Магнолии')
            .should('exist');
        });
        it('добавлена начинка: тетраодонтимформа', () => {
          cy.get('[data-cy="burger-maket"]')
            .contains('тетраодонтимформа')
            .should('exist');
        });
        describe('удаление', () => {});
      }),
      describe('оформить заказ', () => {});
  });
});
