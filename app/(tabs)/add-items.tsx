import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MenuItemForm from "../../components/menu/MenuItemForm";
import { useMenuItems } from "../../hooks/use-menu-items";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Notification from "@/components/menu/Notification";
import { MenuItem } from "../../model/menu-item";

export default function AddItem() {
	const { addMenuItem } = useMenuItems();
	const [showNotification, setShowNotification] = useState(false);

	const handleAddItem = (item: MenuItem) => {
		addMenuItem(item);
		setShowNotification(true);
	};

	return (
		<>
			{showNotification && (
				<Notification
					message="Menu Item added successfully!"
					onHide={() => setShowNotification(false)}
				/>
			)}
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
			>
				<ThemedView style={styles.container}>
					<ThemedText type="title" style={styles.heading}>
						Add Menu Item
					</ThemedText>
					<MenuItemForm onAddItem={handleAddItem} />
				</ThemedView>
			</ParallaxScrollView>
		</>
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
