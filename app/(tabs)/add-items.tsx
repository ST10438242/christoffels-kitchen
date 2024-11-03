import React, { useState } from "react";
import { StyleSheet, Modal } from "react-native";
import MenuItemForm from "../../components/menu/MenuItemForm";
import { useMenuItems } from "../../hooks/use-menu-items";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Notification from "@/components/menu/Notification";
import { MenuItem } from "../../model/menu-item";
import { ThemedButton } from "@/components/ThemedButton";

export default function AddItem() {
	const { addMenuItem } = useMenuItems();
	const [showNotification, setShowNotification] = useState(false);
	const [addedItems, setAddedItems] = useState<MenuItem[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

	const handleAddItem = (item: MenuItem) => {
		setAddedItems((prev) => [...prev, item]);
	};

	const handleRemoveItem = (item: MenuItem) => {
		setAddedItems((prev) => prev.filter(i => i.dishName !== item.dishName));
	};

	const handleConfirmAddToMenu = () => {
		addedItems.forEach(item => addMenuItem(item));
		setShowNotification(true);
		setAddedItems([]);
		setShowModal(false);
	};

	return (
		<>
			{showNotification && (
				<Notification
					message="Menu Item(s) added successfully!"
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
					<ThemedText type="subtitle" style={styles.addedItemsTitle}>
						Added Items:
					</ThemedText>
					{addedItems.map(item => (
						<ThemedView key={item.dishName} style={styles.addedItemContainer}>
							<ThemedText>{item.dishName}</ThemedText>
							<ThemedButton title="Remove" onPress={() => handleRemoveItem(item)} />
						</ThemedView>
					))}
					<ThemedButton title="Confirm Add to Menu" onPress={() => setShowModal(true)} />
				</ThemedView>
			</ParallaxScrollView>

			<Modal visible={showModal} transparent={true}>
				<ThemedView style={styles.modalOverlay}>
					<ThemedView style={styles.modalContent}>
						<ThemedText>Are you sure you want to add these items to the menu?</ThemedText>
						<ThemedButton title="Yes" onPress={handleConfirmAddToMenu} />
						<ThemedButton title="No" onPress={() => setShowModal(false)} />
					</ThemedView>
				</ThemedView>
			</Modal>
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
	addedItemsTitle: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	addedItemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
	},
});
