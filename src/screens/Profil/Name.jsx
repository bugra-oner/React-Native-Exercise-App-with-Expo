import { Text, View, Alert } from "react-native";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//label input
import UpdateInput from "../../components/inputs/UpdateInput";
import Header from "../../components/views/Header";

import { FitnessItems } from "../../Context";

//styles import
import styles from "./StylesCustom";

export default function Name({ navigation }) {
  const { user, setUser } = useContext(FitnessItems);
  const [name, setName] = useState(user.name ? user.name : "");
  const [RightIconColor, setRightIconColor] = useState("#828280");
  const [firstName, setFirstName] = useState("");

  console.log(user);

  const nameChange = () => {
    if (name !== firstName) {
      setRightIconColor("#00BFA6");
    } else {
      setRightIconColor("#828280");
    }
  };

  const setRightIconOnPress = async () => {
    if (name !== firstName) {
      if (name.length < 2) {
        alert("İsim en az 2 karakter olmalıdır.");
        return;
      }
      if (typeof name !== "string") {
        alert("İsim sadece string değerler alabilir.");
        return;
      }
      if (/\d/.test(name)) {
        alert("İsim sayısal değer içermemeli.");
        return;
      }
      setRightIconColor("#828280");

      // Async storage'a ismi kaydetmek

      try {
        // Mevcut kullanıcı bilgilerini al
        const existingUser = await AsyncStorage.getItem("user");
        const updatedUser = existingUser ? JSON.parse(existingUser) : {};

        // Yeni bilgileri ekleyin veya güncelleyin
        updatedUser.name = name;
        // updatedUser.gender = gender; // Örneğin, cinsiyet bilgisi eklendiğinde

        // Güncellenmiş kullanıcı bilgilerini AsyncStorage'a ve Context'e kaydedin
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        // Hata işleme
        //
      }

      setFirstName(name);
    } else {
      setRightIconColor("#828280");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={"İsim"}
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => setRightIconOnPress()}
        LeftIcon="chevron-left"
        RightIcon="check"
        RightIconColor={RightIconColor}
        LeftIconSize={33}
        RightIconSize={28}
      />
      <Text style={styles.HeaderText}>İsim</Text>
      <UpdateInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setRightIconColor("#00BFA6");
        }}
        onEndEditing={() => nameChange()}
        maxLength={21}
      />
    </View>
  );
}
