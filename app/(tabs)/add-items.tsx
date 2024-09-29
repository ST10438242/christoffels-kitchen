import React from "react";
import { StyleSheet } from "react-native";
import MenuItemForm from "../../components/menu/MenuItemForm";
import { useMenuItems } from "../../hooks/use-menu-items";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function AddItem() {
	const { addMenuItem } = useMenuItems();

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
		>
			<ThemedView style={styles.container}>
				<ThemedText type="title" style={styles.heading}>
					Add Menu Item
				</ThemedText>
				<MenuItemForm onAddItem={addMenuItem} />
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	heading: {
		marginBottom: 20,
		fontSize: 24,
		fontWeight: "bold",
	},
});
