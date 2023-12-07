import { View, Image, Text } from 'react-native';
import React from 'react';
import Images from '../assets/images';
import styles from '../styles/rating-bar.styles';

type Props = { rating: number };

const RatingBar = ({ rating }: Props) => {
  return (
    <View style={styles.container}>
      {renderStars(rating)}
      <Text style={styles.text}>{rating}</Text>
    </View>
  );
};

const renderStars = (rating: number) => {
  let jsx = [];

  for (let i = 1; i <= 5; i++) {
    jsx.push(
      <Image
        key={i}
        style={styles.image}
        source={i <= rating ? Images.starSolid : Images.starRegular}
      />
    );
  }

  return jsx;
};

export default RatingBar;
