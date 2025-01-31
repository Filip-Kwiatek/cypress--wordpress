/// <reference types="cypress" />

context("Testing posts scenarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost/wordpress/wp-admin/post-new.php");
    cy.get("#user_login").type("root");
    cy.get("#user_pass").type("root");
    cy.get("#rememberme").check();
    cy.get("#wp-submit").click();
  });
  it("creating a post", () => {
    cy.get("#title").click().type("title 1");
    cy.get("#publish").click();
    cy.get("#sample-permalink").click();
    cy.get('a[href="http://localhost/wordpress/2025/01/30/title-1/"]')
      .should("have.attr", "href")
      .and("include", "title-1");
  });
  it("editing a post", () => {
    cy.visit("http://localhost/wordpress/wp-admin/edit.php");
    cy.get("a").contains("title 1");
    cy.findAllByText("Edytuj").eq(2).click({ force: true });
    cy.get('input[name="post_title"]').clear().type("title 2");
    cy.get("#publish").click();
    cy.get("#sample-permalink").click();
    cy.get('a[href="http://localhost/wordpress/2025/01/30/title-1/"]')
      .should("have.attr", "href")
      .and("include", "title-1");
  });
  it("deleting a post", () => {
    cy.visit("http://localhost/wordpress/wp-admin/edit.php");
    cy.get("a").contains("title 2");
    cy.get("a").contains("Do kosza").click({ force: true });
    cy.findAllByText("title 2").should("not.exist");
  });
});
