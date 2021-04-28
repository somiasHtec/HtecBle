import React, { useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectAndNavigate = (item) => {
    navigate(item.name, { peripheralId: item.id, writeToPeripheral });
    connectAndTestPeripheral(item);
  };

  const renderItem = ({ item }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={startScan} style={styles.wallpaperWrapper}>
        <Image source={IMAGES.voicetoys} style={styles.wallpaper} />
      </TouchableOpacity>

      <View style={styles.devicesContainer}>
        {/* <Button
          onPress={startScan}
          title="SCAN"
          color="#841584"
          accessibilityLabel="Start scan"
        /> */}
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
