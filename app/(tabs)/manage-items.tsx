import React, { useState } from "react";
import { StyleSheet, Modal, ScrollView } from "react-native";
import MenuItemForm from "../../components/menu/MenuItemForm";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MenuItem } from "../../model/menu-item";
import AddedItemsDisplay from "@/components/manage-item/AddItemDisplay";
import { useMenuItems } from "@/hooks/use-menu-items";
import { ThemedButton } from "@/components/ThemedButton";
import Notification from "@/components/menu/Notification";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ManageItem() {
	const { menuItems, addMenuItem, removeMenuItem } = useMenuItems();
	const [showModal, setShowModal] = useState(false);
	const [queuedItems, setQueuedItems] = useState<MenuItem[]>([]);
	const [showNotification, setShowNotification] = useState(false);
	const modalBackgroundColor = useThemeColor({}, "background");

	const handleAddItem = (item: MenuItem) => {
		setQueuedItems((prev) => [...prev, item]);
	};

	const handleConfirmAddToMenu = () => {
		queuedItems.forEach((item) => addMenuItem(item));
		setShowNotification(true);
		setQueuedItems([]);
		setShowModal(false);
	};

	const handleRemoveItem = (item: MenuItem) => {
		removeMenuItem(item.dishName);
	};

	const handleRemoveQueueItem = (item: MenuItem) => {
		setQueuedItems((prev) =>
			prev.filter((queuedItem) => queuedItem.dishName !== item.dishName)
		);
	};

	return (
		<>
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
			>
				<ThemedView style={styles.container}>
					<ThemedText type="title" style={styles.heading}>
						Manage Menu Items
					</ThemedText>
					<ThemedButton
						title="Add Menu Item"
						onPress={() => setShowModal(true)}
					/>
					<ThemedText type="subtitle" style={styles.addedItemsTitle}>
						Current Menu Items:
					</ThemedText>
					{menuItems.length > 0 ? (
						<AddedItemsDisplay
							addItems={menuItems}
							onItemRemove={handleRemoveItem}
						/>
					) : (
						<ThemedView style={styles.emptyState}>
							<ThemedText type="subtitle">
								No items in the menu yet
							</ThemedText>
						</ThemedView>
					)}
				</ThemedView>
			</ParallaxScrollView>

			<Modal visible={showModal} transparent={true}>
				<ThemedView style={styles.modalOverlay}>
					<ThemedView
						style={[
							styles.modalContent,
							{ backgroundColor: modalBackgroundColor },
						]}
					>
						<ScrollView
							contentContainerStyle={styles.scrollViewContent}
						>
							<MenuItemForm onAddItem={handleAddItem} />
							<ThemedText
								type="subtitle"
								style={styles.queuedItemsTitle}
							>
								Queued Items:
							</ThemedText>
							<AddedItemsDisplay
								addItems={queuedItems}
								onItemRemove={handleRemoveQueueItem}
							/>
							{queuedItems.length > 0 && (
								<ThemedButton
									title="Confirm Add to Menu"
									onPress={handleConfirmAddToMenu}
								/>
							)}
						</ScrollView>
						<ThemedButton
							title="Close"
							onPress={() => setShowModal(false)}
							style={styles.closeButton}
						/>
					</ThemedView>
				</ThemedView>
			</Modal>

			{showNotification && (
				<Notification
					message="Menu Item(s) added successfully!"
					onHide={() => setShowNotification(false)}
				/>
			)}
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
		fontWeight: "bold",
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		maxHeight: "80%",
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		position: "relative",
	},
	scrollViewContent: {
		paddingTop: 50,
	},
	queuedItemsTitle: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: "bold",
	},
	closeButton: {
		marginTop: 20,
	},
});
