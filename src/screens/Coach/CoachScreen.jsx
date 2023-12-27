import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useRef } from "react";
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

//Data intermediate
import IntermediateBeginner from "../../data/IntermediateBeginner";
import Intermediate from "../../data/Intermediate";
import IntermediateAdvanced from "../../data/IntermediateAdvanced";

//asdfasdfsa
import LevelButtons from "../../components/LevelButtons";

import useFlashMessage from "../../hooks/FlashMessage";
import { hp } from "../../utils";

const CoachScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();

  //console.log(route.params);

  // const { minutes, calories, workout } = useContext(FitnessItems);

  const { showFlashMessage } = useFlashMessage();

  //Images Beginners
  const hera = require("../../assets/cards/hera.jpg");
  const beginnerImage = require("../../assets/cards/2.jpg");
  const romanHuman = require("../../assets/cards/basicHuman.jpg");
  // Image Midlevel
  const beginnerMidImage = require("../../assets/cards/vikingSoldier.jpg");
  const advancedMidLevel = require("../../assets/cards/midLevel.jpg");
  const midLevel = require("../../assets/cards/intermade.jpg");
  const image = require("../../assets/zeus.jpg");
  const hard = require("../../assets/cards/hard.jpg");

  const handleFlashMessage = async (
    firstTitle = "DevelopmentInProgressTitle",
    secondTitle = "DevelopmentInProgress",
    alert = "warning"
  ) => {
    showFlashMessage(`${t(firstTitle)}`, `${t(secondTitle)}`, alert);
  };

  useEffect(() => {
    if (route.params && route.params.workoutComplete) {
      handleFlashMessage("SuccessHealth", "WorkoutCompletedTitle", "success");
    }
  }, [route.params]);

  const scrollViewRef = useRef(null);

  const handleScrollTo = (x, y) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y, animated: true });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{
        backgroundColor: "rgba(80,80,136,0.8)",
        padding: 15,
      }}
    >
      <LevelButtons
        onBeginnerPress={() => handleScrollTo(0, hp(140))}
        onIntermediatePress={() => handleScrollTo(0, hp(350))}
        onAdvancedPress={() => handleScrollTo(0, hp(600))}
      />
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
        backgroundColor={"rgb(216, 213, 213)"}
        data={fitness}
        workoutCompleted={route.params}
      />
      {/*Beginners*/}
      {/*Two lighting*/}

      <StatsImage
        colorsZero={"#424a4a"}
        colorsOne={"#rgb(241, 241, 241)"}
        colorsTwo={"#c99e5e"}
        colorsThree={"#c99e5e"}
        colorsFour={"#rgb(241, 241, 241)"}
        colorsFive={"#424a4a"}
        imageSource={beginnerImage}
      />
      <FitnessCards
        difficulty={1}
        backgroundColor={"rgb(199, 184, 184)"}
        data={beginner}
        workoutCompleted={route.params}
      />

      {/*Three lighting*/}
      {/*Beginners*/}

      <StatsImage
        colorsZero={"#71503c"}
        colorsOne={"#dfdcdc"}
        colorsTwo={"#4b453c"}
        colorsThree={"#4b453c"}
        colorsFour={"#dfdcdc"}
        colorsFive={"#71503c"}
        imageSource={romanHuman}
      />
      <FitnessCards
        difficulty={2}
        backgroundColor={"#9c9c9c"}
        data={advancedBeginner}
        workoutCompleted={route.params}
      />
      {/* Advanced Beginner's finished*/}

      {/* Intermediate  Beginner
      <StatsImage
        colorsZero={"#71503c"}
        colorsOne={"#dfdcdc"}
        colorsTwo={"#4b453c"}
        colorsThree={"#4b453c"}
        colorsFour={"#dfdcdc"}
        colorsFive={"#71503c"}
        imageSource={beginnerMidImage}
      />
      <FitnessCards
        difficulty={2.5}
        backgroundColor={"#9c9c9c"}
        data={IntermediateBeginner}
        workoutCompleted={route.params}
      />
      */}
      
      {/* Intermediate MidLevel 
      <StatsImage imageSource={image} />
      <FitnessCards
        difficulty={3}
        backgroundColor={"#dbb88d"}
        data={Intermediate}
        workoutCompleted={route.params}
      />
      */}
      {/* Mid level Advanced
      <StatsImage
        colorsZero={"#71503c"}
        colorsOne={"#dfdcdc"}
        colorsTwo={"#4b453c"}
        colorsThree={"#4b453c"}
        colorsFour={"#dfdcdc"}
        colorsFive={"#71503c"}
        imageSource={midLevel}
      />
      <FitnessCards
        difficulty={3.5}
        backgroundColor={"#9c9c9c"}
        data={IntermediateAdvanced}
        workoutCompleted={route.params}
      />
       */}
      

      {/*Mid Level Finished 

      <StatsImage
        colorsZero={"#7a8288"}
        colorsOne={"#ffffff"}
        colorsTwo={"#8d8787"}
        colorsThree={"#8d8787"}
        colorsFour={"#ffffff"}
        colorsFive={"#7a8288"}
        imageSource={advancedMidLevel}
      />
      <FitnessCards
        difficulty={4}
        backgroundColor={"#7e92a0"}
        data={IntermediateBeginner}
        workoutCompleted={route.params}
      />
      */}

      {/* Intermediate Finished */}

      {/* Intermediate Advanced */}
      {/* <StatsImage
        colorsZero={"#000000"}
        colorsOne={"#fbcea3"}
        colorsTwo={"#000000"}
        colorsThree={"#000000"}
        colorsFour={"#fbcea3"}
        colorsFive={"#000000"}
        imageSource={hard}
      />
      <FitnessCards
        difficulty={5}
        backgroundColor={"#33343d"}
        data={fitness}
        workoutCompleted={route.params}
      /> */}
    </ScrollView>
  );
};

export default CoachScreen;

const styles = StyleSheet.create({});
