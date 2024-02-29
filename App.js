import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/Stacks';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
}
