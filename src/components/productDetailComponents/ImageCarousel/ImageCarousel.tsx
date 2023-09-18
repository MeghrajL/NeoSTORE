import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {colors} from '../../../assets/colors';

const ImageCarousel = ({product_images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log('+++++', product_images);
  const width = Dimensions.get('window').width;
  const handleIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        style={styles.carouselCon}
        width={width}
        pagingEnabled={true}
        // height={400}
        autoPlay={false}
        data={product_images}
        scrollAnimationDuration={1000}
        onProgressChange={(_, absoluteProgress) => {
          handleIndex(Math.round(absoluteProgress));
        }}
        // onSnapToItem={index => setActiveIndex(index)}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={item => (
          <View style={styles.item}>
            <Image
              source={{uri: item.item.image}}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            {/* <Pagination
              activeIndex={activeIndex}
              length={product_images.length}
            /> */}
          </View>
        )}
      />
      <View style={styles.dotContainer}>
        <AnimatedDotsCarousel
          length={product_images.length}
          currentIndex={activeIndex}
          maxIndicators={product_images.length}
          interpolateOpacityAndColor={false}
          activeIndicatorConfig={styles.active}
          inactiveIndicatorConfig={styles.inactive}
          decreasingDots={[
            {
              config: styles.config1,
              quantity: 1,
            },
            {
              config: styles.config2,
              quantity: 1,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // backgroundColor: 'red',
  },
  carouselCon: {
    height: '100%',
    // borderRadius: 10,
    // width: '100%',
  },
  item: {
    // flex: 1,
    // height: '100%',
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  dotContainer: {
    width: '100%',
    height: 10,
    position: 'absolute',
    top: '90%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: colors.PLATINUM_GRAY,
    margin: 3,
    opacity: 1,
    size: 8,
  },
  inactive: {
    color: '#ccc',
    margin: 3,
    opacity: 0.5,
    size: 8,
  },
  config1: {color: '#ccc', margin: 3, opacity: 0.5, size: 6},
  config2: {color: '#ccc', margin: 3, opacity: 0.5, size: 4},
});
