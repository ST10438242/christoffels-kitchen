import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

interface NotificationProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 3000, onHide }) => {
  const backgroundColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'background');
  const translateY = useSharedValue(-100);

  useEffect(() => {
    translateY.value = withSequence(
      withTiming(0, { duration: 300 }),
      withTiming(0, { duration: duration - 600 }),
      withTiming(-100, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(onHide)();
        }
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor }]}>
      <ThemedText style={[styles.text, { color: textColor }]}>{message}</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notification;
