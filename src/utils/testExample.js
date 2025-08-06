// Example usage of test utilities for automated UI testing
import { 
  waitForElement, 
  waitForSearchButton, 
  waitForHospitals, 
  waitForBookingModal 
} from './testUtils';

// Example test function for search flow
export const testSearchFlow = async () => {
  try {
    // Wait for search button to appear (only shows when both state and city are selected)
    const searchBtn = await waitForSearchButton();
    console.log('Search button found:', searchBtn);
    
    // Click the search button
    searchBtn.click();
    
    // Wait for hospitals to load
    await waitForHospitals();
    console.log('Hospitals loaded successfully');
    
    return true;
  } catch (error) {
    console.error('Search flow test failed:', error);
    return false;
  }
};

// Example test function for booking flow
export const testBookingFlow = async () => {
  try {
    // Wait for hospital cards to be present
    await waitForHospitals();
    
    // Find the first book appointment button
    const bookBtn = document.querySelector('[data-testid="book-appointment-btn"]');
    if (!bookBtn) {
      throw new Error('Book appointment button not found');
    }
    
    // Click the book appointment button
    bookBtn.click();
    
    // Wait for booking calendar to appear
    const calendar = await waitForElement('[data-testid="booking-calendar"]');
    console.log('Booking calendar opened');
    
    // Find and click a time slot
    const timeSlot = document.querySelector('[data-testid="booking-calendar"] .MuiChip-root');
    if (timeSlot) {
      timeSlot.click();
      
      // Wait for booking modal to open
      await waitForBookingModal();
      console.log('Booking modal opened');
      
      // Fill in email
      const emailInput = document.querySelector('[data-testid="email-input"]');
      if (emailInput) {
        emailInput.value = 'test@example.com';
        emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      
      // Confirm booking
      const confirmBtn = document.querySelector('[data-testid="confirm-booking-btn"]');
      if (confirmBtn) {
        confirmBtn.click();
        console.log('Booking confirmed');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Booking flow test failed:', error);
    return false;
  }
};

// Example test function that waits for state changes
export const testStateChanges = async () => {
  try {
    // Example: Wait for loading state to complete
    await waitForCondition(() => {
      const loadingElement = document.querySelector('.loading-indicator');
      return !loadingElement || loadingElement.style.display === 'none';
    }, 10000);
    
    console.log('Loading completed');
    return true;
  } catch (error) {
    console.error('State change test failed:', error);
    return false;
  }
};

// Helper function to run all tests
export const runAllTests = async () => {
  console.log('Starting automated tests...');
  
  const results = {
    searchFlow: await testSearchFlow(),
    bookingFlow: await testBookingFlow(),
    stateChanges: await testStateChanges(),
  };
  
  console.log('Test results:', results);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(`All tests ${allPassed ? 'passed' : 'failed'}`);
  
  return results;
}; 