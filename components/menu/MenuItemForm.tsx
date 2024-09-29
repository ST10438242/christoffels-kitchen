import React, { useState } from "react";
import { MenuItem } from "../../model/menu-item";
import { StyleSheet } from "react-native";
import { Course, courses } from "../../model/course";
import Checkbox from "expo-checkbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";

interface Props {
	onAddItem: (item: MenuItem) => void;
}

const MenuItemForm: React.FC<Props> = ({ onAddItem }) => {
	const [dishName, setDishName] = useState("");
	const [description, setDescription] = useState("");
	const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
	const [price, setPrice] = useState(0);

	const toggleCourse = (course: Course) => {
		setSelectedCourses((prev) =>
			prev.includes(course)
				? prev.filter((c) => c !== course)
				: [...prev, course]
		);
	};

	const handleAddItem = () => {
		if (dishName && description && selectedCourses.length > 0 && price) {
			onAddItem(
				new MenuItem(
					dishName,
					description,
					selectedCourses,
					Number(price)
				)
			);
			resetForm();
		} else {
			alert("Please fill all fields");
		}
	};

	const resetForm = () => {
		setDishName("");
		setDescription("");
		setSelectedCourses([]);
		setPrice(0);
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedTextInput
				style={styles.input}
				placeholder="Dish Name"
				value={dishName}
				onChangeText={setDishName}
			/>
			<ThemedTextInput
				style={styles.input}
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
				multiline
				numberOfLines={3}
			/>
			<ThemedTextInput
				style={styles.input}
				placeholder="Price"
				value={price.toString()}
				onChangeText={(text) => setPrice(Number(text))}
				keyboardType="numeric"
			/>
			<ThemedText type="subtitle" style={styles.sectionTitle}>Select Courses:</ThemedText>
			<ThemedView style={styles.checkboxContainer}>
				{courses.map((course) => (
					<ThemedView key={course.name} style={styles.checkbox}>
						<Checkbox
							value={selectedCourses.includes(course)}
							onValueChange={() => toggleCourse(course)}
							color={selectedCourses.includes(course) ? '#4630EB' : undefined}
						/>
						<ThemedText style={styles.checkboxLabel}>
							{`${course.name} (${course.courseType}) - R${course.price.toFixed(2)}`}
						</ThemedText>
					</ThemedView>
				))}
			</ThemedView>
			<ThemedButton title="Add Item" onPress={handleAddItem} style={styles.button} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		marginBottom: 15,
	},
	sectionTitle: {
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold',
	},
	checkboxContainer: {
		marginBottom: 20,
	},
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	checkboxLabel: {
		marginLeft: 10,
		fontSize: 16,
	},
	button: {
		marginTop: 10,
	},
});

export default MenuItemForm;
