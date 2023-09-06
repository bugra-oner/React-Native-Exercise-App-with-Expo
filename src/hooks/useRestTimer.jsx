import { useEffect } from 'react';

function useRestTimer(isResting, restTime, setIsResting, setRestTime) {
  useEffect(() => {
    if (isResting && restTime > 0) {
      const interval = setInterval(() => {
        setRestTime((prevRestTime) => prevRestTime - 1);
      }, 1000);
      
      if(restTime < 2 ){
        setIsResting(false)
      }

      return () => clearInterval(interval);
    } 
  }, [isResting, restTime]);
}

export default useRestTimer;
