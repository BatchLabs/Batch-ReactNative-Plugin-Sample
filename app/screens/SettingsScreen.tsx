import {Batch} from '@batch.com/react-native-plugin';
import {useNavigation} from '@react-navigation/core';
import React, {FunctionComponent, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {suggestions} from '../data/SettingsDatasource';
import Suggestion from '../models/Suggestion';

const SettingsCategory: FunctionComponent<{title: string}> = ({title}) => {
  return <Text style={styles.category}>{title}</Text>;
};

const TextSetting: FunctionComponent<{title: string; onPress: () => void}> = ({
  title,
  onPress,
}) => {
  return (
    <Pressable android_ripple={{color: 'lightgrey'}} onPress={onPress}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{title}</Text>
      </View>
    </Pressable>
  );
};

const SwitchSetting: FunctionComponent<{suggestion: Suggestion}> = ({
  suggestion,
}) => {
  const [isEnabled, setIsEnabled] = useState(suggestion.value);

  const onChange = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    suggestion.value = newState;
  };

  return (
    <Pressable android_ripple={{color: 'lightgrey'}} onPress={onChange}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{suggestion.name}</Text>
        <View pointerEvents="none">
          <Switch value={isEnabled} />
        </View>
      </View>
    </Pressable>
  );
};

const Settings: FunctionComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <SettingsCategory title="Notifications" />
      <SwitchSetting suggestion={suggestions.flash_sale} />

      <SettingsCategory title="Suggestion topics" />
      <SwitchSetting suggestion={suggestions.suggested_content} />
      <SwitchSetting suggestion={suggestions.fashion_content} />
      <SwitchSetting suggestion={suggestions.other_content} />

      <SettingsCategory title="Advanced" />
      <TextSetting
        title="Data Collection"
        onPress={() => navigation.navigate('Data Collection')}
      />
      <TextSetting title="Batch Debug" onPress={() => Batch.showDebugView()} />
      <TextSetting
        title="RN plugin tests"
        onPress={() => navigation.navigate('Plugin Tests')}
      />
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
