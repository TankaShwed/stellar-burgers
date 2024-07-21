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
        describe('открытие модального окна ингридиента', () => {
          beforeEach(() => {
            cy.get('[data-cy="ing-1"]').find('img').click();
          });
          it('при нажатии на ингридиент открывается модальное окно', () => {
            cy.get('[data-cy="modal"]').contains('булка-1').should('exist');
          });
          describe('закрытие по клику на крестик', () => {
            beforeEach(() => {
              cy.get('[data-cy="modal"]').find('button').click();
            });
            it('модальное окно закрылось', () => {
              cy.get('[data-cy="modal"]').should('not.exist');
            });
          });
          describe('закрытие на оверлэй', () => {
            beforeEach(() => {
              cy.get('[data-cy="modal-overlay"]').click(10, 10, {
                force: true
              });
            });
            it('модальное окно закрылось', () => {
              cy.get('[data-cy="modal"]').should('not.exist');
            });
          });
        });
      }),
      describe('оформить заказ', () => {});
  });
  describe.only('авторизированный', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      });
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      });
      cy.visit('/');
    });
    it('должно быть написано имя пользователя', function () {
      cy.get('[data-cy="user-name"]').contains('Бобр К').should('exist');
    });
    describe('оформить заказ', () => {
      beforeEach(() => {
        cy.get('[data-cy="ing-8"]').contains('Добавить').click();
        cy.get('[data-cy="ing-2"]').contains('Добавить').click();
      });
      it('добавлена булка: булка-2, Нога Магнолии', () => {
        cy.get('[data-cy="burger-maket"]').contains('булка-2').should('exist');
        cy.get('[data-cy="burger-maket"]')
          .contains('Нога Магнолии')
          .should('exist');
      });
      beforeEach(() => {
        cy.get('[data-cy="burger-maket-order"]').find('button').click();
      });
      it('должна отскрыться модальное окно с номеромзаказа', () => {
        cy.get('[data-cy="modal"]')
          .contains('идентификатор заказа')
          .should('exist');
      });
      it('номер заказа должен быть ', () => {
        cy.get('[data-cy="modal"]').contains('46833').should('exist');
      });
      describe('закрытие по клику на крестик', () => {
        beforeEach(() => {
          cy.get('[data-cy="modal"]').find('button').click();
        });
        it('модальное окно закрылось', () => {
          cy.get('[data-cy="modal"]').should('not.exist');
        });
      });
    });
  });
});
