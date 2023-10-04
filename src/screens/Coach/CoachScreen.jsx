import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import FitnessCards from "../../components/Cards/FitnessCards";
import { FitnessItems } from "../../Context";

import Header from "../../components/views/Header";

import { useTranslation } from "react-i18next";

import StatsImage from "../../components/views/StatsImage";

//Data
import fitness from "../../data/fitness";

const CoachScreen = () => {
  const { t } = useTranslation();

  const { minutes, calories, workout } = useContext(FitnessItems);

  const image = require("../../assets/zeus.jpg");
  const basicWorkoutImage = require("../../assets/twoWoman.jpg");

  const twoWorkoutImage = require("../../assets/kolaykedi.jpg");

  return (
    <>
      <Header title={t("Workouts")} />
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: "100%",
          }}
        >
          <StatsImage
            colorsZero={"#484F88"}
            colorsOne={"#283048"}
            colorsTwo={"#2c3e50"}
            colorsThree={"#2c3e50"}
            colorsFour={"#283048"}
            colorsFive={"#484F88"}
            imageSource={basicWorkoutImage}
          />
          <FitnessCards
            first={true}
            difficulty={0}
            backgroundColor={"#484F88"}
            data={fitness}
          />
          <StatsImage
            colorsZero={"#2f4b49"}
            colorsOne={"#2f4b49"}
            colorsTwo={"#829477"}
            colorsThree={"#829477"}
            colorsFour={"#2f4b49"}
            colorsFive={"#2f4b49"}
            imageSource={twoWorkoutImage}
          />
          <FitnessCards
            difficulty={1}
            backgroundColor={"#2c3e50"}
            data={fitness}
          />
          <StatsImage imageSource={image} />
          <FitnessCards
            difficulty={2}
            backgroundColor={"#a0a7ad"}
            data={fitness}
          />
          <StatsImage imageSource={image} />
          <FitnessCards
            difficulty={3}
            backgroundColor={"#f3af5c"}
            data={fitness}
          />
          <StatsImage imageSource={image} />
          <FitnessCards
            difficulty={4}
            backgroundColor={"#bd6e0f"}
            data={fitness}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default CoachScreen;

const styles = StyleSheet.create({});
