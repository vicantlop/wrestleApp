import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Register from '../screens/Register';

export default function Stacks() {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={
            {
              headerShown: false,
            }
          }
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={
            {
              headerShown: false,
            }
          }
        />
        <Stack.Screen 
          name="Main"
          component={Tabs}
          options={
            {
              headerShown: false,
              detachPreviousScreen: true,
            }
          }
        />
      </Stack.Navigator>
  );
}
