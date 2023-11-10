import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//styles import
import styles from "./StylesCustom";
//header import
import Header from "../../components/views/Header";
// spacing Button import from components
import SpacingButtons from "../../components/buttons/SpacingButton";

import { FitnessItems } from "../../Context";

//colors
import colors from "../../constants/colors";
import { hp } from "../../utils";

export default function Gender({ navigation }) {
  const { user, setUser } = useContext(FitnessItems);
  const [selectedButton, setSelectedButton] = useState([0, "Default"]);
  console.log("user gender", user.gender);

  useEffect(() => {
    async function fetchGender() {
      try {
        const gender = user.gender;
        switch (gender) {
          case "male":
            setSelectedButton([1, gender]);
            break;
          case "woman":
            setSelectedButton([2, gender]);
            break;
          case "other":
            setSelectedButton([3, gender]);
            break;
          default:
            // Varsayılan durum için bir işlem yapabilirsiniz
            break;
        }
      } catch (error) {
        console.error("Cinsiyet alınırken hata oluştu:", error);
      }
    }

    fetchGender();
  }, []);

  const RightIconOnPress = async () => {
    if (selectedButton[1] === "Default") {
      Alert.alert(
        "Cinsiyet",
        "Lütfen cinsiyet seçiniz",
        [
          {
            text: "Tamam",
            onPress: () => {
              null;
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (user.gender === selectedButton[1]) {
      Alert.alert("Cinsiyet", "Zaten bu cinsiyeti daha önce seçtiniz.");
    }

    try {
      // Mevcut kullanıcı bilgilerini al
      const existingUser = await AsyncStorage.getItem("user");
      const updatedUser = existingUser ? JSON.parse(existingUser) : {};

      // Yeni bilgileri ekleyin veya güncelleyin
      updatedUser.gender = selectedButton[1];
      // updatedUser.gender = gender; // Örneğin, cinsiyet bilgisi eklendiğinde
      console.log("test burasi çalışıyor mu..");
      // Güncellenmiş kullanıcı bilgilerini AsyncStorage'a ve Context'e kaydedin
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      // Hata işleme
      console.log("Async storage error:", error);
    }

    Alert.alert(
      "Cinsiyet",
      `Seçilen cinsiyet: ${selectedButton[1]}`,
      [
        {
          text: "Tamam",
          onPress: () => {
            null;
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Cinsiyet"
        LeftIcon="arrow-left"
        LeftIconOnPress={() => navigation.goBack()}
        RightIcon="check"
        RightIconOnPress={() => RightIconOnPress()}
        LeftIconSize={33}
        RightIconSize={28}
        RightIconColor={
          selectedButton[0] !== 0 && user.gender === selectedButton[1]
            ? "#828280"
            : colors.settingColors.selected
        }
      />
      <Text style={styles.HeaderText}>Cinsiyet</Text>
      <View style={styles.threeContainer}>
        <SpacingButtons
          text="Erkek"
          iconName="gender-male"
          style={[
            styles.Button,
            selectedButton[0] === 1 && {
              borderColor: colors.settingColors.selectedButton,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.settingColors.selectedButton,
              borderRadius: 19,
              backgroundColor: "white",
              height: hp(5),
            },
          ]}
          textStyle={[
            styles.ButtonText,
            selectedButton[0] === 1
              ? { color: colors.settingColors.selected }
              : { color: "black" },
          ]}
          iconStyle={styles.buttonRightIcon}
          iconSize={20}
          onPress={() =>
            setSelectedButton([1, "male"]) &&
            setRightIconColor(colors.settingColors.selected)
          }
          iconColor={
            selectedButton[0] === 1 ? colors.settingColors.selected : "black"
          }
        />
        <SpacingButtons
          text="Kadın"
          iconName="gender-female"
          style={[
            styles.Button,
            selectedButton[0] === 2 && {
              borderColor: colors.settingColors.selectedButton,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.settingColors.selectedButton,
              borderRadius: 20,
              backgroundColor: "white",
              height: hp(5),
              borderLeftRadius: 5,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            },
          ]}
          iconStyle={styles.buttonRightIcon}
          iconSize={22}
          textStyle={[
            styles.ButtonText,
            selectedButton[0] === 2
              ? { color: colors.settingColors.selected }
              : { color: "black" },
          ]}
          onPress={() => setSelectedButton([2, "woman"])}
          iconColor={
            selectedButton[0] === 2 ? colors.settingColors.selected : "black"
          }
        />
        <SpacingButtons
          text="Diğer"
          iconName="gender-non-binary"
          style={[
            styles.Button,
            { borderBottomWidth: 0 },
            selectedButton[0] === 3 && {
              borderColor: colors.settingColors.selectedButton,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.settingColors.selectedButton,
              borderRadius: 19,
              backgroundColor: "white",
              height: hp(5.1),
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            },
          ]}
          iconStyle={styles.buttonRightIcon}
          iconSize={20}
          textStyle={[
            styles.ButtonText,
            selectedButton[0] === 3
              ? { color: colors.settingColors.selected }
              : { color: "black" },
          ]}
          onPress={() => setSelectedButton([3, "other"])}
          iconColor={
            selectedButton[0] === 3 ? colors.settingColors.selected : "black"
          }
        />
      </View>
    </View>
  );
}
