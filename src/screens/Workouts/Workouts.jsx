import React from "react";
import { View, Text, StyleSheet, ScrollView,ImageBackground } from "react-native";

import colors from "../../constants/colors";
import typography from "../../constants/typography";

import WorkoutsCard from "../../components/Cards/WorkoutsCard";
import CreaterCard from "../../components/Cards/CreateCard";
import i18n from "../../i18n/i18n";
import { navigate } from "../../navigation/navigationRef";

import { useTranslation } from "react-i18next";
import Header from "../../components/views/Header";

import SingleWorkoutCard from "../../components/SingleWorkoutCard";
import { fp,hp,wp } from "../../utils";

import GradientImage from "../../components/views/GradientImage";

export default function Workouts({ navigation }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Header
        RightIcon="view-list"
        LeftIconOnPress={() => navigation.goBack()}
        title={t("Workouts")}
      />
      <ScrollView style={styles.container}>
      <GradientImage 
        colorsOne={"#FBD786"}
        colorsTwo={"#816c5c"}
        />
        <View style={styles.cardsContainer}>
          <WorkoutsCard
            title={i18n.t("FullBodyWorkout")}
            subTitle={i18n.t("FullBodyDesc")}
            onPress={() => navigate("Workout")}
            image="push_ups"
            buttonText={t("Start")}
          />
          <WorkoutsCard
            title={i18n.t("UpperBodyWorkout")}
            subTitle={i18n.t("UpperBodyDesc")}
            image="sit_ups"
            buttonText={t("Start")}
            onPress={() => navigate("UpperBody")}
          />
          <WorkoutsCard
            title={i18n.t("LowerBodyWorkout")}
            subTitle={i18n.t("LowerBodyDesc")}
            onPress={() => navigate("LowerBody")}
            image="squats"
            buttonText={t("Start")}
          />
        </View>
        <View style={styles.singleExerciseView}>
          <View style={styles.singleExercisesRow}>
            <SingleWorkoutCard
              title={t("PushUps")}
              description={t("PushupDesc")}
              imageSource={require("../../assets/cards/pushups.jpg")}
              onPress={() => navigate("PushUps")}
            />
            <SingleWorkoutCard
              title={t("Squad")}
              description={t("SquadDesc")}
              imageSource={require("../../assets//cards/squad.jpg")}
              onPress={() => navigate("Squad")}
            />
          </View>
          <View style={styles.singleExercisesRow}>
            <SingleWorkoutCard
              title={t("SitUps")}
              description={t("SitupsDesc")}
              imageSource={require("../../assets/cards/situps.jpg")}
              onPress={() => navigate("SitUps")}
            />
            <SingleWorkoutCard
              title={t("TricepsDips")}
              description={t("TricepsDesc")}
              imageSource={require("../../assets//cards/triceps.jpg")}
              onPress={() => navigate("Triceps")}
            />
          </View>
        </View>
        <View
        style={styles.emptyContainer} 
        ></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 10,
  },
  title: {
    fontSize: typography.title,
    color: colors.UiText,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: typography.cardSubtitle,
    opacity: 0.6,
  },
  text:{
    fontSize:typography.cardSubtitle,
    color: colors.UiText,
    opacity: 0.9,
    alignSelf : "center",
    marginBottom : 20,

  },
  cardsContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 13,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: typography.title,
    color: colors.title,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: typography.body,
    color: colors.subTitle,
    fontWeight: "600",
  },
 
  singleExerciseView:{
    alignItems : 'center',
    marginVertical: 5,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  singleExercisesRow:{
    flexDirection: 'row',
    columnGap : 10,
    marginVertical: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  emptyContainer:{
    height: 50,
  }
});
