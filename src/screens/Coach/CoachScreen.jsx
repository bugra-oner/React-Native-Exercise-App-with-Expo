import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { FitnessItems } from "../../Context";

//components
import Header from "../../components/views/Header";
import FitnessCards from "../../components/Cards/FitnessCards";
import StatsImage from "../../components/views/StatsImage";

import { useRoute } from "@react-navigation/native";

//Data
import fitness from "../../data/fitness";
import beginner from "../../data/beginner";
import advancedBeginner from "../../data/advancedBeginner";

const CoachScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();

  console.log(route.params);

  const { minutes, calories, workout } = useContext(FitnessItems);

  //Images Beginners
  const hera = require("../../assets/cards/hera.jpg");
  const advancedBeginnerImage = require("../../assets/cards/vikingSoldier.jpg");
  const romanHuman = require("../../assets/cards/basicHuman.jpg");
  //
  const image = require("../../assets/zeus.jpg");
  const midlevelImage = require("../../assets/cards/midLevel.jpg");
  const basicWorkoutImage = require("../../assets/twoWoman.jpg");

  const hard = require("../../assets/cards/hard.jpg");

  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          width: "100%",
        }}
      >
        <StatsImage
          colorsZero={"#494b4d"}
          colorsOne={"(rgb(254,239,239)"}
          colorsTwo={"rgb(157,100,100)"}
          colorsThree={"rgb(157,100,100)"}
          colorsFour={"rgb(241, 241, 241)"}
          colorsFive={"#494b4d"}
          imageSource={hera}
        />
        <FitnessCards
          first={true}
          difficulty={0}
          backgroundColor={"rgb(241, 241, 241)"}
          data={fitness}
          workoutCompleted={route.params}
        />
        {/*Beginners*/}
        <StatsImage
          colorsZero={"#bba8a0"}
          colorsOne={"#a58a7f"}
          colorsTwo={"#fce3be"}
          colorsThree={"#ffe7c2"}
          colorsFour={"#85746e"}
          colorsFive={"#bba8a0"}
          imageSource={romanHuman}
        />
        <FitnessCards
          difficulty={1}
          backgroundColor={"rgb(209, 205, 205)"}
          data={beginner}
          workoutCompleted={route.params}
        />
        {/*Beginners*/}
        <StatsImage
          colorsZero={"#71503c"}
          colorsOne={"#dfdcdc"}
          colorsTwo={"#4b453c"}
          colorsThree={"#4b453c"}
          colorsFour={"#dfdcdc"}
          colorsFive={"#71503c"}
          imageSource={advancedBeginnerImage}
        />
        <FitnessCards
          difficulty={2}
          backgroundColor={"#9c9c9c"}
          data={advancedBeginner}
          workoutCompleted={route.params}
        />

        {/* Advanced Beginner's finished*/}
        <StatsImage
          colorsZero={"#8d99a1"}
          colorsOne={"#ffffff"}
          colorsTwo={"#8d8787"}
          colorsThree={"#8d8787"}
          colorsFour={"#ffffff"}
          colorsFive={"#7e92a0"}
          imageSource={midlevelImage}
        />
        <FitnessCards
          difficulty={2}
          backgroundColor={"#7e92a0"}
          data={advancedBeginner}
          workoutCompleted={route.params}
        />
        <StatsImage imageSource={image} />
        <FitnessCards
          difficulty={3}
          backgroundColor={"#dbb88d"}
          data={fitness}
          workoutCompleted={route.params}
        />
        <StatsImage
          colorsZero={"#343d43"}
          colorsOne={"#a2adb6"}
          colorsTwo={"#0f1015"}
          colorsThree={"#0f1015"}
          colorsFour={"#a2adb6"}
          colorsFive={"#343d43"}
          imageSource={hard}
        />
        <FitnessCards
          difficulty={4}
          backgroundColor={"#3b3d47"}
          data={fitness}
          workoutCompleted={route.params}
        />
      </View>
    </ScrollView>
  );
};

export default CoachScreen;

const styles = StyleSheet.create({});
