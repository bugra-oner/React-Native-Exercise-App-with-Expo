import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import UpdateInput from "../inputs/UpdateInput";
import CustomPicker from "../CustomPicker";

import { useTranslation } from "react-i18next";
import GradientInput from "../inputs/GradientInput";
import { wp, hp, fp } from "../../utils";

const EditProfileModal = ({ visible, onClose, onSave }) => {
  const { t } = useTranslation();

  const [gender, setGender] = useState("male");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");

  const [name, setName] = useState("");
  const [dailyCalories, setDailyCalories] = useState(null);
  const [dailyWater, setDailyWater] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);

  // Burada, kullanıcı bilgilerini düzenlemek için state'ler ve fonksiyonlar eklenebilir
  const genders = [
    { label: t("Male"), value: "male" },
    { label: t("Female"), value: "female" },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Kullanıcı Bilgilerini Düzenle</Text>
          <UpdateInput />
          <UpdateInput />
          <UpdateInput />

          {/* Kullanıcı bilgilerini düzenlemek için gerekli input alanları eklenebilir */}
          <GradientInput
            style={styles.input}
            placeholder={t("NameInput")}
            onChangeText={(text) => setName(text)}
            keyboardType="default"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputKg")}
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputCm")}
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputOld")}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <CustomPicker
            options={genders}
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onSave}
          >
            <Text style={styles.textStyle}>{t("Save")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: hp(3),
  },
  buttonClose: {
    backgroundColor: "#484F88",
  },
  textStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    padding: hp(0.4),
  },
  modalText: {
    marginBottom: hp(1),
    textAlign: "center",
  },
  input: {
    width: wp(50),
    textAlign: "center",
  },
});

export default EditProfileModal;
