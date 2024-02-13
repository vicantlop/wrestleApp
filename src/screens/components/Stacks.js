import Login from '../Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';

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
          name="Main"
          component={Tabs}
          options={
            {
              headerShown: false,
            }
          }
        />
      </Stack.Navigator>
  );
}
