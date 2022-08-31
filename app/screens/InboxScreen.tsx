import React, { FunctionComponent, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Button, FlatList, Pressable, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { BatchInbox, BatchInboxFetcher, IInboxNotification } from '@batch.com/react-native-plugin';
import { useNavigation } from "@react-navigation/core";
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyContainer: FunctionComponent = () => {
  return (
    <View style={styles.empty}>
      <Icon name="email" size={64} />
      <Text style={{ fontSize: 16 }}>Your inbox is currently empty !</Text>
    </View>
  )
}

const ItemSeparator: FunctionComponent = () => {
  return (
    <View
      style={{
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
      }}
    />
  )
}

const Inbox: FunctionComponent = () => {

  const navigation = useNavigation();
  const [fetcher, setFetcher] = useState<BatchInboxFetcher>();
  const [endReached, setEndReached] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<IInboxNotification[]>([]);

  const fetchNotifications = async () => {
    if (fetcher) {
      try {
        const res = await fetcher.fetchNewNotifications()
        setEndReached(res.endReached)
        setNotifications(res.notifications)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
  }

  const fetchMore = async () => {
    if (fetcher) {
      try {
        const res = await fetcher.fetchNextPage()
        setEndReached(res.endReached)
        setNotifications(notifications.concat(res.notifications))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const markAllNotificationAsRead = async () => {
    if (fetcher) {
      await fetcher.markAllNotificationsAsRead()
      setNotifications(
        notifications.map(notification => {
          return { ...notification, isUnread: false }
        })
      )
    }
  }

  const displayMarkAllAsReadDialog = () => {
    Alert.alert(
      "Mark all as read",
      "Are you sure you want to mark all notification as read ?",
      [{
        text: "No",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: async () => {
          markAllNotificationAsRead()
        }
      }]
    );
  }

  useEffect(() => {
    BatchInbox.getFetcher({ maxPageSize: 20 }).then((fetcher: BatchInboxFetcher) => {
      setFetcher(fetcher)
    });
  }, []);

  useEffect(() => {
    fetchNotifications()
  }, [fetcher])

  const renderItem = ({ item }: { item: IInboxNotification }) => {
    const icon = item.isUnread ? 'email' : 'email-open'

    const markNotificationAsDeleted = () => {
      if (fetcher) {
        fetcher.markNotificationAsDeleted(item.identifier)
        setNotifications(
          notifications.filter(notification => notification.identifier !== item.identifier)
        )
      }
    }

    const markNotificationAsRead = () => {
      if (fetcher) {
        fetcher.markNotificationAsRead(item.identifier)
        setNotifications(
          notifications.map(notification =>
            notification.identifier === item.identifier ? { ...notification, isUnread: false } : notification
          )
        )
      }
    }

    const rightButton = [{
      text: 'Delete',
      backgroundColor: '#f44336',
      onPress: markNotificationAsDeleted
    }]
    const leftButtons = [{
      text: 'Read',
      backgroundColor: '#8bc34a',
      onPress: markNotificationAsRead
    }]

    return (
      <Swipeout right={rightButton} left={leftButtons} backgroundColor="#eeeeee" autoClose={true}>
        <View style={styles.itemContent}>
          <Icon name={icon} size={20} />
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price} numberOfLines={1}>{item.body}</Text>
          </View>
        </View>
      </Swipeout>
    );
  }

  const renderLoadMoreItem = () => {
    if (endReached) {
      return null
    }
    return (
      <View style={{ margin: 4 }}>
        <Button title="Load more !" onPress={fetchMore} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.identifier}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchNotifications}
          />
        }
        contentContainerStyle={notifications.length == 0 && styles.contentContainer}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={renderLoadMoreItem}
        ListEmptyComponent={EmptyContainer}
      />
      <Pressable android_ripple={{ color: 'lightgrey' }} onPress={displayMarkAllAsReadDialog}>
        <View style={styles.footer}>
          <Icon
            size={24}
            color="dodgerblue"
            style={{ marginHorizontal: 10 }}
            name="email-check"
          />
          <Text style={styles.label}>Mark all as read</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
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
    flexDirection: 'column',
    marginStart: 10
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  price: {
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'dodgerblue'
  },
  picture: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});