import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import typography from "../../constants/typography";
import colors from "../../constants/colors";

// import { useIsFocused } from '@react-navigation/native';
// import { CommonActions } from '@react-navigation/native';

import { useTranslation } from "react-i18next";

import IndexCard from "../../components/Cards/IndexCard";
import InfoCard from "../../components/Cards/InfoCard";
import { navigate } from "../../navigation/navigationRef";
import Card from "../../components/Card";

import CategoriesButton from "../../components/buttons/CategoriesButton";
import Header from "../../components/views/Header";

import useFlashMessage from "../../hooks/FlashMessage";

import { fp, hp, wp } from "../../utils";

export default function Graph({ navigation, route }) {
  const { showFlashMessage } = useFlashMessage();
  const [healthData, setHealthData] = useState({});
  const { t } = useTranslation();

  // useEffect(() => {
  //   // AsyncStorage'den kaydedilen veriyi al
  //   const fetchHealthData = async () => {
  //     try {
  //       const savedData = await AsyncStorage.getItem('calculatedData');
  //       console.log(savedData)
  //       if (savedData) {
  //         setHealthData(JSON.parse(savedData));
  //         console.log(healthData)
  //       }
  //     } catch (error) {
  //       console.log('Error fetching data from AsyncStorage:', error);
  //     }
  //   };

  //   fetchHealthData();
  // }, []);

  // const fetchHealthData = async () => {
  //   try {
  //     const savedData = await AsyncStorage.getItem('calculatedData');
  //     console.log(savedData)
  //     if (savedData) {
  //       setHealthData(JSON.parse(savedData));
  //       console.log(healthData)
  //     }
  //   } catch (error) {
  //     console.log('Error fetching data from AsyncStorage:', error);
  //   }
  // };

  // const isFocused = useIsFocused();

  useEffect(() => {
    // AsyncStorage'den kaydedilen veriyi al
    const fetchHealthData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("calculatedData");
        if (savedData) {
          setHealthData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchHealthData();

    // Eğer ana ekran verileri güncellendi ise veriyi yeniden al
    if (route.params?.updateHealthDataOnScreen) {
      showFlashMessage(
        `${t("SuccessHealth")}`,
        `${t("SuccessHealthDescription")}`,
        "success"
      );
      fetchHealthData();
    }
  }, [route.params?.updateHealthDataOnScreen]);

  return (
    <>
      <Header
        LeftIcon="artstation"
        RightIconOnPress={() => navigation.navigate("Profil")}
        title={`${t("Health")}`}
      />
      <ScrollView style={styles.container}>
        <IndexCard
          unHealth={true}
          buttonTitle={`${t("nowStart")}`}
          title={`${t("healthInfoTitle")}`}
          subTitle={`${t("healthInfoSubTitle")}`}
          borderRadius={5}
          onPress={() => navigate("HealthCalculator")}
        />
        <View style={styles.CategoriesButton}>
          <CategoriesButton
            title={t("Cardio")}
            name="walk"
            iconColor={"rgba(72, 79, 136, 0.8)"}
            size={fp(4)}
            color={"#ae9b83"}
          />
          <CategoriesButton
            title={t("Strength")}
            name="dumbbell"
            size={fp(4)}
            iconColor={"rgba(72, 79, 136, 0.8)"}
            color={"#ae7070"}
          />
          <CategoriesButton
            title={t("Endurance")}
            name="horse-variant-fast"
            size={fp(4)}
            iconColor={"rgba(72, 79, 136, 0.8)"}
            color={"#35c3dc"}
          />
          <CategoriesButton
            title={t("More")}
            name="grain"
            iconColor={"rgba(72, 79, 136, 0.8)"}
            size={fp(4)}
            color={"#7faedc"}
          />
        </View>
        <Card
          title={t("HealthConsequences")}
          icon="aperture-outline"
          subtitle="Durum"
          contentText={`${t("bmiContentText")} : ${
            healthData.bmi?.interpretation ? healthData.bmi?.interpretation : ""
          }`}
          bottomTexts={[
            { text: `${t("dailyCaloriesText")}` },
            { text: `${t("dailyWaterText")}` },
            { text: `${t("idealWeightText")}` },
          ]}
          subTexts={[
            ` ${healthData.dailyCalories ? healthData.dailyCalories : ""} `,
            `${healthData.dailyWater ? healthData.dailyWater : ""}`,
            `${healthData.idealWeight ? healthData.idealWeight : ""}`,
          ]}
          subTextIcons={["fast-food", "water", "man"]}
          additionalText={`${t("HealthInfo")}`}
          additionalIcon="ios-add-circle-outline"
        />
        {/* /* <View style={styles.container}>
      <Text style={styles.title}>Sağlık Sonuçları</Text>
      <Text>Vücut Kitle İndeksi: </Text>
      <Text>Durum: {healthData.bmi?.interpretation ? healthData.bmi?.interpretation: "" } </Text>
      <Text>Günlük Kalori İhtiyacı: {healthData.dailyCalories} kcal</Text>
      <Text>Günlük Su İhtiyacı: {healthData.dailyWater} ml</Text>
      <Text>İdeal Kilo: {healthData.idealWeight} kg</Text>
      Diğer hesaplamaları da buraya ekleyebilirsiniz</View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    marginVertical: 10,
  },

  CategoriesButton: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: typography.title,
  },
});
