import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ICON_SIZE = 35;

const Player = ({route}) => {
  const {song, next} = route.params;

  const [isPlay, setIsPlay] = useState(false);

  const player = new Sound(song.song, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const handlePlay = () => {
    setIsPlay(!isPlay);
    player.play(success => {});
  };

  const handlePause = () => {
    setIsPlay(!isPlay);
    player.pause(success => {});
  };
  player.setVolume(1);
  return (
    <View style={[t.bgWhite, t.hFull, t.wFull]}>
      <View>
        <ImageBackground
          imageStyle={[styles.radiusDown]}
          style={[t.wFull, t.h64, t.p4, t.pX6]}
          source={{
            uri: song.image,
          }}>
          <View style={[t.flexRow, t.justifyCenter, t.flex1, t.itemsCenter]}>
            <Text style={[t.fontM, t.uppercase, t.text3xl, t.textWhite]}>
              {song.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={[t.justifyCenter, t.itemsCenter, t.pT6, t.pX6]}>
          <Text style={[t.mY1, t.text3xl, t.fontM, t.mR4]}>{song.name}</Text>
          <Text style={[t.textText]}>{song.voice}</Text>
        </View>
        <View style={[t.pT4, t.pX6]}>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
            <Text style={[t.fontM, t.textBase]}>1:28</Text>
            <Text style={[t.fontM, t.textBase]}>2:54</Text>
          </View>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY3]}>
            <View style={[t.borderBlack, t.h1, t.w1_4, t.bgPrimary]} />
            <View style={[t.borderBlack, t.h1, t.w3_4, t.bgText]} />
          </View>
        </View>
      </View>

      <View style={[t.pX6, t.flex]}>
        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.pY2]}>
          <TouchableOpacity>
            <Icon size={ICON_SIZE} name="repeat" />
          </TouchableOpacity>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY3]}>
            <TouchableOpacity>
              <Icon size={ICON_SIZE} name="skip-previous" />
            </TouchableOpacity>
            {isPlay ? (
              <TouchableOpacity
                style={[t.p3, t.roundedFull, t.mX6, t.bgPrimary, t.shadow2xl]}
                onPress={handlePause}>
                <Icon color={Colors.white} size={ICON_SIZE} name="pause" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[t.p3, t.roundedFull, t.mX6, t.bgPrimary, t.shadow2xl]}
                onPress={handlePlay}>
                <Icon color={Colors.white} size={ICON_SIZE} name="play" />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <Icon size={ICON_SIZE} name="skip-next" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Icon size={ICON_SIZE} name="shuffle-variant" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          t.absolute,
          t.bottom0,
          t.right0,
          t.bgPrimary,
          t.flexRow,
          t.justifyBetween,
          t.itemsCenter,
          t.pX4,
          t.pY2,
          t.w2_4,
          styles.radiusTopLeft,
          t.shadow2xl,
        ]}>
        <Text style={[t.fontM, t.textXl, t.textWhite]}>NEXT</Text>
        <View style={[t.mT4]}>
          <Text style={[t.fontB, t.textBase, t.textWhite]}>{next.name}</Text>
          <Text style={[t.fontM, t.textXs, t.textWhite]}>{next.voice}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radiusDown: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  radiusTopLeft: {
    borderTopLeftRadius: 40,
  },
});

export default Player;
