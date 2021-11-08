import { Batch, BatchEventData, BatchMessaging, BatchPush, BatchUser } from "@bam.tech/react-native-batch";
import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

const PluginTests: FunctionComponent = () => {

  const [installationID, setInstallationID] = useState('Unknown')
  const [pushToken, setPushToken] = useState('Unknown')


  const getInstallationId = async () => {
    const iid = await BatchUser.getInstallationID();
    setInstallationID(iid)
  }

  const getLastPushToken = async () => {
    const lastPushToken = await BatchPush.getLastKnownPushToken();
    setPushToken(lastPushToken)
  }

  useEffect(() => {
    getInstallationId()
    getLastPushToken()
  }, [])

  const testCustomEvent = () => {
    const eventData = new BatchEventData();
    eventData.put("string", "bar");
    eventData.put("bool", true);
    eventData.put("int", 1);
    eventData.put("double", 2.3);
    eventData.putURL('url','https://example.com/test');
    eventData.putDate("date", new Date('July 20, 69 00:20:18 GMT+00:00').getTime());
    eventData.addTag("tag1");
    eventData.addTag("tag1").addTag("tag2");
    BatchUser.trackEvent("test_event", "test_label", eventData);
    const location = {
      latitude: 0.4,
      longitude: 0.523232
    }
    BatchUser.trackLocation(location);
    BatchUser.trackTransaction(0.34, {});
  }

  const testCustomData = () => {
    const editor = BatchUser.editor();
    editor.setIdentifier("test_user")
      .setAttribute("bootl", true)
      .setAttribute("string", "bar")
      .setDateAttribute("date", new Date('July 20, 69 00:20:18 GMT+00:00').getTime())
      .setURLAttribute('url','https://example.com/test')
      .setAttribute("int", 1)
      .setAttribute("double", 2.3)
      .addTag("push_optin", "foot")
      .addTag("push_optin", "rugby")
      .setLanguage("pt")
      .setRegion("BR")
      .save();
  }

  const resetCustomData = () => {
    BatchUser.editor()
      .setIdentifier(null)
      .clearAttributes()
      .clearTags()
      .save();
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.margins}>Installation ID: {installationID}</Text>
      <Text style={styles.margins}>Last push token: {pushToken}</Text>
      {Platform.OS === 'ios' &&
        <View style={styles.margins}>
          <Button title="Request notif. auth"></Button>
        </View>
      }
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
        <Button title="DnD ON" onPress={() => BatchMessaging.setNotDisturbed(true)} />
      </View>
      <View style={styles.margins}>
        <Button title="DnD OFF" onPress={() => BatchMessaging.setNotDisturbed(false)} />
      </View>
      <View style={styles.margins}>
        <Button title="Show pending message" onPress={() => BatchMessaging.showPendingMessage()} />
      </View>
      <View style={styles.margins}>
        <Button title="Opt-in" onPress={() => Batch.optIn()} />
      </View>
      <View style={styles.margins}>
        <Button title="Opt-out" onPress={() => Batch.optOut()} />
      </View>
      <View style={styles.margins}>
        <Button title="Opt-out and wipe data" onPress={() => Batch.optOutAndWipeData()} />
      </View>
    </View>
  );
}

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
    marginVertical: 16
  },
  switchLabel: {
    fontSize: 16,
    color: '#000',
  },
  margins: {
    marginHorizontal: 16,
    marginTop: 16
  }
});

export default PluginTests;