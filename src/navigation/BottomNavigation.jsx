

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../screens/Home/HomeScreen';
import Statistic from '../screens/Statistic/Statistics'


import Profil from '../screens/Profil/Profil'
import Workout from '../screens/Workouts/Workout'
import History from '../screens/History'

import Workouts from '../screens/Workouts/Workouts'
import LevelSelector from '../screens/LevelSelector'


import UpperBodyScreen from '../screens/Workouts/UpperBody';
import BMICalculator from '../screens/BMICalculator';
import Graph from '../screens/Center/Graph';
import HealthCalculator from '../screens/HealthCalculator';
import Test from '../screens/Profil/Test';
import LowerBody from '../screens/Workouts/LowerBody';

import WaterIntakeCalculator from '../screens/WaterIntakeCalculator';
import CenterButton from '../components/CustomBottomTabBar';
import CustomTabIcon from '../components/CustomTabIcon';
import Name from '../screens/Profil/Name';
import Gender from '../screens/Profil/Gender';
import ReportSystem from '../screens/Profil/ReportSystem';
import Languages from '../screens/Profil/SelectLanguages';
import Notifications from '../screens/Profil/Notifications';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomStackNavigator(){
    return(
        <Stack.Navigator
        screenOptions={{
          headerShown: false // Tüm ekranlarda başlığı gizle
        }}
        >
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
                 <Stack.Screen name="UpperBody" component={UpperBodyScreen} />
                 <Stack.Screen name="BMI" component={BMICalculator}/>
                 <Stack.Screen name='HealthCalculator' component={HealthCalculator} />
                 <Stack.Screen name= 'Test' component={Test} />
                 <Stack.Screen name= 'LowerBody' component={LowerBody} />
                 <Stack.Screen name="Workouts" component={Workouts} />
                 <Stack.Screen  
                 name="Name" component={Name} />
                 <Stack.Screen name="Gender" component={Gender} />
                 <Stack.Screen name="Report" component={ReportSystem} />
                 <Stack.Screen name="Languages" component={Languages} />
                 <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    )
}

export const BottomNavigator = ({navigation}) => {
    return (
        <Tab.Navigator
        screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#484F88',
          borderTopColor: 'transparent',
          height: Platform.OS == 'ios' ? 90 : 60,
          paddingTop: 5,
          paddingBottom: Platform.OS == 'ios' ? 25 : 5,
          borderEndStartRadius: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarHideOnKeyboard: true,
        backgroundColor: '#ffff',
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
                    <Ionicons name="stats-chart" size={size} color={color} /> 
          )}}
/>
            {/* Ortadaki sekmeyi burada ekliyoruz */}
            <Tab.Screen
            name="Center"
            component={Graph} // Boş bir component
            options={{
              tabBarLabel:"",
              tabBarIcon: ({color}) => (
                <CenterButton color={color}
                /> 
              ),
            }}
      />
                      <Stack.Screen
                        options={{
                            tabBarLabel:'asdfasfsd',
                            headerShown: false,
                            tabBarIcon:({color,size}) => (
                            <Ionicons name="man" size={size} color={color} /> 
                            )    
                         }}
                        name='Graph' component={Test} /> 
                    <Stack.Screen name="Profil" component={Profil}
                        options={{
                        tabBarLabel:"Profil",
                        headerShown: false,
                        tabBarIcon:({color,size}) => (
                            <Ionicons name="man" size={size} color={color} /> 
                            )    
                         }}
                        />
        </Tab.Navigator>
    );
  };

  
  
