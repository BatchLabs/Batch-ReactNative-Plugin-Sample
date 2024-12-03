import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BatchInbox,
  BatchInboxFetcher,
  IInboxNotification,
} from '@batch.com/react-native-plugin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const EmptyContainer: FunctionComponent = () => {
  return (
    <View style={styles.empty}>
      <Icon name="email" size={64} />
      <Text style={{fontSize: 16}}>Your inbox is currently empty !</Text>
    </View>
  );
};

const ItemSeparator: FunctionComponent = () => {
  return (
    <View
      style={{
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
      }}
    />
  );
};

const Inbox: FunctionComponent = () => {
  const [fetcher, setFetcher] = useState<BatchInboxFetcher>();
  const [endReached, setEndReached] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<IInboxNotification[]>([]);

  const fetchNotifications = useCallback(async () => {
    if (fetcher) {
      try {
        const res = await fetcher.fetchNewNotifications();
        setEndReached(res.endReached);
        setNotifications(res.notifications);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  }, [fetcher]);

  const fetchMore = async () => {
    if (fetcher) {
      try {
        const res = await fetcher.fetchNextPage();
        setEndReached(res.endReached);
        setNotifications(notifications.concat(res.notifications));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const markAllNotificationAsRead = async () => {
    if (fetcher) {
      await fetcher.markAllNotificationsAsRead();
      setNotifications(
        notifications.map(notification => {
          return {...notification, isUnread: false};
        }),
      );
    }
  };

  const displayMarkAllAsReadDialog = () => {
    Alert.alert(
      'Mark all as read',
      'Are you sure you want to mark all notification as read ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            markAllNotificationAsRead();
          },
        },
      ],
    );
  };

  useEffect(() => {
    BatchInbox.getFetcher({maxPageSize: 20}).then((f: BatchInboxFetcher) =>
      setFetcher(f),
    );
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications, fetcher]);

  const renderItem = ({item}: {item: IInboxNotification}) => {
    const icon = item.isUnread ? 'email' : 'email-open';

    const markNotificationAsDeleted = () => {
      if (fetcher) {
        fetcher.markNotificationAsDeleted(item.identifier);
        setNotifications(
          notifications.filter(
            notification => notification.identifier !== item.identifier,
          ),
        );
      }
    };

    const markNotificationAsRead = () => {
      if (fetcher) {
        fetcher.markNotificationAsRead(item.identifier);
        setNotifications(
          notifications.map(notification =>
            notification.identifier === item.identifier
              ? {...notification, isUnread: false}
              : notification,
          ),
        );
      }
    };

    const displayLandingMessage = () => {
      if (fetcher && item.hasLandingMessage) {
        fetcher.displayNotificationLandingMessage(item.identifier);
      }
    };

    const renderLeftActions = (
      progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      return (
        <RectButton onPress={markNotificationAsDeleted}>
          <Animated.Text
            style={[
              styles.rectButton,
              {
                backgroundColor: '#f44336',
                transform: [{translateX: trans}],
              },
            ]}>
            Delete
          </Animated.Text>
        </RectButton>
      );
    };

    const renderRightActions = (
      progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <RectButton onPress={markNotificationAsRead}>
          <Animated.Text
            style={[
              styles.rectButton,
              {
                backgroundColor: '#8bc34a',
                transform: [{translateX: trans}],
              },
            ]}>
            Read
          </Animated.Text>
        </RectButton>
      );
    };

    return (
      <Swipeable
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}>
        <View>
          <Pressable style={styles.itemContent} onPress={displayLandingMessage}>
            <Icon name={icon} size={20} />
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price} numberOfLines={1}>
                {item.body}
              </Text>
            </View>
          </Pressable>
        </View>
      </Swipeable>
    );
  };

  const renderLoadMoreItem = () => {
    if (endReached) {
      return null;
    }
    return (
      <View style={{margin: 4}}>
        <Button title="Load more !" onPress={fetchMore} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        style={{flex: 1}}
        keyExtractor={item => item.identifier}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchNotifications} />
        }
        contentContainerStyle={
          notifications.length === 0 && styles.contentContainer
        }
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={renderLoadMoreItem}
        ListEmptyComponent={EmptyContainer}
      />
      <Pressable
        android_ripple={{color: 'lightgrey'}}
        onPress={displayMarkAllAsReadDialog}>
        <View style={styles.footer}>
          <Icon
            size={24}
            color="dodgerblue"
            style={{marginHorizontal: 10}}
            name="email-check"
          />
          <Text style={styles.label}>Mark all as read</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
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
    marginStart: 10,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  price: {
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'dodgerblue',
  },
  picture: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
