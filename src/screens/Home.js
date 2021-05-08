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
import Carousel from 'react-native-snap-carousel';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {favorites, songs, width} from '../helpers';

const ICON_SIZE = 25;

const Home = ({navigation: {navigate}}) => {
  return (
    <ScrollView>
      <View style={[t.bgWhite, t.p4, t.pX6]}>
        <View style={[t.flexRow, t.justifyBetween, t.mB3]}>
          <Icon size={ICON_SIZE} name="search" />
          <Icon size={ICON_SIZE} name="more-horiz" />
        </View>
        <Text style={[t.fontM, t.text3xl, t.mY3]}>ADELA</Text>
        <Text style={[t.fontM]}>HOW DO YOU</Text>
        <Text style={[t.fontM]}>FEEL LIKE TODAY?</Text>

        <View style={[t.pY5, t.justifyEnd, t.itemsEnd, t.flexRow]}>
          <Carousel
            data={songs}
            firstItem={0}
            layout="default"
            sliderWidth={220}
            inactiveSlideScale={0.7}
            hasParallaxImages={true}
            itemWidth={220}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigate('Category', {
                    categoryId: item.id,
                  })
                }>
                <ImageBackground
                  style={[t.w60, t.h56, t.justifyEnd, t.itemsCenter]}
                  imageStyle={styles.radius}
                  source={{
                    uri: item.image,
                  }}>
                  <Text style={[t.text2xl, t.textWhite, t.mB2]}>
                    {item.category}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={[t.mY3, t.text2xl, t.fontM]}>Favourite</Text>
        {favorites.map((favorite, index) => (
          <TouchableOpacity
            onPress={() =>
              navigate('Player', {
                song: favorite,
                next: favorites[index + 1],
              })
            }
            key={favorite.id}
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
  radius: {
    borderRadius: 40,
  },
});

export default Home;
