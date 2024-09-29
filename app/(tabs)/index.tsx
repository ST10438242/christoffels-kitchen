import React from "react";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMenuItems } from "../../hooks/use-menu-items";
import MenuDisplay from "../../components/menu/MenuDisplay";

export default function Menu() {
	const { menuItems } = useMenuItems();

	console.log("Menu items in index:", menuItems);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
		>
			<ThemedView style={styles.container}>
				<ThemedText type="title" style={styles.heading}>
					Menu
				</ThemedText>
				{menuItems.length > 0 ? (
					<MenuDisplay menuItems={menuItems} />
				) : (
					<ThemedView style={styles.emptyState}>
						<ThemedText type="subtitle">
							No menu items yet
						</ThemedText>
						<ThemedText>
							Add some items using the 'Add Menu Item' tab
						</ThemedText>
					</ThemedView>
				)}
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
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
	},
});
