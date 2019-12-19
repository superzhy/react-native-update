/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
  NativeModules,
} from 'react-native';

const App = () => {
  useEffect(() => {
    crequestMultiplePermission();
  });

  // 手动获取权限
  const crequestMultiplePermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (granteds['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
        this.storage = true;
      } else {
        this.storage = false;
      }
      if (this.storage) {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 检测更新
  const checkUpdate = () => {
    const iOS = Platform.OS === 'ios';
    const Android = Platform.OS === 'android';
    if (Android) {
      const {android} = RNFetchBlob;

      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'update.apk',
          description: '下载更新包',
          mime: 'application/vnd.android.package-archive',
          mediaScannable: true,
          notification: true,
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/update.apk`,
        },
      })
        .fetch(
          'GET',
          'http://gdown.baidu.com/data/wisegame/9fdb4b60017e5bf9/baidushoujizhushou_16798097.apk',
        )
        .then(res => {
          android.actionViewIntent(
            res.path(),
            'application/vnd.android.package-archive',
          );
        });
    }
    if (iOS) {
      NativeModules.upgrade.upgrade('123456', msg => {
        if (msg === 'YES') {
          // 跳转到APP Stroe
          NativeModules.upgrade.openAPPStore('123456'); //数字为对应的AppStore引用的ID
        } else {
          // TODO: 无更新
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          checkUpdate();
        }}>
        <Text>更新</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default App;
