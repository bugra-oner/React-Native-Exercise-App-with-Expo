import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTranslation } from "react-i18next";

import LinearView from "../../components/views/LinearView";

import { fp, hp, wp } from "../../utils";

import RestButton from "../../components/buttons/RestButton";
import GradientButton from "../../components/buttons/GradientButton";
import TextSection from "../../components/TextSection";

const RestScreen = ({}) => {
  const { t } = useTranslation();
  const route = useRoute();
  //console.log(route.params);
  let index = route.params.index;
  let current = route.params.current;
  let length = route.params.length;
  // console.log(current);
  const navigation = useNavigation();
  let timer = 0;
  const calculateRestTime = (index) => {
    if (index === 0) {
      return 15; // Index 0 için dinlenme süresi
    } else if (index >= 1 && index <= 8) {
      return 25 + index * 3; // Index 1-10 arası için dinlenme süresi
    } else if (index === length - 1) {
      return 30;
    } else {
      // Diğer durumlar için varsayılan dinlenme süresi
      return 15 + (index + 1) * 2;
    }
  };
  const [timeLeft, setTimeLeft] = useState(calculateRestTime(index));
  const [extraTime, setExtraTime] = useState(0);
  // İlerlemenin yüzdesini hesaplamak için bir işlev
  const calculateProgress = () => {
    // * Uygulama açıldığında manuel olarak dinlenme saniyesini hesapla daireye böl
    const initialRestTime = calculateRestTime(index);
    return (timeLeft / initialRestTime) * 100;
  };
  const [fill, setFill] = useState(calculateProgress());
  // Ekstra süre eklemek için işlev
  const addExtraTime = () => {
    const newTime = timeLeft + 20;
    if (newTime > 0) {
      setTimeLeft(newTime);
      setExtraTime(20);
    }
  };
  const extraTimeCircularProgress = () => {};
  //console.log(timeLeft);
  const startTime = () => {
    if (timeLeft <= 0) {
      navigation.goBack();
      // Dinlenme süresi bittiğinde navigasyonu burada tetikleyebilirsiniz.
    } else {
      timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          // * Fill func is here..
          setFill(
            extraTime === 0
              ? calculateProgress(newTimeLeft)
              : extraTimeCircularProgress
          );
          return newTimeLeft;
        });
        startTime();
      }, 1000);
    }
  };
  useEffect(() => {
    startTime();
    // Clean up
    return () => clearTimeout(timer);
  }, [timeLeft]); // timeLeft bağımlılığını izle

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearView
        colorsOne="#cbbee9d4"
        colorsTwo="#a7a7a7"
        startOne={0}
        startTwo={0}
        endOne={0}
        endTwo={1}
        style={{ flex: 1 }}
      >
        <View style={styles.gifView}>
          <Image
            // resizeMode="contain"
            source={current.image}
            style={styles.image}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TextSection
            styleTitle={styles.Title}
            styleContent={styles.Content}
            title={t("NextMovement")}
            content={current.name}
          />
          <Text
            style={{
              fontSize: fp(2.7),
              fontWeight: "800",
              bottom: hp(3.8),
              left: wp(86),
              position: "relative",
            }}
          >
            {current.sets}x
          </Text>
          <View style={styles.middleText}>
            {/* <Text
              style={{
                fontSize: fp(4.4),
                fontWeight: "800",
                marginTop: hp(4),
                textAlign: "center",
              }}
            >
              {t("BreakTime")}
            </Text>
            <Text
              style={{
                fontSize: fp(6),
                fontWeight: "bold",
                textAlign: "center",
                marginTop: hp(1),
              }}
            >
              {timeLeft}s
            </Text> */}
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={fill}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              // onAnimationComplete={() => //console.log("onAnimationComplete")}
            >
              {(fill) => (
                <View>
                  <Text>
                    {fill}
                    {"\n"}
                    {timeLeft}
                  </Text>
                  {/* İçeriği burada göstermek istediğiniz şekilde düzenleyin */}
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.bottomView}>
            <GradientButton
              onPress={addExtraTime}
              title={"+20"}
              style={styles.GradientButton}
              textStyle={styles.textStyleGradient}
            />
            <RestButton
              title={t("SkipRest")}
              onPress={() => navigation.goBack()}
              style={styles.RestButton}
            />
          </View>
        </View>
      </LinearView>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({
  gifView: {
    alignSelf: "center",
    overflow: "hidden", // GIF içeriğini çerçevenin içine sığdırmak için
    width: wp(96),
    height: hp(41),
    borderRadius: 20,
    marginTop: hp(2.5),
    alignItems: "center",
  },
  image: {
    width: wp(96),
    height: hp(41),
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  RestButton: {
    width: wp(50),
    alignSelf: "center",
  },
  GradientButton: {
    width: wp(50),
    alignSelf: "center",
    marginVertical: hp(1.8),
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  textStyleGradient: {
    fontSize: fp(3),
    color: "white",
    fontWeight: "bold",
    padding: hp(1),
  },
  bottomContainer: {
    flex: 1,
  },
  middleText: {
    alignItems: "center",
    alignSelf: "center",
  },
  bottomView: {
    position: "absolute",
    // backgroundColor: "#000000",
    alignSelf: "center",
    marginBottom: hp(0.5),
    bottom: hp(2),
  },
  Title: {
    marginLeft: wp(8),
    fontSize: fp(4),
    fontWeight: "bold",
  },
  Content: {
    marginLeft: wp(8.5),
    fontSize: fp(2.3),
    fontWeight: "700",
  },
});
