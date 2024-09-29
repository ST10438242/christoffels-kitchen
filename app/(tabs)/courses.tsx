import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { courses, CourseTypeEnum, Course } from "../../model/course";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

const placeholderImage = require("../../assets/images/icon.png");

export default function Courses() {
	const backgroundColor = useThemeColor({}, "background");

	const coursesByType = useMemo(() => {
		return Object.values(CourseTypeEnum).reduce((acc, type) => {
			acc[type] = courses.filter((course) => course.courseType === type);
			return acc;
		}, {} as Record<CourseTypeEnum, typeof courses>);
	}, []);

	const renderCourseItem = (course: Course) => (
		<View key={course.name} style={styles.courseItem}>
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
		</View>
	);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#a8e6cf", dark: "#1e8449" }}
		>
			<ThemedText type="title" style={styles.heading}>
				Courses
			</ThemedText>
			<ThemedView style={[styles.container, { backgroundColor }]}>
				{Object.entries(coursesByType).map(([type, typeCourses]) => (
					<View key={type}>
						<ThemedText type="subtitle" style={styles.sectionTitle}>
							{type}
						</ThemedText>
						{typeCourses.map(renderCourseItem)}
					</View>
				))}
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
		marginTop: 15,
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
});
