import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

const AppNavigator = createSwitchNavigator({
  Login,
  Main
});

export default createAppContainer(AppNavigator);
