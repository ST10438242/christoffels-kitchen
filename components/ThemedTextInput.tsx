import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemedTextInputProps extends TextInputProps {
	light?: string;
	dark?: string;
}

export function ThemedTextInput(props: ThemedTextInputProps) {
	const { style, light, dark, ...otherProps } = props;
	const color = useThemeColor({ light, dark }, "text");
	const backgroundColor = useThemeColor({ light, dark }, "background");
	const borderColor = useThemeColor({ light, dark }, "icon");

	return (
		<TextInput
			style={[
				styles.input,
				{ color, backgroundColor, borderColor },
				style,
			]}
			placeholderTextColor={useThemeColor({ light, dark }, "icon")}
			{...otherProps}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
});
