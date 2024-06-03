import {
  Batch,
  BatchEventAttributes,
  BatchMessaging,
  BatchPush,
  BatchUser,
} from '@batch.com/react-native-plugin';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BatchProfile} from '@batch.com/react-native-plugin/dist/BatchProfile';
import {BatchEmailSubscriptionState} from '@batch.com/react-native-plugin/dist/BatchProfileAttributeEditor';

const PluginTests: FunctionComponent = () => {
  const [pushToken, setPushToken] = useState('');
  const [installationID, setInstallationID] = useState('');
  const [identifier, setIdentifier] = useState<String | undefined>('');
  const [region, setRegion] = useState<String | undefined>('');
  const [language, setLanguage] = useState<String | undefined>('');

  const getInstallationId = async () => {
    const iid = await BatchUser.getInstallationID();
    setInstallationID(iid);
  };

  const getLastPushToken = async () => {
    const lastPushToken = await BatchPush.getLastKnownPushToken();
    setPushToken(lastPushToken);
  };

  const getIdentifier = async () => {
    const userId = await BatchUser.getIdentifier();
    setIdentifier(userId);
  };

  const getRegion = async () => {
    const region = await BatchUser.getRegion();
    setRegion(region);
  };

  const getLanguage = async () => {
    const language = await BatchUser.getLanguage();
    setLanguage(language);
  };

  const getData = useCallback(async () => {
    await getInstallationId();
    await getLastPushToken();
    await getIdentifier();
    await getRegion();
    await getLanguage();
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const testCustomEvent = async () => {
    const eventData = new BatchEventAttributes();
    eventData
      .put(
        'delivery_address',
        new BatchEventAttributes()
          .put('number', 43)
          .put('street', 'Rue Beaubourg')
          .put('zip_code', 75003)
          .put('city', 'Paris')
          .put('country', 'France'),
      )
      .put('number', 43)
      .putDate('date', new Date().getTime())
      .put('items_list', [
        new BatchEventAttributes()
          .put('name', 'Basic Tee')
          .put('size', 'M')
          .put('price', 23.99)
          .putURL('item_url', 'https://batch-store.com/basic-tee')
          .putURL(
            'item_image',
            'https://batch-store.com/basic-tee/black/image.png',
          )
          .put('in_sales', true)
          .put(
            'level_2',
            new BatchEventAttributes()
              .put('att_1', 'truc')
              .put(
                'level_3',
                new BatchEventAttributes().put('att_2', 'machin'),
              ),
          ),
        new BatchEventAttributes()
          .put('name', 'Short socks pack x3')
          .put('size', '38-40')
          .put('price', 15.99)
          .putURL('item_url', 'https://batch-store.com/short-socks-pack-x3')
          .putURL(
            'item_image',
            'https://batch-store.com/short-socks-pack-x3/image.png',
          )
          .put('in_sales', false),
      ])
      .put('metadata', ['first_purchase', 'apple_pay'])
      .put('$label', 'legacy_label')
      .put('$tags', ['tag1', 'tag2']);
    BatchProfile.trackEvent('validated_purchase', eventData).catch(e =>
      console.log(e),
    );

    const location = {
      latitude: 0.4,
      longitude: 0.523232,
    };
    BatchProfile.trackLocation(location);
  };

  const testCustomData = async () => {
    BatchProfile.identify('react-native-test-user-id');
    const editor = BatchProfile.editor();
    editor
      .setAttribute('bootl', false)
      .setAttribute('string', 'bar')
      .setDateAttribute('date', new Date().getTime())
      .setURLAttribute('url', 'https://example.com/test')
      .setAttribute('int', 1)
      .setAttribute('double', 2.3)
      .setAttribute('push_optin', ['opt1', 'opt2'])
      .addToArray('push_optin', ['foot', 'rugby'])
      .addToArray('push_optin_cars', 'f1')
      .removeFromArray('push_optin_cars', ['f2', 'f3'])
      .setLanguage('pt')
      .setRegion('BR')
      .setEmailAddress('test@batch.com')
      .setEmailMarketingSubscription(BatchEmailSubscriptionState.SUBSCRIBED)
      .save();
    BatchProfile.identify(null);
    getData();
  };

  const resetCustomData = () => {
    BatchProfile.editor()
      .setEmailAddress(null)
      .setRegion(null)
      .setLanguage(null)
      .save();
    BatchUser.clearInstallationData();
    getData();
  };

  return (
    <ScrollView>
      <View style={{flex: 1, marginBottom: 16}}>
        <Text style={styles.margins}>Installation ID: {installationID}</Text>
        <Text style={styles.margins}>Last push token: {pushToken}</Text>
        <Text style={styles.margins}>User id: {identifier}</Text>
        <Text style={styles.margins}>
          Region/Language: {region}/{language}
        </Text>

        {Platform.OS === 'ios' && (
          <View style={styles.margins}>
            <Button title="Request notif. auth"></Button>
          </View>
        )}
        <View style={styles.margins}>
          <Button title="Test custom event" onPress={testCustomEvent} />
        </View>
        <View style={styles.margins}>
          <Button title="Test custom data" onPress={testCustomData} />
        </View>
        <View style={styles.margins}>
          <Button title="Reset custom data" onPress={resetCustomData} />
        </View>
        <View style={styles.margins}>
          <Button
            title="DnD ON"
            onPress={() => BatchMessaging.setNotDisturbed(true)}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="DnD OFF"
            onPress={() => BatchMessaging.setNotDisturbed(false)}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="FG Notif ON"
            onPress={() => BatchPush.setShowForegroundNotification(true)}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="FG Notif OFF"
            onPress={() => BatchPush.setShowForegroundNotification(false)}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="Show pending message"
            onPress={() => BatchMessaging.showPendingMessage()}
          />
        </View>
        <View style={styles.margins}>
          <Button title="Opt-in" onPress={() => Batch.optIn()} />
        </View>
        <View style={styles.margins}>
          <Button title="Opt-out" onPress={() => Batch.optOut()} />
        </View>
        <View style={styles.margins}>
          <Button
            title="Is Opted-Out"
            onPress={async () => console.log(await Batch.isOptedOut())}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="Get Tags"
            onPress={async () => {
              const tags = await BatchUser.getTagCollections();
              console.log(tags);
            }}
          />
        </View>
        <View style={styles.margins}>
          <Button
            title="Get Attributs"
            onPress={async () => {
              const userAttributes = await BatchUser.getAttributes();
              console.log(userAttributes);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  category: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#000',
  },
  margins: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default PluginTests;
