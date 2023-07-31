import { View, Text, Button } from 'react-native';

export const StartScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Spordan ne kadar deneyiminiz var?</Text>
      <Button
        title="Hiç spor geçmişim yok"
        onPress={() => navigation.navigate('LevelSelector', { level: 1, difficulty: 'easy' })}
      />
      <Button
        title="Biraz fitim"
        onPress={() => navigation.navigate('LevelSelector', { level: 3, difficulty: 'medium' })}
      />
      <Button
        title="Deneyimliyim"
        onPress={() => navigation.navigate('LevelSelector', { level: 5, difficulty: 'hard' })}
      />
    </View>
  );
};
