import { BatchUser } from "@bam.tech/react-native-batch"
import AsyncStorage from "@react-native-async-storage/async-storage"

export enum DataType {
    Attribute,
    Tag
}

export default class Suggestion {

    private _name: string
    private _key: string
    private _value: boolean
    private _type: DataType

    constructor(name: string, key: string, defaultValue: boolean, type: DataType) {
        this._name = name
        this._key = key
        this._value = defaultValue
        this._type = type
        this.load()
    }

    public get name(): string {
        return this._name
    }

    public get value(): boolean {
        return this._value
    }

    public set value(enabled: boolean) {
        this._value = enabled;
        this.sync()
    }

    private sync() {
        this.persist()
        this.updateBatchData()
    }

    private persist() {
        AsyncStorage.setItem(this._key, JSON.stringify(this._value))
    }

    private load() {
        AsyncStorage.getItem(this._key, (error, value) => {
            if (!error) {
                if (value) {
                    this._value = JSON.parse(value);
                }
            }
        })
    }

    private updateBatchData() {
        const editor = BatchUser.editor()
        if (this._type == DataType.Attribute) {
            editor.setAttribute(this._key, this._value)
        } else {
            if(this._value === true){
                editor.addTag("suggestion_topics", this._key)
            } else {
                editor.removeTag("suggestion_topics", this._key)
            }
        }
        editor.save()
    }
}