/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { BatchPush } from '@bam.tech/react-native-batch';
import StackNavigator from './components/StackNavigator';
import { initSuggestions } from './data/SettingsDatasource';

const App: FunctionComponent = () => {

  initSuggestions();

  //Ask for notification authorization
  BatchPush.requestNotificationAuthorization();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
