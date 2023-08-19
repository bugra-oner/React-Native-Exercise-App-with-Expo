import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';

import styles from './settingsStyles';

import Header from '../../components/views/Header';

import SpacingButtons from '../../components/buttons/SpacingButton';

export default function ReportSystem({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState(null);
  const [text2, onChangeText2] = useState(null);
  const [ModalReporting, setModalReporting] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [ModalOther, setModalOther] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        title="Bildir"
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => null}
        LeftIcon="chevron-left"
        LeftIconSize={33}
        RightIcon="alert-octagon"
      />
      <Text style={styles.HeaderText}>Görüş veya Hata bildir</Text>
      <View style={styles.AccountContainer}>
        <SpacingButtons
          text="Görüş bildir"
          style={styles.Button}
          textStyle={styles.ButtonText}
          iconName="chevron-right"
          iconStyle={styles.iconStyle}
          onPress={() => {
            setModalReporting(true);
          }}
        />
        <SpacingButtons
          text="Hata bildir"
          style={styles.LastButton}
          textStyle={styles.ButtonText}
          iconName="chevron-right"
          iconStyle={styles.iconStyle}
          onPress={() => {
            setModalError(true);
          }}
        />
      </View>
      <View style={styles.freezeAccountView}>
        <SpacingButtons
          text="Diğer"
          style={styles.LastButton}
          textStyle={styles.ButtonText}
          iconName="chevron-right"
          iconStyle={styles.iconStyle}
          onPress={() => {
            setModalOther(true);
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalReporting}
        onRequestClose={() => {
          setModalReporting(!ModalReporting);
        }}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalText}>Görüş bildir</Text>
            <Text style={ModalStyles.modalSubText}>
              AURA'yı nasıl senin için daha güzel bir yer haline getirebiliriz?
            </Text>
            <TextInput
              style={ModalStyles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Bize genel görüşlerinden bahset..."
              placeholderTextColor="#000000"
              multiline
              numberOfLines={4}
            />
            <SpacingButtons
              text="Gönder"
              style={styles.Button}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalReporting(!ModalReporting);
              }}
            />
            <SpacingButtons
              text="İptal"
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalReporting(!ModalReporting);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalError}
        onRequestClose={() => {
          setModalError(!ModalError);
        }}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalText}>Hata bildir</Text>
            <Text style={ModalStyles.modalSubText}>
              Bu sorunu hangi işlem sırasında yaşadığını açıklar mısın?
            </Text>
            <TextInput
              style={ModalStyles.input}
              onChangeText={onChangeText2}
              value={text2}
              placeholder="Bize yaşadığın sorunlardan bahset..."
              placeholderTextColor="#000000"
              multiline
              numberOfLines={4}
            />
            <SpacingButtons
              text="Gönder"
              style={styles.Button}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalError(!ModalError);
              }}
            />
            <SpacingButtons
              text="İptal"
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalError(!ModalError);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalOther}
        onRequestClose={() => {
          setModalOther(!ModalOther);
        }}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalText}>Diğer</Text>
            <Text style={ModalStyles.modalSubText}>Sana nasıl yardımcı olabiliriz?</Text>
            <TextInput
              style={ModalStyles.input}
              onChangeText={onChangeText2}
              value={text2}
              placeholderTextColor="#000000"
              placeholder="Bize düşüncelerinden bahset..."
              multiline
              numberOfLines={4}
            />
            <SpacingButtons
              text="Gönder"
              style={styles.Button}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalOther(!ModalOther);
              }}
            />
            <SpacingButtons
              text="İptal"
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalOther(!ModalOther);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const ModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalView: {
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalText: {
    marginBottom: 9,
    textAlign: 'center',
    fontSize: 19,
    color: '#1A1624',
  },
  input: {
    height: 100,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',
   
    fontSize: 13,
    color: '#000000',
    opacity: 0.6,
    textAlignVertical: 'top',
  },
  modalSubText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#1A1624',
    maxWidth: 300,
    lineHeight: 18,
  },
});
