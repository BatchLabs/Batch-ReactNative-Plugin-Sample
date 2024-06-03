import AsyncStorage from '@react-native-async-storage/async-storage';
import {BatchProfile} from '@batch.com/react-native-plugin/dist/BatchProfile';

export enum DataType {
  Attribute,
  Tag,
}

export default class Suggestion {
  private readonly _key: string;
  private readonly _type: DataType;
  private readonly _name: string;

  constructor(
    name: string,
    key: string,
    defaultValue: boolean,
    type: DataType,
  ) {
    this._name = name;
    this._key = key;
    this._value = defaultValue;
    this._type = type;
    this.load();
  }

  public get name(): string {
    return this._name;
  }

  private _value: boolean;

  public get value(): boolean {
    return this._value;
  }

  public set value(enabled: boolean) {
    this._value = enabled;
    this.sync();
  }

  private sync() {
    this.persist();
    this.updateBatchData();
  }

  private persist() {
    AsyncStorage.setItem(this._key, JSON.stringify(this._value));
  }

  private load() {
    AsyncStorage.getItem(this._key, (error, value) => {
      if (!error) {
        if (value) {
          this._value = JSON.parse(value);
        }
      }
    });
  }

  private updateBatchData() {
    const editor = BatchProfile.editor();
    if (this._type === DataType.Attribute) {
      editor.setAttribute(this._key, this._value);
    } else {
      if (this._value) {
        editor.addToArray('suggestion_topics', this._key);
      } else {
        editor.removeFromArray('suggestion_topics', this._key);
      }
    }
    editor.save();
  }
}
