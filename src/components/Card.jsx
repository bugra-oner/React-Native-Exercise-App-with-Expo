import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Card = ({
  title,
  icon,
  subtitle,
  contentText,
  bottomTexts,
  subTexts,
  subTextIcons,
  additionalText,
  additionalIcon,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#575ea8', '#83c29f']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.contentText}>{contentText}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTextContainer}>
            {bottomTexts.map((bottomText, index) => (
              <View style={styles.bottomTextItem} key={index}>
                {/* <Ionicons name={bottomText.iconSize} size={1} color="#fff" /> */}
                <Text style={styles.bottomText}>{bottomText.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.subTextsContainer}>
          {subTexts.map((subText, index) => (
            <View style={styles.subTextItem} key={index}>
              <Ionicons name={subTextIcons[index]} size={14} color="#fff" />
              <Text style={styles.subText}>{subText}</Text>
            </View>
          ))}
        </View>
        <View style={styles.additionalContainer}>
          <Text style={styles.additionalText}>{additionalText}</Text>
          <Ionicons name={additionalIcon} size={16} color="#fff" />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignSelf: "center",
    width: "94%"
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 15,
    elevation: 5,
    width : "100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: "5%",
  },
  bottomContainer: {
    marginBottom: 5,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
    marginVertical: "2%"
  },
  bottomTextItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 13,
    color: '#fff',
    
  },
  subTextsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTextItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 3,
  },
  additionalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  additionalText: {
    fontSize: 12,
    color: '#fff',
    marginRight: 5,
  },
});

export default Card;

