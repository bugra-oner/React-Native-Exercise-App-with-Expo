// navigationRef.js

import * as React from 'react';

// Create a navigation reference
export const navigationRef = React.createRef();

// Function to navigate to a specific screen
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
