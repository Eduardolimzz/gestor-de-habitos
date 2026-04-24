import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Progress from './src/screens/Progress';
import GoalsProgress from './src/screens/GoalsProgress';
import GoalDetails from './src/screens/GoalDetails';
import Home from './src/screens/Home';
import AllHabits from './src/screens/AllHabits';

// ── Novas telas ──────────────────────────────────────────────
import HabitAdd from './src/screens/HabitAdd';
import ExcluirConfirm from './src/screens/ExcluirConfirm';
import ExcluidoSucesso from './src/screens/ExcluidoSucesso';
// ────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Progress" component={Progress} />
        <Stack.Screen name="GoalsProgress" component={GoalsProgress} />
        <Stack.Screen name="GoalDetails" component={GoalDetails} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AllHabits" component={AllHabits} />

        {/* Novas telas */}
        <Stack.Screen name="HabitAdd" component={HabitAdd} />
        <Stack.Screen name="ExcluirConfirm" component={ExcluirConfirm} />
        <Stack.Screen name="ExcluidoSuce" component={ExcluidoSucesso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}