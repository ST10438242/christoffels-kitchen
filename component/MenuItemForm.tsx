import React, { useState } from 'react';
import { MenuItem } from '../model/menu-item';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Course, courses } from '../model/course';
import Checkbox from 'expo-checkbox';

interface Props {
    onAddItem: (item: MenuItem) => void;
}

const MenuItemForm: React.FC<Props> = ({ onAddItem }) => {
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [price, setPrice] = useState(0);

    const toggleCourse = (course: Course) => {
        setSelectedCourses((prev) =>
            prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course],
        );
    };

    const handleAddItem = () => {
        if (dishName && description && selectedCourses.length > 0 && price) {
            onAddItem(new MenuItem(dishName, description, selectedCourses, price));
            resetForm();
        } else {
            alert('Please fill all fields');
        }
    };

    const resetForm = () => {
        setDishName('');
        setDescription('');
        setSelectedCourses([]);
        setPrice(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Menu Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Dish Name"
                value={dishName}
                onChangeText={setDishName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price.toString()}
                onChangeText={(text) => setPrice(Number(text))}
                keyboardType="numeric"
            />
            <View>
                <Text>Select Courses:</Text>
                <View style={styles.checkboxContainer}>
                    {courses.map((course) => (
                        <View key={course.name} style={styles.checkbox}>
                            <Checkbox
                                value={selectedCourses.includes(course)}
                                onValueChange={() => toggleCourse(course)}
                            />
                            <Text>{`${course.name} (${course.courseType}) - R${course.price.toFixed(2)}`}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Button title="Add Item" onPress={handleAddItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        marginBottom: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MenuItemForm;
