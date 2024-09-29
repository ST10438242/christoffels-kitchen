import React, { useState, useEffect } from "react";
import { MenuItem } from "../../model/menu-item";
import { StyleSheet, Dimensions } from "react-native";
import { Course, courses } from "../../model/course";
import Checkbox from "expo-checkbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
	onAddItem: (item: MenuItem) => void;
}

const MenuItemForm: React.FC<Props> = ({ onAddItem }) => {
	const [dishName, setDishName] = useState("");
	const [description, setDescription] = useState("");
	const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
	const [price, setPrice] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
	const [showErrors, setShowErrors] = useState(false);

	const animationProgress = useSharedValue(0);
	const buttonShake = useSharedValue(0);

	useEffect(() => {
		setIsFormValid(
			dishName !== "" &&
			description !== "" &&
			selectedCourses.length > 0 &&
			price !== "" &&
			!isNaN(Number(price))
		);
	}, [dishName, description, selectedCourses, price]);

	const isFieldValid = (field: string): boolean => {
		switch (field) {
			case 'dishName':
				return dishName.trim() !== '';
			case 'description':
				return description.trim() !== '';
			case 'price':
				return price !== '' && !isNaN(Number(price));
			case 'courses':
				return selectedCourses.length > 0;
			default:
				return true;
		}
	};

	const handleFieldBlur = (field: string) => {
		setTouchedFields(prev => new Set(prev).add(field));
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: withSpring(animationProgress.value * -width) },
				{ translateY: withSpring(animationProgress.value * height) },
				{ scale: withSpring(1 - animationProgress.value * 0.5) },
			],
			opacity: withSpring(1 - animationProgress.value),
		};
	});

	const buttonAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: buttonShake.value }],
		};
	});

	const toggleCourse = (course: Course) => {
		setSelectedCourses((prev) =>
			prev.includes(course)
				? prev.filter((c) => c !== course)
				: [...prev, course]
		);
	};

	const handleAddItem = () => {
		setShowErrors(true);
		if (isFormValid) {
			onAddItem(
				new MenuItem(
					dishName,
					description,
					selectedCourses,
					Number(price)
				)
			);
			animationProgress.value = withSequence(
				withTiming(1, { duration: 300 }),
				withTiming(0, { duration: 300 })
			);
			setTimeout(resetForm, 600);
		} else {
			buttonShake.value = withRepeat(
				withSequence(
					withTiming(-10, { duration: 50, easing: Easing.linear }),
					withTiming(10, { duration: 100, easing: Easing.linear }),
					withTiming(0, { duration: 50, easing: Easing.linear })
				),
				3
			);
		}
	};

	const resetForm = () => {
		setDishName("");
		setDescription("");
		setSelectedCourses([]);
		setPrice("");
		setShowErrors(false);
	};

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<View style={styles.inputContainer}>
				<ThemedTextInput
					style={[styles.input, showErrors && !isFieldValid('dishName') && styles.invalidInput]}
					placeholder="Dish Name *"
					value={dishName}
					onChangeText={setDishName}
					onBlur={() => handleFieldBlur('dishName')}
				/>
				{showErrors && !isFieldValid('dishName') && <ThemedText style={styles.errorText}>Dish name is required</ThemedText>}
			</View>
			
			<View style={styles.inputContainer}>
				<ThemedTextInput
					style={[styles.input, showErrors && !isFieldValid('description') && styles.invalidInput]}
					placeholder="Description *"
					value={description}
					onChangeText={setDescription}
					onBlur={() => handleFieldBlur('description')}
					multiline
					numberOfLines={3}
				/>
				{showErrors && !isFieldValid('description') && <ThemedText style={styles.errorText}>Description is required</ThemedText>}
			</View>
			
			<View style={styles.inputContainer}>
				<ThemedTextInput
					style={[styles.input, showErrors && !isFieldValid('price') && styles.invalidInput]}
					placeholder="Price *"
					value={price}
					onChangeText={setPrice}
					onBlur={() => handleFieldBlur('price')}
					keyboardType="numeric"
				/>
				{showErrors && !isFieldValid('price') && <ThemedText style={styles.errorText}>Valid price is required</ThemedText>}
			</View>
			
			<ThemedText type="subtitle" style={styles.sectionTitle}>Select Courses: *</ThemedText>
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
			{showErrors && !isFieldValid('courses') && <ThemedText style={styles.errorText}>At least one course must be selected</ThemedText>}

			<Animated.View style={buttonAnimatedStyle}>
				<ThemedButton 
					title="Add Item" 
					onPress={handleAddItem} 
					style={styles.button}
				/>
			</Animated.View>
		</Animated.View>
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
	inputContainer: {
		marginBottom: 15,
	},
	invalidInput: {
		borderColor: 'red',
		borderWidth: 1,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},
});

export default MenuItemForm;