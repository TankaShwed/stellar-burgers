/// <reference types="cypress" />

describe('burger constructor', function () {
  const burgerMaket = '[data-cy="burger-maket"]';
  const modal = '[data-cy="modal"]';
  const userName = '[data-cy="user-name"]';
  const bun1 = '[data-cy="ing-1"]';
  const bun2 = '[data-cy="ing-8"]';
  const main1 = '[data-cy="ing-2"]';
  const main2 = '[data-cy="ing-3"]';
  const burgerMaketOrder = '[data-cy="burger-maket-order"]';
  const modalOverlay = '[data-cy="modal-overlay"]';

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
      cy.get(userName).contains('Личный кабинет').should('exist');
    });
    it('булка должна быть пуста', () => {
      cy.get(burgerMaket).contains('Выберите булки').should('exist');
    });
    it('начинка должна быть пуста', () => {
      cy.get(burgerMaket).contains('Выберите начинку').should('exist');
    });
    describe('булка', () => {
      beforeEach(() => {
        cy.get(bun1).contains('Добавить').click();
      });
      it('в макете не должно быть фразы: "Выберите булки"', () => {
        cy.get(burgerMaket).contains('Выберите булки').should('not.exist');
      });
      it('добавлена булка: булка-1', () => {
        cy.get(burgerMaket).contains('булка-1').should('exist');
      });
      describe('замена', () => {
        beforeEach(() => {
          cy.get(bun2).contains('Добавить').click();
        });
        it('в макете должны булка-1 замениться на булка-2', () => {
          cy.get(burgerMaket).contains('булка-2').should('exist');
        });
      });
    }),
      describe('начинка', () => {
        beforeEach(() => {
          cy.get(main1).contains('Добавить').click();
          cy.get(main2).contains('Добавить').click();
        });
        it('добавлена начинка: Нога Магнолии', () => {
          cy.get(burgerMaket).contains('Нога Магнолии').should('exist');
        });
        it('добавлена начинка: тетраодонтимформа', () => {
          cy.get(burgerMaket).contains('тетраодонтимформа').should('exist');
        });
        describe('открытие модального окна ингридиента', () => {
          beforeEach(() => {
            cy.get(bun1).find('img').click();
          });
          it('при нажатии на ингридиент открывается модальное окно', () => {
            cy.get(modal).contains('булка-1').should('exist');
          });
          describe('закрытие по клику на крестик', () => {
            beforeEach(() => {
              cy.get(modal).find('button').click();
            });
            it('модальное окно закрылось', () => {
              cy.get(modal).should('not.exist');
            });
          });
          describe('закрытие на оверлэй', () => {
            beforeEach(() => {
              cy.get(modalOverlay).click(10, 10, {
                force: true
              });
            });
            it('модальное окно закрылось', () => {
              cy.get(modal).should('not.exist');
            });
          });
        });
      }),
      describe('оформить заказ', () => {
        beforeEach(() => {
          cy.get(burgerMaketOrder).find('button').click();
        });
        it('должна открыться страница входа в личный кабинет', () => {
          cy.url().should('eq', 'http://localhost:4000/login')
        });
      });
  });
  describe('авторизированный', () => {
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
      cy.get(userName).contains('Бобр К').should('exist');
    });
    describe('оформить заказ', () => {
      beforeEach(() => {
        cy.get(bun2).contains('Добавить').click();
        cy.get(main1).contains('Добавить').click();
      });
      it('добавлена булка и начинка: булка-2, Нога Магнолии', () => {
        cy.get(burgerMaket).contains('булка-2').should('exist');
        cy.get(burgerMaket).contains('Нога Магнолии').should('exist');
      });
      beforeEach(() => {
        cy.get(burgerMaketOrder).find('button').click();
      });
      it('должна открыться модальное окно с номером заказа', () => {
        cy.get(modal).contains('идентификатор заказа').should('exist');
      });
      it('номер заказа должен быть ', () => {
        cy.get(modal).contains('46833').should('exist');
      });
      describe('закрытие по клику на крестик', () => {
        beforeEach(() => {
          cy.get(modal).find('button').click();
        });
        it('модальное окно закрылось', () => {
          cy.get(modal).should('not.exist');
        });
      });
    });
  });
});
