import React, { useMemo, useState } from "react";
import {
	StyleSheet,
	View,
	Modal,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { courses, CourseTypeEnum, Course } from "../../model/course";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { generateUniqueId } from "@/global/global-variable";
import { Picker } from "@react-native-picker/picker";

const placeholderImage = require("../../assets/images/icon.png");

export default function Courses() {
	const backgroundColor = useThemeColor({}, "background");
	const pickerColor = useThemeColor({}, "text");
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [selectedType, setSelectedType] = useState<CourseTypeEnum | "All">(
		"All"
	);

	const filteredCourses = useMemo(() => {
		if (selectedType === "All") {
			return courses;
		}
		return courses.filter((course) => course.courseType === selectedType);
	}, [selectedType]);

	const renderCourseItem = (course: Course) => (
		<TouchableOpacity
			key={course.name + generateUniqueId()}
			style={styles.courseItem}
			onPress={() => setSelectedCourse(course)}
		>
			<Image
				style={styles.courseImage}
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
			<View style={styles.courseDetails}>
				<ThemedText style={styles.courseName}>{course.name}</ThemedText>
				<ThemedText style={styles.coursePrice}>
					R{course.price.toFixed(2)}
				</ThemedText>
			</View>
		</TouchableOpacity>
	);

	const renderCourseModal = () => (
		<Modal
			visible={!!selectedCourse}
			transparent={true}
			animationType="slide"
			onRequestClose={() => setSelectedCourse(null)}
		>
			<View style={styles.modalOverlay}>
				<View style={[styles.modalContent, { backgroundColor }]}>
					<ScrollView>
						{selectedCourse && (
							<>
								<Image
									style={styles.modalImage}
									source={
										selectedCourse.image.includes("http")
											? { uri: selectedCourse.image }
											: `../../${selectedCourse.image}`
											? `../../${selectedCourse.image}`
											: placeholderImage
									}
									placeholder={placeholderImage}
									contentFit="cover"
									transition={300}
								/>
								<ThemedText style={styles.modalTitle}>
									{selectedCourse.name}
								</ThemedText>
								<ThemedText style={styles.modalPrice}>
									R{selectedCourse.price.toFixed(2)}
								</ThemedText>
								<ThemedText style={styles.modalDescription}>
									{selectedCourse.description}
								</ThemedText>
								<ThemedText style={styles.modalType}>
									Type: {selectedCourse.courseType}
								</ThemedText>
							</>
						)}
					</ScrollView>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setSelectedCourse(null)}
					>
						<ThemedText style={styles.closeButtonText}>
							Close
						</ThemedText>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
		>
			<ThemedView style={styles.container}>
				<ThemedText type="title" style={styles.heading}>
					Courses
				</ThemedText>
				<ThemedView style={[styles.container, { backgroundColor }]}>
					<View style={styles.filterContainer}>
						<ThemedText style={styles.filterLabel}>
							Filter by Course Type:
						</ThemedText>
						<Picker
							selectedValue={selectedType}
							style={[styles.picker, { color: pickerColor }]}
							onValueChange={(itemValue) =>
								setSelectedType(itemValue)
							}
						>
							<Picker.Item label="All" value="All" />
							{Object.values(CourseTypeEnum).map((type) => (
								<Picker.Item
									key={type}
									label={type}
									value={type}
								/>
							))}
						</Picker>
					</View>
					{filteredCourses.map(renderCourseItem)}
				</ThemedView>
				{renderCourseModal()}
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	scrollViewContent: {
		flexGrow: 1,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	heading: {
		marginBottom: 20,
		fontSize: 24,
		fontWeight: "bold",
	},
	sectionTitle: {
		marginBottom: 10,
		fontSize: 20,
		fontWeight: "bold",
	},
	courseItem: {
		flexDirection: "row",
		marginBottom: 15,
		alignItems: "center",
	},
	courseImage: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 10,
		backgroundColor: "#0553",
	},
	courseDetails: {
		flex: 1,
	},
	courseName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	coursePrice: {
		fontSize: 14,
		color: "#888",
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
	modalImage: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 15,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalPrice: {
		fontSize: 18,
		marginBottom: 15,
	},
	modalDescription: {
		fontSize: 16,
		marginBottom: 15,
	},
	modalType: {
		fontSize: 16,
		fontStyle: "italic",
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: "#27ae60",
		borderRadius: 5,
		alignItems: "center",
		marginTop: 20,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	filterContainer: {
		marginBottom: 20,
	},
	filterLabel: {
		fontSize: 16,
		marginBottom: 5,
	},
	picker: {
		height: 50,
		width: "100%",
	},
});
