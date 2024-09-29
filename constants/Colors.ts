/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2ecc71';
const tintColorDark = '#27ae60';

export const Colors = {
  light: {
    text: '#2c3e50',
    background: '#ecf0f1',
    tint: tintColorLight,
    icon: '#34495e',
    tabIconDefault: '#7f8c8d',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ecf0f1',
    background: '#2c3e50',
    tint: tintColorDark,
    icon: '#bdc3c7',
    tabIconDefault: '#95a5a6',
    tabIconSelected: tintColorDark,
  },
};
