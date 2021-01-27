const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/")
  })
})