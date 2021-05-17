import React, { useState, useEffect, useContext } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Welcome from './screens/Welcome';

import { stringToBytes } from 'convert-string';
import BleManager from 'react-native-ble-manager';

import usePeripheral from './hooks/usePeripheral';

const deviceTypes = ['Stimulated', 'Surrounded', 'Spread', 'Jumped'];

// import PeripheralContext from './context'

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

  const { setPeripheralId } = usePeripheral();

  const startScan = () => {
    BleManager.start({ showAlert: false });

    console.log('Scanning ...');
    if (isScanning) {
      return;
    }

    // first, clear existing peripherals
    peripherals.clear();
    setList(Array.from(peripherals.values()));

    console.log('List from startScan -->>', list);
    console.log('Peripherals from startScan -->>', peripherals);

    // then re-scan it
    BleManager.scan([], 3, true)
      .then((res) => {
        console.log('Scanning...');
        console.log('Scanning response -->>', res);
        setIsScanning(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDiscoverPeripheral = (peripheral) => {
    if (!peripheral.name) {
      return;
    }

    console.log('Peripheral -->>', peripheral);

    if (deviceTypes.includes(peripheral?.name)) {
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }

    // if (
    //   peripheral?.name === 'Stimulated' ||
    //   'Surrounded' ||
    //   'Spread' ||
    //   'Jumped'
    // ) {
    //   peripherals.set(peripheral.id, peripheral);
    //   setList(Array.from(peripherals.values()));
    // }

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
    const payloadBytes = stringToBytes(payload);

    BleManager.write(
      peripheralId,
      serviceUUID,
      charasteristicUUID,
      payloadBytes,
      1000,
    )
      .then(() => {})
      .catch((error) => {
        console.log('write err', error);
      });
  };

  const connectAndTestPeripheral = (peripheral) => {
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

        setPeripheralId(peripheral.id);
        // update connected attribute
        updatePeripheral(peripheral, (p) => {
          p.connected = true;
          return p;
        });

        // retrieve peripheral services info
        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
          // test read current peripheral RSSI value
          BleManager.readRSSI(peripheral.id).then((rssi) => {
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
    <Welcome
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
