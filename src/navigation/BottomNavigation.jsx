
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../screens/HomeScreen';
import Statistic from '../screens/Statistic/Statistics'


import Languages from '../screens/Settings/Languages'
import Settings from '../screens/Settings/Settings'
import Workout from '../screens/Workouts/Workout'
import History from '../screens/History'
import Test from '../screens/Test'
import Workouts from '../screens/Workouts'
import LevelSelector from '../screens/LevelSelector'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomStackNavigator(){
    return(
        <Stack.Navigator
        screenOptions={{
            
        }}>
            <Stack.Screen
            name="BottomNavigator"
            options={{headerShown: false}}
            initialRouteName="BottomNavigator"
            component={BottomNavigator}
            />
             <Stack.Screen name="LevelSelector" component={LevelSelector} />
                 <Stack.Screen 
                 name="Workout" component={Workout} />
                 <Stack.Screen name="History" component={History} />
                 <Stack.Screen name="TestScreen" component={Test} />
        </Stack.Navigator>
    )
}

    
export const BottomNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#1A1624',
          borderTopColor: 'transparent',
          height: Platform.OS == 'ios' ? 75 : 60,
          paddingTop: 5,
          paddingBottom: Platform.OS == 'ios' ? 20 : 5,
          borderTopLeftRadius: 17,
          borderTopRightRadius: 17,
        },
        tabBarHideOnKeyboard: true,
        })}
      initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Ana Sayfa",
                    headerShown: false,
                    tabBarIcon:({color,size}) => (
                    <Ionicons name="home" size={size} color={color} /> // Expo'nun yerleşik ikonunu kullanıyoruz
          )}}/>
            <Tab.Screen
             name="Statistic"
             component={Statistic}
             options={{
                tabBarLabel:"İstatistik",
                headerShown:false,
                tabBarIcon:({color,size}) => (
                    <Ionicons name="home" size={size} color={color} /> // Expo'nun yerleşik ikonunu kullanıyoruz
          )}}/>
                <Stack.Screen name="Workouts" 
                    options={{
                        tabBarLabel:"Antrenman",
                        headerShown: false,
                        tabBarIcon:({color,size}) => (
                            <Ionicons name="home" size={size} color={color}  />
                            )}}
                            component={Workouts}
                            />  
                <Stack.Screen name="Settings" component={Settings}
                    options={{
                        tabBarLabel:"Ayalar",
                        headerShown: false,
                        tabBarIcon:({color,size}) => (
                            <Ionicons name="home" size={size} color={color} /> 
                            )    
                         }}
                        />
                
           

        </Tab.Navigator>
    );
  };






