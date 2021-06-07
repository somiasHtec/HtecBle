import React, { useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';

import { useDebouncedCallback } from 'use-debounce';

import styles from './styles';
import { IMAGES } from '~/assets';

const Home = (props) => {
  const {
    navigation: { navigate },
    listData,
    connectAndTestPeripheral,
    startScan,
    writeToPeripheral,
  } = props;

  useEffect(() => {
    startScan();

    return () => {
      console.log('*** welcome screen umounted ***');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deviceConnectDebounce = useDebouncedCallback(
    (item) => {
      navigate(item.name, { peripheralId: item.id, writeToPeripheral });
      // navigate('Jumped', { peripheralId: item.id, writeToPeripheral });
    },

    100,
  );

  const connectAndNavigate = (item) => {
    connectAndTestPeripheral(item);
    deviceConnectDebounce(item);
  };

  const renderItem = (item) => {
    console.log({ item });

    const itemImage = item.name.toLowerCase();

    return (
      <TouchableOpacity
        onPress={() => connectAndNavigate(item)}
        style={styles.borderGreen}
      >
        {item.name && (
          <View>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Image source={IMAGES[itemImage]} style={styles.deviceImage} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const items = {
    name: 'Stimulated',
    id: '82255442-9fdc-11e9-a2a3-2a2ae2dbcce4',
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={startScan} style={styles.wallpaperWrapper}>
        <Image source={IMAGES.voicetoys} style={styles.wallpaper} />
      </TouchableOpacity>

      <View style={styles.devicesContainer}>
        {/* {renderItem(items)} */}
        <FlatList
          data={listData}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
