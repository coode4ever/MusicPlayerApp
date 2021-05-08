import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {favorites, songs} from '../helpers';

const ICON_SIZE = 25;

const Category = ({navigation: {navigate}, route}) => {
  const {categoryId} = route.params;
  const song = songs.find(s => s.id === categoryId);
  return (
    <ScrollView style={[t.bgWhite]}>
      <ImageBackground
        imageStyle={[styles.radiusDown]}
        style={[t.wFull, t.h64, t.p4, t.pX6]}
        source={{
          uri: song.image,
        }}>
        <View style={[t.flexRow, t.justifyBetween, t.mB3]}>
          <Icon color={Colors.white} size={ICON_SIZE} name="search" />
          <Icon color={Colors.white} size={ICON_SIZE} name="more-horiz" />
        </View>
      </ImageBackground>
      <View style={[t.flexRow, t.itemsCenter, t.pT4, t.pX6]}>
        <Text style={[t.mY3, t.text3xl, t.fontM, t.mR4]}>{song.category}</Text>
        <Text style={[t.textText]}>234 songs</Text>
      </View>
      <View style={[t.borderB, t.borderLine, t.mY2]} />

      <View style={[t.pX6]}>
        {favorites.map((favorite, index) => (
          <TouchableOpacity
            key={favorite.id}
            onPress={() =>
              navigate('Player', {
                song: favorite,
                next: favorites[index + 1],
              })
            }
            style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.pY2]}>
            <View style={[t.flexRow, t.itemsCenter]}>
              <Image
                style={[
                  t.h12,
                  t.w12,
                  t.roundedFull,
                  t.border2,
                  t.borderWhite,
                  t.mR3,
                ]}
                source={{
                  uri: favorite.image,
                }}
              />
              <View>
                <Text style={[t.textBlack, t.textBase, t.fontM]}>
                  {favorite.name}
                </Text>
                <Text style={[t.textText, t.fontM]}>{favorite.voice}</Text>
              </View>
            </View>

            <Text style={[t.textBlack, t.fontR]}>{favorite.duration}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  radiusDown: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});

export default Category;
