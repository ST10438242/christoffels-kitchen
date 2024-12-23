import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MenuItem } from "../../model/menu-item";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { averagePriceOfCoursesInMenuItem } from "@/lib/helper";
import { Image } from "expo-image";
import { generateUniqueId } from "@/global/global-variable";

export const placeholderImage = require("../../assets/images/icon.png");

interface Props {
	menuItems: MenuItem[];
	onItemPress: (item: MenuItem) => void;
}

const MenuDisplay = ({ menuItems, onItemPress }: Props) => {
	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.totalItems}>
				Total Items: {menuItems.length}
			</ThemedText>
			{menuItems.map((item) => (
				<ThemedView
					key={`${item.dishName}-${item.price}-${generateUniqueId()}`}
					style={styles.itemContainer}
				>
					<TouchableOpacity
						onPress={() => onItemPress(item)}
						style={styles.itemContent}
					>
						<ThemedText type="subtitle" style={styles.dishName}>
							{item.dishName}
						</ThemedText>

						<Image
							style={styles.modalCourseImage}
							source={
								item.courses[0].image.includes("http")
									? { uri: item.courses[0].image }
									: `../../${item.courses[0].image}`
									? `../../${item.courses[0].image}`
									: placeholderImage
							}
							placeholder={placeholderImage}
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

export default MenuDisplay;
