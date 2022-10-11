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
import { BatchPush } from '@batch.com/react-native-plugin';
import StackNavigator from './components/StackNavigator';
import { initSuggestions } from './data/SettingsDatasource';
import { Linking } from 'react-native';
import ArticlesDatasource from './data/ArticlesDatasource';

const App: FunctionComponent = () => {

  initSuggestions();

  //Ask for notification authorization
  BatchPush.requestNotificationAuthorization();

  // react-navigation deeplinks config
  const linking = {
    prefixes: ['batch://store.com'],
    config: {
      screens: {
        Article: 'articles/:article'
      }
    },
    async getInitialURL() {      
      const initialLink = await BatchPush.getInitialURL();
      if (initialLink) {
        return initialLink;
      }
      return await Linking.getInitialURL();;
    },
  };

  return (
    <RecoilRoot>
      <NavigationContainer linking={linking}>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
