class ProductPage {
  getCreatePostButton() {
    return cy.contains('Create Post')
  }
  getModalNameField() {
    return cy.get('[id="postForm.name"]')
  }
  getModalContentField() {
    return cy.get('[id="postForm.content"]')
  }
  getModalSubmitButton() {
    return cy.get('[type="submit"]')
  }
  getModalCloseButton() {
    return cy.contains('Close')
  }
  getFirstDeleteButton() {
    return cy.get(':nth-child(1) > :nth-child(1) > .ms-4')
  }
}

export default ProductPage