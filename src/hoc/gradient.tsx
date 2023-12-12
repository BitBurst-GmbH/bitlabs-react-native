import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

type Props = {
  colors: string[];
  rectRadius?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Gradient = ({ children, style, colors, rectRadius }: Props) => {
  return (
    <View style={[style]}>
      <Svg style={{ position: 'absolute' }} height="100%" width="100%">
        <Defs>
          <LinearGradient id="idGrad" x1="0" y1="1" x2="1" y2="0">
            <Stop
              offset="0"
              stopColor={colors[0]?.toString()}
              stopOpacity="1"
            />
            <Stop
              offset="1"
              stopColor={colors[1]?.toString()}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Rect
          rx={rectRadius}
          ry={rectRadius}
          height="100%"
          width="100%"
          fill="url(#idGrad)"
        />
      </Svg>
      {children}
    </View>
  );
};

export default Gradient;
