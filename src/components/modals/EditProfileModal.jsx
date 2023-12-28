import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import UpdateInput from "../inputs/UpdateInput";
import CustomPicker from "../CustomPicker";

import { useTranslation } from "react-i18next";
import GradientInput from "../inputs/GradientInput";
import { wp, hp, fp } from "../../utils";
import CustomIcon from "../CustomIcon";

const EditProfileModal = ({ visible, onClose, onSave, onInputChange }) => {
  const { t } = useTranslation();

  // Burada, kullanıcı bilgilerini düzenlemek için state'ler ve fonksiyonlar eklenebilir

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.CloserView} onPress={onClose}>
            <CustomIcon
              name={"close"}
              color="black"
              marginHorizontal={wp(0)}
              marginRight={wp(0)}
              size={fp(2.5)}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>Kullanıcı Bilgilerini Düzenle</Text>

          {/* Kullanıcı bilgilerini düzenlemek için gerekli input alanları eklenebilir */}
          <GradientInput
            style={styles.input}
            placeholder={t("InputKg")}
            onChangeText={(text) => onInputChange("weight", text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputCm")}
            onChangeText={(text) => onInputChange("height", text)}
            keyboardType="numeric"
          />
          <GradientInput
            style={styles.input}
            placeholder={t("InputOld")}
            onChangeText={(text) => onInputChange("age", text)}
            keyboardType="numeric"
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
    padding: hp(1),
  },
  modalText: {
    marginBottom: hp(3),
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: wp(50),
    textAlign: "center",
  },
  CloserView: {
    alignSelf: "flex-end",
    justifyContent: "center",
    backgroundColor: "#484F88",
    borderRadius: 15,
    top: hp(-2),
    right: wp(-4),
    height: hp(3),
    width: wp(6),
    alignItems: "center",
  },
});

export default EditProfileModal;
