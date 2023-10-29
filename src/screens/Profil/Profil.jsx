import { Text, View, Image } from "react-native";
import React from "react";
import SpacingButton from "../../components/buttons/SpacingButton";
import Header from "../../components/views/Header";

import { navigate } from "../../navigation/navigationRef";
import styles from "./styles";

import { useTranslation } from "react-i18next";

import useFlashMessage from "../../hooks/FlashMessage";

export default function Profil({ navigation }) {
  const { t } = useTranslation();

  const { showFlashMessage } = useFlashMessage();

  const handleShowMessage = async () => {
    showFlashMessage(
      `${t("DevelopmentInProgressTitle")}`,
      `${t("DevelopmentInProgress")}`,
      "warning"
    );
  };

  return (
    <>
      <Header
        title={t("PersonalInformation")}
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => navigate("Notifications")}
        RightIcon="bell-outline"
        LeftIconSize={33}
      />
      <View style={styles.container}>
        <Text style={styles.HeaderText}>{t("PersonelI")}</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            special={true}
            specialStyle={styles.specialStyle}
            text={t("Name")}
            style={styles.Button}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigate("Name")}
          />
          <SpacingButton
            text={t("Gender")}
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigate("Gender")}
          />
        </View>
        <Text style={styles.HeaderText}>{t("Status")}</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            text={t("Languages")}
            style={styles.Button}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigate("Languages")}
          />
          <SpacingButton
            text={t("Notifications")}
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigate("Notifications")}
          />
        </View>
        <Text style={styles.HeaderText}>{t("Other")}</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            text={t("ReportSystem")}
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            // onPress={() => navigate("Report")}
            onPress={() => handleShowMessage()}
          />
          <SpacingButton
            text={t("Policy")}
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            onPress={() => navigate("Policy")}
          />
        </View>
        <View></View>
        <View style={styles.VersionContainer}>
          <Image
            source={require("../../assets/version.jpg")}
            style={styles.Logo}
          />
          <Text style={styles.Version}>{t("Version")} 1.3.0</Text>
        </View>
      </View>
    </>
  );
}
