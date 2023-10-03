import {
  Dimensions,
  Image,
  ImageResizeMode,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {colors} from '../../../assets/colors';
import {IProductImage} from '../../../redux/slices/productSlice/type';

interface IImage {
  image: string;
}

interface IProductImages {
  product_images: IProductImage[] | IImage[];
  resizeMode: ImageResizeMode;
  loop: boolean;
  autoplay: boolean;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IProductImages|IImage}
 * @returns image carousel with dots
 */

const ImageCarousel = ({
  product_images,
  autoplay,
  resizeMode,
  loop,
}: IProductImages) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const width = Dimensions.get('window').width;
  const handleIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <Carousel
        loop={loop}
        style={styles.carouselCon}
        width={width}
        pagingEnabled={true}
        autoPlay={autoplay}
        data={product_images}
        scrollAnimationDuration={1000}
        snapEnabled={true}
        onProgressChange={(_, absoluteProgress) => {
          handleIndex(Math.round(absoluteProgress));
        }}
        renderItem={({item}) => (
          <View>
            <Image
              source={{uri: item.image}}
              style={styles.imageStyle}
              resizeMode={resizeMode}
            />
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
  },
  carouselCon: {
    height: '100%',
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
