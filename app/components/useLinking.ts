import { useEffect } from 'react';
import { Linking } from 'react-native';
import { BatchPush } from '@bam.tech/react-native-batch';
import ArticlesDatasource from "../data/ArticlesDatasource";
import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

export const useLinking = (navigation: NavigationProp<ReactNavigation.RootParamList>) => {

  useEffect(() => {

    const handleDeepLink = (link: string) => {
      const params = link.split('/')
      const articleName = params[params.length - 1];
      const article = ArticlesDatasource.find(obj => obj.name === articleName);
      if(article){
        navigation.navigate('Article', { article: article })
      }
    }

    // Handle deeplink when app is not launched
    BatchPush.getInitialURL().then((url: string | null) => {
      if (url) {
        handleDeepLink(url)
      }
    });

    // Handle deeplink when app is running
    const listener = Linking.addEventListener('url', ({url}: { url: string }) => {
      if (url) {
        handleDeepLink(url)
      }
    });

    return function cleanup() {
      listener.remove();
    };
  }, []);
};
