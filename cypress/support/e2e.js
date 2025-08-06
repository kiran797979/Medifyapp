// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom command to wait for search button to be visible
Cypress.Commands.add('waitForSearchButton', () => {
  cy.get('#searchBtn', { timeout: 10000 }).should('be.visible')
})

// Custom command to wait for hospitals to load
Cypress.Commands.add('waitForHospitals', () => {
  cy.get('[data-testid="hospital-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0)
})

// Custom command to wait for booking calendar to appear
Cypress.Commands.add('waitForBookingCalendar', () => {
  cy.get('[data-testid="booking-calendar"]', { timeout: 10000 }).should('be.visible')
})

// Custom command to wait for booking modal to open
Cypress.Commands.add('waitForBookingModal', () => {
  cy.get('[data-testid="booking-modal"]', { timeout: 10000 }).should('be.visible')
})

// Custom command to clear localStorage before tests
Cypress.Commands.add('clearBookings', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('bookings')
  })
}) 