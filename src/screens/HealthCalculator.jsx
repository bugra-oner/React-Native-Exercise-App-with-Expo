import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomPicker from "../components/CustomPicker";

import typography from "../constants/typography";
import colors from "../constants/colors";

import { useTranslation } from "react-i18next";

import GradientInput from "../components/inputs/GradientInput";

import Header from "../components/views/Header";
import GradientButton from "../components/buttons/GradientButton";

import { hp, wp, fp } from "../utils";

import { showMessage, hideMessage } from "react-native-flash-message";

const HealthCalculator = ({ navigation }) => {
  const { t } = useTranslation();

  const activityLevels = [
    { label: `${t("sedentary")}`, value: "sedentary" },
    { label: `${t("lightlyActive")}`, value: "lightlyActive" },
    { label: `${t("moderatelyActive")}`, value: "moderatelyActive" },
    { label: `${t("veryActive")}`, value: "veryActive" },
    { label: `${t("superActive")}`, value: "superActive" },
  ];

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [bmi, setBMI] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(null);
  const [dailyWater, setDailyWater] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);

  const isFormValid = () => {
    return (
      weight !== "" &&
      height !== "" &&
      age !== "" &&
      gender !== "" &&
      activityLevel !== ""
    );
  };

  const calculateIdealWeight = () => {
    const heightInCm = parseFloat(height);

    let idealWeight = 0;
    if (gender === "male") {
      idealWeight = heightInCm - 100 - (heightInCm - 150) / 4;
    } else if (gender === "female") {
      idealWeight = heightInCm - 100 - (heightInCm - 150) / 2.5;
    }

    return idealWeight.toFixed(2);
  };

  const calculateBMI = () => {
    if (weight && height && age) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);

      let interpretation = "";
      if (calculatedBMI < 16) {
        interpretation = `${t("veryThin")}`;
      } else if (calculatedBMI < 16.9) {
        interpretation = `${t("thin")}`;
      } else if (calculatedBMI < 18.4) {
        interpretation = `${t("slightlyThin")}`;
      } else if (calculatedBMI < 24.9) {
        interpretation = `${t("normalWeight")}`;
      } else if (calculatedBMI < 29.9) {
        interpretation = `${t("overweight")}`;
      } else if (calculatedBMI < 34.9) {
        interpretation = `${t("obese")}`;
      } else if (calculatedBMI < 39.9) {
        interpretation = `${t("veryObese")}`;
      } else {
        interpretation = `${t("obese")}`;
      }

      setBMI({
        value: calculatedBMI.toFixed(2),
        interpretation: interpretation,
      });

      return {
        value: calculatedBMI.toFixed(2),
        interpretation: interpretation,
      };
    }

    return null;
  };

  const calculateDailyCalories = () => {
    const activityMultiplier = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9,
    };

    let BMR = 0;
    if (gender === "male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    const dailyCalories = BMR * activityMultiplier[activityLevel];
    setDailyCalories(dailyCalories.toFixed(2));

    return dailyCalories.toFixed(2);
  };

  const calculateDailyWater = () => {
    const waterPerKilogram = 38;
    const dailyWaterAmount = waterPerKilogram * weight;
    setDailyWater(dailyWaterAmount.toFixed(2));

    return dailyWaterAmount.toFixed(2);
  };

  const handleCalculatePress = async () => {
    if (!isFormValid()) {
      showMessage({
        message: `${t("Error")}`,
        description: `${t("ErrorFormNotValid")}`,
        type: "danger",
        backgroundColor: "#484F88",
        icon: "danger",
      });
      return;
    }

    const calculatedIdealWeight = calculateIdealWeight();
    setIdealWeight(calculatedIdealWeight);

    const calculatedBMI = calculateBMI();
    const calculatedDailyCalories = calculateDailyCalories();
    const calculatedDailyWater = calculateDailyWater();

    const calculatedData = {
      bmi: calculatedBMI,
      dailyCalories: calculatedDailyCalories,
      dailyWater: calculatedDailyWater,
      idealWeight: calculatedIdealWeight,
    };

    try {
      await AsyncStorage.setItem(
        "calculatedData",
        JSON.stringify(calculatedData)
      );
      // console.log('Calculated data saved to AsyncStorage:', calculatedData);
      // Verilerin güncellendiğini bildir
      navigation.navigate("Graph", { updateHealthDataOnScreen: true });
    } catch (error) {
      //console.log('Error saving data to AsyncStorage:', error);
    }
  };

  const genders = [
    { label: t("Male"), value: "male" },
    { label: t("Female"), value: "female" },
  ];

  return (
    <>
      <Header
        LeftIconOnPress={() => navigation.goBack()}
        title={t("HealthCalculator")}
      />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <GradientInput
            style={styles.input}
            placeholder={t("InputKg")}
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputCm")}
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputOld")}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <CustomPicker
            options={activityLevels}
            selectedValue={activityLevel}
            onValueChange={(value) => setActivityLevel(value)}
          />
          <CustomPicker
            options={genders}
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
          />
          <GradientButton
            title={t("Calculated")}
            style={styles.GradientButton}
            onPress={handleCalculatePress}
          />
        </View>
        {bmi !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Vücut Kitle İndeksi: {bmi.value}
            </Text>
            <Text style={styles.resultText}>Durum: {bmi.interpretation}</Text>
          </View>
        )}
        {dailyCalories !== null && (
          <Text style={styles.resultText}>
            Günlük Kalori İhtiyacı: {dailyCalories} kcal
          </Text>
        )}
        {dailyWater !== null && (
          <Text style={styles.resultText}>
            Günlük Su İhtiyacı: {dailyWater} ml
          </Text>
        )}
        {idealWeight !== null && (
          <Text style={styles.resultText}>İdeal Kilo: {idealWeight} kg</Text>
        )}
        <Text style={styles.infoText}>{t("DaoInfo")}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    marginVertical: hp(2),
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.UiText,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: typography.healthText,
    marginBottom: 10,
  },
  infoText: {
    fontSize: typography.healthInfo,
    marginTop: 20,
    textAlign: "center",
    color: "gray",
    maxWidth: "94%",
  },
  GradientButton: {
    height: hp(7),
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(1.2),
  },
});

export default HealthCalculator;
