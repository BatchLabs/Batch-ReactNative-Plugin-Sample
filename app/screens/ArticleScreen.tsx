import {BatchEventAttributes} from '@batch.com/react-native-plugin';
import React, {FunctionComponent} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {cartArticlesState} from '../recoil/cart/atoms';
import Toast from 'react-native-simple-toast';
import ArticlesDatasource from '../data/ArticlesDatasource';
import {BatchProfile} from '@batch.com/react-native-plugin/dist/BatchProfile';

const Article: FunctionComponent = ({route}) => {
  const cartArticles = useRecoilValue(cartArticlesState);
  const setCartArticles = useSetRecoilState(cartArticlesState);

  // Get article from props
  let article = route.params.article;

  // Handle param from deeplink
  if (typeof article === 'string') {
    article = ArticlesDatasource.find(obj => obj.name === article);
  }

  // Checking if this article has been already added in cart
  const alreadyInCart = cartArticles.includes(article);

  const onClick = () => {
    // Tracking batch event
    BatchProfile.trackEvent(
      'ADD_TO_CART',
      new BatchEventAttributes().put('$label', article.name),
    );

    // Adding article to the store
    setCartArticles(oldCartArticles => [...oldCartArticles, article]);

    // Showing toast message
    Toast.show(`Added ${article.name} to the cart`, Toast.SHORT);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.picture} source={article.picture} />
        <Text style={styles.title}>{article.name}</Text>
        <Text style={styles.price}>{article.price}€</Text>
      </View>
      <View style={{margin: 20}}>
        <Button
          title={alreadyInCart ? 'Add one more to cart' : 'Add to cart'}
          onPress={onClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
  },
  picture: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default Article;
