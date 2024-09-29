import React, { useState } from "react";
import {
	StyleSheet,
	Modal,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMenuItems } from "../../hooks/use-menu-items";
import MenuDisplay from "../../components/menu/MenuDisplay";
import { MenuItem } from "../../model/menu-item";
import { useThemeColor } from "@/hooks/useThemeColor";

const placeholderImage = require("../../assets/images/icon.png");

export default function Menu() {
	const { menuItems, removeMenuItem } = useMenuItems();
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const backgroundColor = useThemeColor({}, "background");

	const handleItemPress = (item: MenuItem) => {
		setSelectedItem(item);
	};

	const handleItemRemove = (dishName: string) => {
		removeMenuItem(dishName);
	};

	const renderItemModal = () => (
		<Modal
			visible={!!selectedItem}
			transparent={true}
			animationType="slide"
			onRequestClose={() => setSelectedItem(null)}
		>
				<ThemedView style={styles.modalOverlay}>
					<ThemedView style={[styles.modalContent, { backgroundColor }]}>
						<ScrollView>
							{selectedItem && (
								<>
									<ThemedText style={styles.modalTitle}>
										{selectedItem.dishName}
									</ThemedText>
									<ThemedText style={styles.modalDescription}>
										{selectedItem.description}
									</ThemedText>
									<ThemedText style={styles.modalSectionTitle}>
										Courses:
									</ThemedText>
									{selectedItem.courses.map((course, index) => (
										<ThemedView
											key={index}
											style={styles.modalCourseContainer}
										>
											<Image
												style={styles.modalCourseImage}
												source={
													course.image.includes("http")
														? { uri: course.image }
														: `../../${course.image}`
														? `../../${course.image}`
														: placeholderImage
												}
												placeholder={placeholderImage}
												contentFit="cover"
												transition={300}
											/>
											<ThemedView
												style={styles.modalCourseDetails}
											>
												<ThemedText
													style={styles.modalCourseName}
												>
													{course.name} (
													{course.courseType})
												</ThemedText>
												<ThemedText
													style={
														styles.modalCourseDescription
													}
												>
													{course.description}
												</ThemedText>
												<ThemedText
													style={styles.modalCoursePrice}
												>
													R{course.price.toFixed(2)}
												</ThemedText>
											</ThemedView>
										</ThemedView>
									))}
									<ThemedText style={styles.modalPrice}>
										Total Price: R
										{selectedItem.price.toFixed(2)}
									</ThemedText>
								</>
							)}
						</ScrollView>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setSelectedItem(null)}
						>
							<ThemedText style={styles.closeButtonText}>
								Close
							</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				</ThemedView>
		</Modal>
	);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
		>
			<ThemedView style={styles.container}>
				<ThemedText type="title" style={styles.heading}>
					Menu
				</ThemedText>
				{menuItems.length > 0 ? (
					<MenuDisplay
						menuItems={menuItems}
						onItemPress={handleItemPress}
						onItemRemove={handleItemRemove}
					/>
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
				{renderItemModal()}
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
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		maxHeight: "80%",
		borderRadius: 10,
		padding: 20,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalDescription: {
		fontSize: 16,
		marginBottom: 15,
	},
	modalSectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 5,
	},
	modalCourseContainer: {
		flexDirection: "row",
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingBottom: 10,
	},
	modalCourseImage: {
		width: 80,
		height: 80,
		borderRadius: 5,
		marginRight: 10,
	},
	modalCourseDetails: {
		flex: 1,
	},
	modalCourseName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	modalCourseDescription: {
		fontSize: 14,
		marginBottom: 5,
	},
	modalCoursePrice: {
		fontSize: 14,
		fontWeight: "bold",
	},
	modalPrice: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
	},
	closeButton: {
		backgroundColor: "#27ae60", // Medium green color
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
