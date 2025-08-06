// Test utility functions for UI testing
export const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkElement = () => {
      const element = document.querySelector(selector);
      
      if (element) {
        resolve(element);
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        return;
      }
      
      setTimeout(checkElement, 100);
    };
    
    checkElement();
  });
};

export const waitForCondition = (condition, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkCondition = () => {
      if (condition()) {
        resolve();
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Condition not met within ${timeout}ms`));
        return;
      }
      
      setTimeout(checkCondition, 100);
    };
    
    checkCondition();
  });
};

export const waitForStateChange = (getState, expectedValue, timeout = 5000) => {
  return waitForCondition(() => getState() === expectedValue, timeout);
};

// Helper to wait for search button to appear
export const waitForSearchButton = () => {
  return waitForElement('#searchBtn');
};

// Helper to wait for hospitals to load
export const waitForHospitals = () => {
  return waitForCondition(() => {
    const hospitalCards = document.querySelectorAll('[data-testid="hospital-card"]');
    return hospitalCards.length > 0;
  });
};

// Helper to wait for booking modal to open
export const waitForBookingModal = () => {
  return waitForElement('[data-testid="booking-modal"]');
}; 