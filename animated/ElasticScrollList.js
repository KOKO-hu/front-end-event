import React, { useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';

const ElasticScrollList = ({ children }) => {
  const [scaleValue] = useState(new Animated.Value(1)); // Initial scale value

  return (
    <Animated.ScrollView
      style={{ transform: [{ scaleX: scaleValue }] }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scaleValue } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      horizontal={true}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default ElasticScrollList;
