// useRestTimer.js

import { useEffect } from 'react';

/**
 * A custom hook for managing rest timers.
 * @param {boolean} isResting - Indicates whether the rest timer is active.
 * @param {number} restTime - The remaining time for the rest timer.
 * @param {function} setIsResting - A function to update the state of rest timer activation.
 * @param {function} setRestTime - A function to update the remaining time for the rest timer.
 */
function useRestTimer(isResting, restTime, setIsResting, setRestTime) {
  useEffect(() => {
    // Check if rest timer is active and time is greater than 0
    if (isResting && restTime > 0) {
      // Set up an interval to decrement rest time every second
      const interval = setInterval(() => {
        setRestTime((prevRestTime) => prevRestTime - 1);
      }, 1000);

      // Check if rest time is less than 2 seconds and deactivate rest timer
      if (restTime < 2) {
        setIsResting(false);
      }

      // Cleanup function to clear the interval when the component unmounts or conditions change
      return () => clearInterval(interval);
    }
  }, [isResting, restTime, setIsResting, setRestTime]);
}

export default useRestTimer;
