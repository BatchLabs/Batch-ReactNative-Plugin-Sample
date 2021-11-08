<img src="https://static.batch.com/documentation/Readmes/logo_batch_full_178@2x.png" srcset="https://static.batch.com/documentation/Readmes/logo_batch_full_178.png 1x" width="178" height="68" alt="Batch Logo" />

# Batch React-Native Sample

Sample project using [Batch.com](https://batch.com/) platform built with react-native framework. 

## Getting Started

### Prerequisites
-   Install Node & Watchman
-   Install Android Studio and platform dependencies
-   Install Xcode and platform dependencies

For more information, please follow the react-native [documentation](https://reactnative.dev/docs/environment-setup)

This sample run on: 

- React 17.0.2
- React-native 0.66.2
- Node : 16.2.0

### Installing

1. Run `npm install` from the project root and install the dependencies:
```
npm install 
```

2. Install iOS native dependencies with cocoapods from the ios folder :
```
 cd ios
 pod install
```

## Setting up your APIKey

- On iOS, look for your `Info.plist` and add the following:

```bash
<key>BatchAPIKey</key>
<string>YOUR_BATCH_API_KEY</string>
````

- On Android, open `android/app/build.gradle` and add:

```groovy
defaultConfig {
    ...
    resValue "string", "BATCH_API_KEY", "YOUR_BATCH_API_KEY"
}
```

## Add you Firebase config

Add the `google-services.json` file to `/android/app`

## Run

If you previously installed a global `react-native-cli` package, please remove it and use the built-in command line interface.

You can run the app on simulator using the react-native commands:

For iOS:
```
npx react-native run-ios
```
For Android:
```
npx react-native run-android
```

Or you can run it on a real device using Xcode or Android Studio (strongly recommended). 

## Built With

* [React-Native](https://reactnative.dev/docs/getting-started) - The cross-platform framework used
* [Batch React-Native Plugin](https://doc.batch.com/react-native/sdk-integration) - Batch push provider