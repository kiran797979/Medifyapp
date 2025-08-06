// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to select state and city
Cypress.Commands.add('selectStateAndCity', (state, city) => {
  // Wait for state dropdown to be ready and select state
  cy.get('#state').should('be.visible').click()
  cy.get(`[data-value="${state}"]`).should('be.visible').click()
  
  // Wait for city dropdown to load and select city
  cy.get('#city').should('be.visible').click()
  cy.get(`[data-value="${city}"]`).should('be.visible').click()
})

// Custom command to book an appointment
Cypress.Commands.add('bookAppointment', (email = 'test@example.com') => {
  // Click the book appointment button
  cy.get('[data-testid="book-appointment-btn"]').first().should('be.visible').click()
  
  // Wait for booking calendar to appear
  cy.waitForBookingCalendar()
  
  // Click on a time slot (first available slot)
  cy.get('[data-testid="booking-calendar"] .MuiChip-root').first().should('be.visible').click()
  
  // Wait for booking modal to open
  cy.waitForBookingModal()
  
  // Fill in email
  cy.get('[data-testid="email-input"]').should('be.visible').type(email)
  
  // Confirm booking
  cy.get('[data-testid="confirm-booking-btn"]').should('be.visible').click()
})

// Custom command to verify booking in localStorage
Cypress.Commands.add('verifyBookingInStorage', () => {
  cy.window().then((win) => {
    const bookings = JSON.parse(win.localStorage.getItem('bookings') || '[]')
    expect(bookings.length).to.be.greaterThan(0)
  })
})

// Custom command to navigate to My Bookings page
Cypress.Commands.add('goToMyBookings', () => {
  cy.visit('/my-bookings')
  cy.get('h1').should('contain', 'My Bookings')
}) 