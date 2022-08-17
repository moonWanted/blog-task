//tests runs with server running in the background
import MainPage from '../support/PageObjects/MainPage'

const mainPage = new MainPage()

describe('renders the App component', () => {
  it('renders correctly', () => {
    cy.visit('/')
  })

  it('renders Crate Post button', () => {
    mainPage.getCreatePostButton().should('be.visible')
  })

  it('click on Crate Post button opens modal', () => {
    mainPage.getCreatePostButton().click()
    cy.contains('Your name').should('be.visible')
    cy.contains('Post Content').should('be.visible')
  })

  it('modal inputs should be empty', () => {
    mainPage.getModalNameField()
      .should('have.value', '')
    mainPage.getModalContentField()
      .should('have.value', '')
  })

  it('submit button should be disabled', () => {
    mainPage.getModalSubmitButton().should('be.disabled')
  })

  it('close button should close modal', () => {
    mainPage.getModalCloseButton().click()
    mainPage.getModalSubmitButton().should('not.be.visible')
  })
})

describe('can create new post', () => {
  it('renders correctly', () => {
    cy.visit('/')
  })

  it('click on Crate Post button ', () => {
    mainPage.getCreatePostButton().click()
  })

  it('write test data', () => {
    mainPage.getModalNameField()
      .type('Test User')
      .should('have.value', 'Test User')
    mainPage.getModalContentField()
      .type('Test Content')
      .should('have.value', 'Test Content')
  })

  it('click on save changes button', () => {
    cy.contains('Save Changes').click()
  })

  it('should see new post', () => {
    cy.contains('Post by: Test User')
  })
})

describe('can delete post', () => {
  it('renders correctly', () => {
    cy.visit('/')
  })

  it('delete one of posts', () => {
    cy.contains('Test Content')
    mainPage.getFirstDeleteButton().click()
    cy.get('Test Content').should('not.exist')
  })
})