import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";

//Utils
import { wp, hp, fp } from "../../utils";
import { navigate } from "../../navigation/navigationRef";

// Component
import TextCard from "../../components/views/TextCard";
import ProfileView from "../../components/views/ProfileView";
import SpacingButton from "../../components/buttons/SpacingButton";
import { useTranslation } from "react-i18next";
import { FitnessItems } from "../../Context";

//Modal Components
import EditProfileModal from "../../components/modals/EditProfileModal";
import PremiumCard from "../../components/PremiumCard";

export default function Profil() {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { minutes, calories, workout, user } = useContext(FitnessItems);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const saveModal = () => {
    // Kaydetme işlemleri burada yapılır
    closeModal();
  };

  console.log(user);

  return (
    <View>
      <ProfileView onPress={() => navigate("Settings")} />
      <View style={styles.topHeaderView}>
        <TextCard title="180 cm" subTitle="Boy" />
        <TextCard title="52 kg" subTitle="Kilo" />
        <TextCard title="27" subTitle="Yaş" />
      </View>
      {/* <PremiumCard /> */}
      <EditProfileModal
        visible={isModalVisible}
        onClose={closeModal}
        onSave={saveModal}
      />

      <View style={styles.AccountContainer}>
        <SpacingButton
          special={true}
          specialStyle={styles.specialStyle}
          text={t("Settings")}
          style={styles.Button}
          textStyle={styles.ButtonText}
          iconName="chevron-right"
          iconStyle={styles.iconStyle}
          label="Değiştir"
          labelStyle={styles.labelStyle}
          threeText={styles.threeText}
          onPress={() => navigate("Settings")}
        />
        <SpacingButton
          special={true}
          specialStyle={styles.specialStyle}
          text={t("Settings")}
          style={styles.Button}
          textStyle={styles.ButtonText}
          iconName="chevron-right"
          iconStyle={styles.iconStyle}
          label="Değiştir"
          labelStyle={styles.labelStyle}
          threeText={styles.threeText}
          onPress={() => navigate("Settings")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: wp(94),
    marginVertical: hp(5),
  },
  container: {
    flex: 1,
  },
  HeaderText: {
    fontSize: 18,
    marginTop: hp(2.5),
    marginLeft: wp(6.5),
    color: "black",
  },
  Button: {
    width: wp(90),
    height: hp(4.6),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#cdd3d6",
    borderBottomWidth: wp(0.26),
    borderStyle: "solid",
    alignSelf: "center",
  },
  ButtonText: {
    color: "black",
    fontSize: fp(1.8),
  },
  LastButton: {
    width: wp(90),
    height: hp(4.6),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelStyle: {
    color: "black",
    fontSize: fp(1.5),
    alignSelf: "center",
    opacity: 0.5,
  },
  AccountContainer: {
    backgroundColor: "#F5F5FF",
    width: wp(90),
    height: hp(10),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(2.3),
    shadowColor: "black",
    opacity: 0.64,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  iconStyle: {
    marginRight: wp(1.6),
  },
  threeText: {
    flexDirection: "row",
    width: wp(18),
    justifyContent: "space-between",
  },
  freezeAccountView: {
    width: wp(90),
    height: hp(4.8),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: hp(5),
    shadowColor: "black",
    opacity: 0.67,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  VersionContainer: {
    position: "absolute", // Diğer içeriklerden bağımsız konumlandırma
    bottom: 50, // İsteğe bağlı, alt kenar boşluğu
    alignSelf: "center", // Yatayda ortala
    alignItems: "center", // Yatayda ortala
  },
  Logo: {
    width: wp(16),
    height: hp(9),
    borderRadius: 20,
    marginVertical: 5,
  },
  Version: {
    alignSelf: "center",
    fontWeight: "700",
    fontSize: fp(2),
  },
});
