describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()

    cy.contains("Tuesday")


    cy.get('[alt=Add]').text
    cy.get('[alt=Add]')
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save')
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })

  it("should edit an interview", () => {
    cy.get('[alt=Edit]').click({ force: true })

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type("Edited Name");

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save')
      .click();

    cy.contains(".appointment__card--show", "Edited Name");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it.only("should cancel an interview", () => {
    cy.get('[alt=Delete]').click({ force: true })
    
    cy.contains("button","Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })

})