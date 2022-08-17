//tests runs with server running in the background

describe('renders the App component', () => {
  it('renders correctly', () => {
    cy.visit('/')
  })

  it('renders Crate Post button', () => {
    cy.contains('Create Post')
  })

  it('click on Crate Post button opens modal', () => {
    cy.contains('Create Post').click()
    cy.contains('Your name')
    cy.contains('Post Content')
  })

  it('modal inputs should be empty', () => {
    cy.get('[id="postForm.name"]')
      .should('have.value', '')
    cy.get('[id="postForm.content"]')
      .should('have.value', '')
  })

  it('submit button should be disabled', () => {
    cy.get('[type="submit"]').should('be.disabled')
  })

  it('close button should close modal', () => {
    cy.contains('Close').click()
    cy.get('[type="submit"]').should('not.be.visible')
  })
})

describe('can create new post', () => {
  it('renders correctly', () => {
    cy.visit('/')
  })

  it('click on Crate Post button ', () => {
    cy.contains('Create Post').click()
  })

  it('write test data', () => {
    cy.get('[id="postForm.name"]')
      .type('Test User')
      .should('have.value', 'Test User')
    cy.get('[id="postForm.content"]')
      .type('Test Content')
      .should('have.value', 'Test Content')
  })

  it('click on save changes button', () => {
    cy.log( cy.get('[type="submit"]'))
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

    //click on first delete button
    cy.get(':nth-child(1) > :nth-child(1) > .ms-4').click()

    cy.get('Test Content').should('not.exist')
  })
})