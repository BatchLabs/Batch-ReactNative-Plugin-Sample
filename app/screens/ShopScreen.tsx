import React, { FunctionComponent } from "react"
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, SafeAreaView, FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import ArticlesDatasource from "../data/ArticlesDatasource";
import Article from "../models/Article";
import { BatchUser } from "@bam.tech/react-native-batch";

const ArticleItem: FunctionComponent<{ article: Article }> = ({ article }) => {
 
  const navigation = useNavigation();

  const onPress = () => {
    BatchUser.trackEvent("ARTICLE_VIEW", article.name);
    navigation.navigate('Article', { article: article })
  }

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.item}>
        <Image
          style={styles.picture}
          source={article.picture}
        />
        <Text style={styles.title}>{article.name}</Text>
        <Text>{article.price}€</Text>
      </View>
    </TouchableOpacity>
  );
}

const Shop: FunctionComponent = () => {

  const renderItem = ({ item }: { item: Article }) => (
    <ArticleItem article={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={ArticlesDatasource}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  touchable: {
    flex: 0.5,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  picture: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});