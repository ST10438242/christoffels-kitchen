import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  light?: string;
  dark?: string;
}

export function ThemedButton(props: ThemedButtonProps) {
  const { title, light, dark, style, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light, dark }, 'tint');
  const color = useThemeColor({ light, dark }, 'background');

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }, style]}
      {...otherProps}
    >
      <ThemedText style={[styles.text, { color }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
