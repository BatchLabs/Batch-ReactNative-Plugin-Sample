import React, {FunctionComponent, useState} from 'react';
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {Batch} from '@batch.com/react-native-plugin';

export type DataCollectionSetting = {
  name: string;
  enabled: boolean;
};

const SettingsCategory: FunctionComponent<{title: string}> = ({title}) => {
  return <Text style={styles.category}>{title}</Text>;
};

const SwitchSetting: FunctionComponent<{setting: DataCollectionSetting}> = ({
  setting,
}) => {
  const [isEnabled, setIsEnabled] = useState(setting.enabled);

  const onChange = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    setting.enabled = newState;
  };

  return (
    <Pressable android_ripple={{color: 'lightgrey'}} onPress={onChange}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{setting.name}</Text>
        <View pointerEvents="none">
          <Switch value={isEnabled} />
        </View>
      </View>
    </Pressable>
  );
};

const Settings: FunctionComponent = () => {
  const [deviceBrandSetting] = useState({
    name: 'Device Brand',
    enabled: false,
  });
  const [deviceModelSetting] = useState({
    name: 'Device Model',
    enabled: false,
  });
  const [geoIPSetting] = useState({
    name: 'GeoIP',
    enabled: false,
  });

  return (
    <View style={{flex: 1}}>
      <SettingsCategory title="Automatic Data Collection" />
      {Platform.OS === 'android' && (
        <SwitchSetting setting={deviceBrandSetting} />
      )}
      <SwitchSetting setting={deviceModelSetting} />
      <SwitchSetting setting={geoIPSetting} />
      <View style={{margin: 20}}>
        <Button
          title={'Save'}
          onPress={() => {
            Batch.updateAutomaticDataCollection({
              deviceBrand: deviceBrandSetting.enabled,
              deviceModel: deviceModelSetting.enabled,
              geoIP: geoIPSetting.enabled,
            });
          }}
        />
      </View>
    </View>
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
});

export default Settings;
