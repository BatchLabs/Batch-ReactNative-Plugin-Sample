import { useNavigation } from "@react-navigation/core";
import React, { FunctionComponent, useLayoutEffect } from "react";
import { Button, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Article from "../models/Article";
import { cartArticlesState, cartAmountState } from "../recoil/cart/atoms";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BatchUser } from '@batch.com/react-native-plugin';

const ArticleItem: FunctionComponent<{ article: Article }> = ({ article }) => {
  return (
    <View style={styles.item}>
      <View style={styles.pre}>
        <Image
          style={styles.picture}
          source={article.picture}
        />
        <Text style={styles.title}>{article.name}</Text>
      </View>
      <Text style={styles.price}>{article.price}€</Text>
    </View>
  );
}

const EmptyContainer: FunctionComponent = () => {
  return (
    <View style={styles.empty}>
      <Icon name="shopping-cart" size={64} />
      <Text style={{ fontSize: 16 }}>Your cart is currently empty !</Text>
    </View>
  )

}

const Cart: FunctionComponent = () => {

  const setCartArticles = useSetRecoilState(cartArticlesState);
  const cartArticles = useRecoilValue(cartArticlesState);
  const cartAmount = useRecoilValue(cartAmountState);
  const navigation = useNavigation();

  const clearCart = () => {
    setCartArticles((oldCartArticles) => []);
  }

  const checkout = () => {
    BatchUser.trackEvent("CHECKOUT");
    BatchUser.trackTransaction(cartAmount, {});
    clearCart();
  };

  const renderItem = ({ item }: { item: Article }) => (
    <ArticleItem article={item} />
  );

  // Adding clear button to navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          size={28}
          style={{ margin: 10 }}
          onPress={clearCart}
          name="delete"
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={cartArticles}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={cartAmount == 0 && styles.contentContainer}
        keyExtractor={(item, index) => item.name + index}
        ListEmptyComponent={EmptyContainer}
      />
      <View style={{ margin: 20 }}>
        <Text style={styles.total}>Total: {cartAmount}€</Text>
        <Button title="Proceed to checkout" color="#8bc34a" disabled={cartAmount == 0} onPress={checkout} />
      </View>
    </SafeAreaView>
  );
}

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  pre: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  price: {
    fontSize: 18,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picture: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});