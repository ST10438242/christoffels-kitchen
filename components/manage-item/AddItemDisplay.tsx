import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MenuItem } from "../../model/menu-item";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { averagePriceOfCoursesInMenuItem } from "@/lib/helper";
import { Image } from "expo-image";

interface Props {
	addItems: MenuItem[];
	onItemRemove: (item: MenuItem) => void;
}

const AddedItemsDisplay = ({ addItems, onItemRemove }: Props) => {
	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.totalItems}>
				Total Items: {addItems.length}
			</ThemedText>
			{addItems.map((item, index) => (
				<ThemedView
					key={`${item.dishName}-${item.price}-${index}`}
					style={styles.itemContainer}
				>
					<TouchableOpacity style={styles.itemContent}>
						<ThemedText type="subtitle" style={styles.dishName}>
							{item.dishName}
						</ThemedText>
						<Image
							style={styles.modalCourseImage}
							source={
								item.courses[0].image.includes("http")
									? { uri: item.courses[0].image }
									: require("../../assets/images/icon.png") // Placeholder image
							}
							contentFit="cover"
							transition={300}
						/>
						<ThemedText style={styles.description}>
							{item.description}
						</ThemedText>
						<ThemedText style={styles.courseCount}>
							Courses: {item.courses.length}
						</ThemedText>
						<ThemedText type="defaultSemiBold" style={styles.price}>
							Average Price: R
							{averagePriceOfCoursesInMenuItem(item).toFixed(2)}
						</ThemedText>
						<ThemedText type="defaultSemiBold" style={styles.price}>
							Total Price: R{item.price.toFixed(2)}
						</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onItemRemove(item)}
						style={styles.removeButton}
					>
						<Ionicons name="trash-outline" size={24} color="red" />
					</TouchableOpacity>
				</ThemedView>
			))}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	totalItems: {
		marginBottom: 15,
		fontSize: 18,
		fontWeight: "bold",
	},
	itemContainer: {
		flexDirection: "row",
		marginBottom: 20,
		padding: 15,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 8,
	},
	itemContent: {
		flex: 1,
	},
	removeButton: {
		justifyContent: "center",
		marginLeft: 10,
	},
	dishName: {
		marginBottom: 10,
		fontSize: 20,
		fontWeight: "bold",
	},
	description: {
		marginBottom: 10,
		fontSize: 16,
	},
	courseCount: {
		marginBottom: 10,
		fontSize: 14,
		fontStyle: "italic",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},
	modalCourseImage: {
		width: 80,
		height: 80,
		borderRadius: 5,
		marginRight: 10,
	},
});

export default AddedItemsDisplay;
