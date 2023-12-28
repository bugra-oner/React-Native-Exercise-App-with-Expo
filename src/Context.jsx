import React, { createContext, useState, useEffect } from "react";

const FitnessItems = createContext();

import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [user, setUser] = useState(["test", "Gender"]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [calculatedData, setCalculatedData] = useState();

  // Verileri AsyncStorage'den alın
  useEffect(() => {
    AsyncStorage.getItem("workout").then((value) => {
      if (value !== null) {
        setWorkout(parseInt(value));
      }
    });

    AsyncStorage.getItem("calories").then((value) => {
      if (value !== null) {
        setCalories(parseInt(value));
      }
    });

    AsyncStorage.getItem("minutes").then((value) => {
      if (value !== null) {
        setMinutes(parseInt(value));
      }
    });
    AsyncStorage.getItem("user").then((value) => {
      if (value !== null) {
        setUser(JSON.parse(value));
        //console.log(user)
      }
    });
    AsyncStorage.getItem("calculatedData").then((value) => {
      if (value !== null) {
        setCalculatedData(value);
      }
    });
  }, []);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
        user,
        setUser,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
