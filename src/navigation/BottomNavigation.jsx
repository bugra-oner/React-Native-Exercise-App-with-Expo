import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../screens/Home/HomeScreen";
import Statistic from "../screens/Statistic/Statistics";

import Profil from "../screens/Profil/Profil";
import Workout from "../screens/Workouts/Workout";
import History from "../screens/History";

import Workouts from "../screens/Workouts/Workouts";
import LevelSelector from "../screens/Home/LevelSelector";

import UpperBodyScreen from "../screens/Workouts/UpperBody";
import BMICalculator from "../screens/BMICalculator";
import Graph from "../screens/Center/Graph";
import HealthCalculator from "../screens/HealthCalculator";

import LowerBody from "../screens/Workouts/LowerBody";

import CenterButton from "../components/CustomBottomTabBar";
import Name from "../screens/Profil/Name";
import Gender from "../screens/Profil/Gender";
import ReportSystem from "../screens/Profil/ReportSystem";
import Languages from "../screens/Profil/SelectLanguages";
import Notifications from "../screens/Profil/Notifications";
import CoachScreen from "../screens/Coach/CoachScreen";

import Info from "../screens/Informations/Info";
import Policy from "../screens/Policy";
import SplashScreen from "../screens/SplashScreen";

import PushUp from "../screens/Single/PushUp";
import SitUps from "../screens/Single/SitUps";
import Squad from "../screens/Single/Squad";
import Triceps from "../screens/Single/Triceps";

//Discover Screen
import Discover from "../screens/Discover/Discover";
import ArticleDetail from "../screens/Discover/ArticleDetails";

/* */
import RestScreen from "../screens/Coach/RestScreen";
import FitScreen from "../screens/Coach/FitScreen";
import WorkOutScreen from "../screens/Coach/WorkoutScreen";

import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Tüm ekranlarda başlığı gizle
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen
        name="BottomNavigator"
        options={{ headerShown: false }}
        initialRouteName="BottomNavigator"
        component={BottomNavigator}
      />
      <Stack.Screen name="LevelSelector" component={LevelSelector} />
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="UpperBody" component={UpperBodyScreen} />
      <Stack.Screen name="BMI" component={BMICalculator} />
      <Stack.Screen name="HealthCalculator" component={HealthCalculator} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="LowerBody" component={LowerBody} />
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Report" component={ReportSystem} />
      <Stack.Screen name="Languages" component={Languages} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="BottomNavigatorTest" component={BottomNavigator} />
      <Stack.Screen name="PushUps" component={PushUp} />
      <Stack.Screen name="SitUps" component={SitUps} />
      <Stack.Screen name="Squad" component={Squad} />
      <Stack.Screen name="Triceps" component={Triceps} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen name="Rest" component={RestScreen} />
      <Stack.Screen name="Fit" component={FitScreen} />
      <Stack.Screen name="WorkoutScreen" component={WorkOutScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
    </Stack.Navigator>
  );
}

export const BottomNavigator = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#FAF8F1",
        tabBarStyle: {
          backgroundColor: "#484F88",
          borderTopColor: "transparent",
          height: Platform.OS == "ios" ? 90 : 60,
          paddingTop: 5,
          paddingBottom: Platform.OS == "ios" ? 25 : 5,
          borderEndStartRadius: 10,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t("Homepage"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> // Expo'nun yerleşik ikonunu kullanıyoruz
          ),
        }}
      />
      {/* Ortadaki sekmeyi burada ekliyoruz */}
      <Tab.Screen
        name="CoachScreen"
        component={CoachScreen}
        options={{
          tabBarLabel: t("Coach"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Graph"
        component={Graph} // Boş bir component
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <CenterButton color={color} />,
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: t("Discover"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Stack.Screen name="Profil" component={Profil}
                        options={{
                        tabBarLabel:"Profil",
                        headerShown: false,
                        tabBarIcon:({color,size}) => (
                            <Ionicons name="man" size={size} color={color} /> 
                            )    
                         }}
                        /> */}
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: t("Profil"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
