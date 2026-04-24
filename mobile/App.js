import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/context/AuthContext';

import Login from './src/screens/login/Login';
import Signup from './src/screens/login/Signup';
import Progress from './src/screens/progress/Progress';
import GoalsProgress from './src/screens/modal/GoalsProgress';
import GoalDetails from './src/screens/modal/GoalDetails';
import Home from './src/screens/home/Home';
import AllHabits from './src/screens/habits/AllHabits';
import Configuracoes from './src/screens/configuration/Configuracoes';
import Conta from './src/screens/configuration/Conta';
import SobreOApp from './src/screens/configuration/SobreOApp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Progress" component={Progress} />
          <Stack.Screen name="GoalsProgress" component={GoalsProgress} />
          <Stack.Screen name="GoalDetails" component={GoalDetails} />
          <Stack.Screen name="AllHabits" component={AllHabits} />
          <Stack.Screen name="Configuracoes" component={Configuracoes} />
          <Stack.Screen name="Conta" component={Conta} />
          <Stack.Screen name="SobreOApp" component={SobreOApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
