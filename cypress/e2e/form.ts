import faker from 'faker'

describe('Form', () => {
  it('Can fill out and submit the form', () => {
    const testForm = {
      food: faker.lorem.words(),
      drink: faker.lorem.words()
    }

    cy.visit('/')

    cy.findByText(/fill out the form/i)
      .click()

    cy.findByLabelText(/favorite food/i)
      .click()
      .type(testForm.food)
    
    cy.findByText(/next/i)
      .click()
    
    cy.findByLabelText(/favorite drink/i)
      .click()
      .type(testForm.drink)

    cy.findByText(/review/i)
      .click()

    cy.findByTestId('food-selection')
      .should('contain', testForm.food)
    
    cy.findByTestId('drink-selection')
      .should('contain', testForm.drink)

    cy.get('button')
      .findByText(/confirm/i)
      .click()

    cy.findByText(/congrats/i)

    cy.findByText(/home/i)
      .click()

    cy.findByText(/welcome to this awesome form/i)
      .should('exist')

    cy.url()
      .should('eq', `${Cypress.config().baseUrl}/`)
  })
})