This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Additional comments

#### NOTE: This app has been developed only for android devices.

For iOS some additional features (like permissions requests) will need to be added.

## ToDo:

- Create custom hooks for using redux dispatchers and selectors.
- Add retry option for getting location permissions, in case they where rejected. The same for API data fetching in case of server error
- Update current location as user moves. I might need to define a new logic for the bottom panel.
- Remove KEY in `AndroidManifest.xml` and inject it from `local.properties`.
- Google Maps sometimes shows a layer with black street when zooming in. Investigate why this is happening and fix it.

## Posible additional features:

- Fefore fetchingg vehicle data, detect current city and request only vehicles available on that city.

## Behaviour:

The user can select available scooters by using the buttons in the bottom panel or by clicking on a marker.  
If the user selects a scooter which distance excedes 1200m, it will be selected and the information will appear on the buttom panel. However it would not be possible using the panel buttons the same way. The right button will be dissabled and the left one will be enable but this time it will select the closest scooter available.
