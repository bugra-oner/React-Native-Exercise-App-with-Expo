import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView } from "react-native";
import React ,{useContext} from "react";
import FitnessCards from "../../components/Cards/FitnessCards";
import { FitnessItems } from "../../Context";

import Header from "../../components/views/Header";

import { useTranslation } from "react-i18next";


import StatsImage from "../../components/views/StatsImage";

const CoachScreen = () => {
  const {t} = useTranslation()

  const {
    minutes,
    calories,
    workout,
  } = useContext(FitnessItems);

  return (
    <>
    <Header title={t('Workouts')}/>
    <ScrollView>
      <View
        style={{
          padding: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 15,
            backgroundColor : '#6f759c',
            borderRadius: 10,
            padding : 10,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#000000",
                fontSize: 18,
              }}
            >
              {workout}
            </Text>
            <Text style={{ color: "#000000", fontSize: 17, marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View>
          <View>
            <Text
              style={{
              textAlign: "center",
                fontWeight: "bold",
                color: "#000000",
                fontSize: 18,
              }}
            >
              {calories}
            </Text>
            <Text style={{ color: "#000000", fontSize: 17, marginTop: 6 }}>
              KCAL
            </Text>
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#000000",
                fontSize: 18,
              }}
            >
              {minutes}
            </Text>
            <Text style={{ color: "#000000", fontSize: 17, marginTop: 6 }}>
              MINS
            </Text>
          </View>
        </View>
        <FitnessCards />
        <StatsImage/>
      </View>
    </ScrollView>
    </>
  );
};

export default CoachScreen;

const styles = StyleSheet.create({});