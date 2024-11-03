import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { useMenuItems } from "../../hooks/use-menu-items";
import { MenuItem } from "../../model/menu-item";

const MenuManagement = () => {
	const { menuItems, removeMenuItem, addedItems, setAddedItems } =
		useMenuItems(); // Assuming addedItems is managed in context

	const handleRemoveFromMenu = (dishName: string) => {
		removeMenuItem(dishName);
	};
	const handleRemoveFromPreview = (item: MenuItem) => {
		setAddedItems((prev: MenuItem[]) =>
			prev.filter((i: MenuItem) => i.dishName !== item.dishName)
		);
	};

	const renderItem = ({ item }: { item: MenuItem }) => (
		<ThemedView style={styles.itemContainer}>
			<ThemedText style={styles.dishName}>{item.dishName}</ThemedText>
			<ThemedText style={styles.description}>
				{item.description}
			</ThemedText>
			<ThemedText style={styles.price}>
				Price: R{item.price.toFixed(2)}
			</ThemedText>
			<ThemedButton
				title="Remove from Menu"
				onPress={() => handleRemoveFromMenu(item.dishName)}
			/>
			<ThemedButton
				title="Remove from Preview"
				onPress={() => handleRemoveFromPreview(item)}
			/>
		</ThemedView>
	);

	return (
		<View style={styles.container}>
			<ThemedText type="title" style={styles.heading}>
				Menu Management
			</ThemedText>
			<ThemedText type="subtitle" style={styles.subheading}>
				Preview List
			</ThemedText>
			<FlatList
				data={addedItems}
				renderItem={renderItem}
				keyExtractor={(item) => item.dishName}
			/>
			<ThemedText type="subtitle" style={styles.subheading}>
				Menu Items
			</ThemedText>
			<FlatList
				data={menuItems}
				renderItem={renderItem}
				keyExtractor={(item) => item.dishName}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	subheading: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
	},
	itemContainer: {
		marginBottom: 15,
		padding: 15,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 8,
	},
	dishName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
		marginBottom: 5,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default MenuManagement;
