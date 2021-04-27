import React, { useState, useEffect, useCallback } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import HomeScreen from './screens/Home';

import { stringToBytes } from 'convert-string';
import BleManager from 'react-native-ble-manager';

import Devices from './const/devices';

const BleManagerModule = NativeModules.BleManager;
const bleEmitter = new NativeEventEmitter(BleManagerModule);

// TODO: Replace button and slider positions
// TODO: Delete already scanned devices when scanning new

const App = (props) => {
  const { navigation } = props;

  const [isScanning, setIsScanning] = useState(false);
  const [list, setList] = useState([]);
  const peripherals = new Map();
  const [testMode, setTestMode] = useState('write');

  // const onItemClick = useCallback(
  //   (event) => {
  //     console.log('You clicked ', event.currentTarget);
  //   },
  //   [term],
  // );

  const startScan = useCallback(() => {
    console.log('Scanning ...');
    if (isScanning) {
      return;
    }

    // first, clear existing peripherals
    peripherals.clear();
    setList(Array.from(peripherals.values()));

    // then re-scan it
    BleManager.scan([], 3, true)
      .then(() => {
        console.log('Scanning...');
        setIsScanning(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isScanning, peripherals]);

  // const startScan = () => {
  //   console.log('Scanning ...');
  //   if (isScanning) {
  //     return;
  //   }

  //   // first, clear existing peripherals
  //   peripherals.clear();
  //   setList(Array.from(peripherals.values()));

  //   // then re-scan it
  //   BleManager.scan([], 3, true)
  //     .then(() => {
  //       console.log('Scanning...');
  //       setIsScanning(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleDiscoverPeripheral = (peripheral) => {
    if (!peripheral.name) {
      return;
    }

    if (
      peripheral?.name === Devices.SURROUNDED ||
      Devices.SPREAD ||
      Devices.STIMULATED ||
      Devices.JUMPED
    ) {
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }

    // peripherals.set(peripheral.id, peripheral);
    // setList(Array.from(peripherals.values()));
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = (data) => {
    console.log('Disconnected from ->', data.peripheral);

    let peripheral = peripherals.get(data.peripheral);

    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);

      setList(Array.from(peripherals.values()));
    }
  };

  const handleUpdateValueForCharacteristic = (data) => {
    console.log(
      'Received data from: ' + data.peripheral,
      'Characteristic: ' + data.characteristic,
      'Data: ' + data.value,
    );
  };

  useEffect(() => {
    // startScan();

    BleManager.start({ showAlert: false });

    bleEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then((r1) => {
        if (r1) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then((r2) => {
            if (r2) {
              console.log('User accept');
              return;
            }
            console.log('User refuse');
          });
        }
      });
    }

    return () => {
      bleEmitter.removeListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      bleEmitter.removeListener('BleManagerStopScan', handleStopScan);
      bleEmitter.removeListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      );
      bleEmitter.removeListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePeripheral = (peripheral, callback) => {
    let p = peripherals.get(peripheral.id);

    if (!p) {
      return;
    }

    p = callback(p);
    peripherals.set(peripheral.id, p);
    setList(Array.from(peripherals.values()));
  };

  const writeToPeripheral = (
    peripheralId,
    payload,
    serviceUUID,
    charasteristicUUID,
  ) => {
    // console.log('PERIPHERAL ID -->>', peripheralId);
    // console.log('service uuid  -->>', serviceUUID);
    // console.log('charasteristicUUID-->>', charasteristicUUID);
    console.log('PERIPHERAL Payload --->>>', payload);

    const payloadBytes = stringToBytes(payload);

    console.log('payload:', payload);

    BleManager.write(
      peripheralId,
      serviceUUID,
      charasteristicUUID,
      payloadBytes,
    )
      .then((res) => {
        console.log('write response', res);
        // alert(`your "${payload}" is stored to the food bank. Thank you!`);
      })
      .catch((error) => {
        console.log('write err', error);
      });
  };

  const connectAndTestPeripheral = (peripheral, payload) => {
    if (!peripheral) {
      return;
    }

    if (peripheral.connected) {
      BleManager.disconnect(peripheral.id);
      return;
    }

    // connect to selected peripheral
    BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id, peripheral);

        // update connected attribute
        updatePeripheral(peripheral, (p) => {
          p.connected = true;
          return p;
        });

        // retrieve peripheral services info
        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
          console.log('Retrieved peripheral services', peripheralInfo);

          // test read current peripheral RSSI value
          BleManager.readRSSI(peripheral.id).then((rssi) => {
            console.log('Retrieved actual RSSI value', rssi);

            // update rssi value
            updatePeripheral(peripheral, (p) => {
              p.rssi = rssi;
              return p;
            });
          });
        });
      })
      .catch((error) => {
        console.log('Connection error', error);
      });
  };

  return (
    <HomeScreen
      listData={list}
      navigation={navigation}
      startScan={startScan}
      setTestMode={setTestMode}
      connectAndTestPeripheral={connectAndTestPeripheral}
      writeToPeripheral={writeToPeripheral}
    />
  );
};
export default App;
