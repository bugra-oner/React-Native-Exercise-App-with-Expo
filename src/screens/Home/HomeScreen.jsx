import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import ExerciseService from "../../service/ExerciseService";

// import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacing from "../../components/views/Spacing";
import CreaterCard from "../../components/Cards/CreateCard";
import SvgCard from "../../components/Cards/SvgCard";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import ButtonCard from "../../components/Cards/ButtonCard";
// import IndexCard from '../../components/Cards/IndexCard'
import WorkoutsCard from "../../components/Cards/WorkoutsCard";
import { navigate } from "../../navigation/navigationRef";

import { useTranslation } from "react-i18next";
import Header from "../../components/views/Header";
// import ImageCard from '../../components/Cards/ImageCard';
import ProteinCard from "../../components/Cards/ProteinCard";
import SingleWorkoutCard from "../../components/SingleWorkoutCard";
import getProteinAmountFromStorage from "../../helpers/storageHelpers";

import { wp, fp, hp } from "../../utils";

import useFlashMessage from "../../hooks/FlashMessage";
import { FitnessItems } from "../../Context";

import GradientImage from "../../components/views/GradientImage";

export default function HomeScreen({ navigation, route }) {
  const { minutes, calories, workout } = useContext(FitnessItems);

  const { showFlashMessage } = useFlashMessage();

  const { t } = useTranslation();
  const [completedWorkouts, setCompletedWorkouts] = useState(0);
  const [level, setLevel] = useState(1);
  const [workout2Level, setWorkout2Level] = useState(1);
  const [workout3Level, setWorkout3Level] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [protein, setProtein] = useState("");

  const loadLevels = async () => {
    const level = await ExerciseService.getLevel("@save_level");
    const workout2Level = await ExerciseService.getLevel("@save_workout2Level");
    const workout3Level = await ExerciseService.getLevel("@save_workout3Level");
    setLevel(level);
    setWorkout2Level(workout2Level);
    setWorkout3Level(workout3Level);
  };

  getProteinAmountFromStorage()
    .then((proteinAmount) => {
      // proteinAmount değişkeni, AsyncStorage'den alınan protein miktarını içerecektir
      // console.log('Protein Amount:', proteinAmount);
      setProtein(proteinAmount);
      // console.log(protein)
      // console.log(typeof(protein))
    })
    .catch((error) => {
      // Hata durumunda burası çalışır
      console.error("Error:", error);
    });

  useEffect(() => {
    const { totalWorkouts, totalReps } = ExerciseService.calculateStatistics();
    setTotalWorkouts(totalWorkouts);
    setTotalReps(totalReps);
    loadLevels();
  }, []);

  const handleFlashMessage = async (
    firstTitle = "DevelopmentInProgressTitle",
    secondTitle = "DevelopmentInProgress",
    alert = "warning"
  ) => {
    showFlashMessage(`${t(firstTitle)}`, `${t(secondTitle)}`, alert);
  };

  useEffect(() => {
    if (route.params && route.params.workoutStatus) {
      handleFlashMessage("Homepage", "WorkoutCompletedTitle", "success");
    }
  }, [route.params]);

  return (
    <>
      <Header
        title={t("Homepage")}
        LeftIcon="weight-lifter"
        LeftIconOnPress={() => navigation.navigate("Workouts")}
        RightIcon="home"
        RightIconOnPress={() => navigation.navigate("Profil")}
      />
      <ScrollView style={styles.container}>
        <CreaterCard marginTop="9%" onPress={() => handleFlashMessage()} />
        <Text style={styles.title}>{t("Overview")}</Text>
        <View style={styles.headerContainer}>
          <SvgCard
            title={t("Completed")}
            subTitle={`${workout}` + " " + t("Exercise")}
          />
          <View style={styles.buttonsContainer}>
            <ButtonCard
              title={t("Calories")}
              subTitle={`${calories.toFixed(0)}`}
            />
            <Spacing size={15} />
            <ButtonCard
              title={t("TotalMinute")}
              subTitle={`${minutes.toFixed(0)}`}
            />
          </View>
        </View>
        <GradientImage />
        <View style={styles.cardsContainer}>
          <View style={styles.workoutsHeader}>
            <Text style={styles.workoutsTitle}>
              {t("ExercisesWithoutEquipment")}
            </Text>
            <TouchableOpacity onPress={() => navigate("Workouts")}>
              <Text style={styles.workoutsSubTitle}>{t("All")}</Text>
            </TouchableOpacity>
          </View>

          {/*  */}

          <WorkoutsCard
            title={t("FullBodyWorkout")}
            subTitle={t("FullBodyDesc")}
            onPress={() =>
              // showMessage({
              // message: "Simple message",
              // type: "info",
              navigate("Workout")
            }
            image="push_ups"
            buttonText={t("Start")}
          />
          <WorkoutsCard
            title={t("UpperBodyWorkout")}
            subTitle={t("UpperBodyDesc")}
            onPress={() => navigate("UpperBody")}
            image="sit_ups"
            buttonText={t("Start")}
          />
          <WorkoutsCard
            title={t("LowerBodyWorkout")}
            subTitle={t("LowerBodyDesc")}
            onPress={() => navigate("LowerBody")}
            image="squats"
            buttonText={t("Start")}
          />
        </View>
        <ProteinCard />
        <Text style={styles.singleExercisesTitle}>{t("SingleExercises")}</Text>
        <View>
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
        </View>
        {/* <Text>Barfiks</Text>
    <View style={styles.singleExercisesRow}>
        <SingleWorkoutCard 
      title={t('SitUps')}
      description={t('SitupsDesc')}
      imageSource={require('../../assets/cards/situps.jpg')}
      onPress={()=> navigate('SitUps')}
       />
        <SingleWorkoutCard 
      title={t('TricepsDips')}
      description={t('TricepsDesc')}
      imageSource={require('../../assets//cards/triceps.jpg')}
      onPress={() => navigate('Triceps')}
      backgroundColor={"#d3c1c1"}
      />
      </View> */}
        <View style={styles.ExtraView}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginLeft: "5%",
    marginTop: 15,
    color: colors.UiText,
    fontSize: fp(2.5),
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonsContainer: {
    flexDirection: "column", // Satır düzeninde sıralamak için flex yönlendirme
    justifyContent: "space-between",
    alignItems: "center",
  },
  spacing: {
    height: hp(1), // Boşluğun genişliği
  },
  cardsContainer: {
    alignItems: "center",
  },
  workoutsTitle: {
    fontSize: typography.title,
    color: colors.UiText,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  workoutsSubTitle: {
    fontSize: typography.cardSubtitle,
    opacity: 0.8,
    color: colors.UiText,
  },
  workoutsHeader: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  Foods: {
    marginLeft: "5%",
    fontSize: typography.title,
    color: colors.UiText,
    fontWeight: "900",
    marginBottom: 10,
  },
  ExtraView: {
    height: 150,
  },
  proteinBarImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
  },
  singleExercisesTitle: {
    marginLeft: "5%",
    fontSize: typography.title,
    color: colors.UiText,
    fontWeight: "900",
    marginVertical: 5,
  },
  singleExerciseView: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  singleExercises: {
    justifyContent: "center",
  },
  singleExercisesRow: {
    flexDirection: "row",
    columnGap: 10,
    marginVertical: 10,
    alignContent: "center",
    alignSelf: "center",
  },
});
