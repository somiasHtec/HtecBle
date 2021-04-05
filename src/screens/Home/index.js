import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button,
} from 'react-native';

import { IMAGES } from '../../assets';
import styles from './styles';

const data = [
  { id: 1, name: 'Spread', border: 'borderBlue', img: 'spread' },
  { id: 2, name: 'Stimulated', border: 'borderYellow', img: 'stimulated' },
  { id: 3, name: 'Surrounded', border: 'borderGreen', img: 'surrounded' },
  { id: 4, name: 'Jumped', border: 'borderRed', img: 'jumped' },
];

const Home = (props) => {
  const {
    navigation: { navigate },
    listData,
    connectAndTestPeripheral,
    setTestMode,
    startScan,
    writeToPeripheral,
  } = props;

  const connectAndNavigate = (item) => {
    navigate(item.name, { peripheralId: item.id, writeToPeripheral });
    connectAndTestPeripheral(item);
  };

  const renderItem = ({ item }) => {
    const itemImage = item.name.toLowerCase();

    return (
      <TouchableOpacity
        onPress={() => connectAndNavigate(item)}
        style={styles.borderGreen}>
        {item.name && (
          <Image source={IMAGES[itemImage]} style={styles.deviceImage} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wallpaperWrapper}>
        <Image source={IMAGES.voicetoys} style={styles.wallpaper} />
      </View>

      <Button
        onPress={() => setTestMode('write')}
        title="Write"
        color="#123850"
        accessibilityLabel="Write"
      />
      <Button
        onPress={() => setTestMode('read')}
        title="Read"
        color="#7748"
        accessibilityLabel="Read"
      />

      <View style={styles.devicesContainer}>
        <Button
          onPress={startScan}
          title="SCAN"
          color="#841584"
          accessibilityLabel="Start scan"
        />
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
