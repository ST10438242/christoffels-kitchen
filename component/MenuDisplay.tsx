import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from '../model/menu-item';

interface Props {
    menuItems: MenuItem[];
}

const MenuDisplay = ({ menuItems }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Menu</Text>
            <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.dishName}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.dishName}>{item.dishName}</Text>
                        <Text>{item.description}</Text>
                        <Text style={styles.coursesHeading}>Courses:</Text>
                        {item.courses.map((course, index) => (
                            <Text
                                key={index}
                                style={styles.courseItem}
                            >{`${course.name} (${course.courseType}) - R${course.price.toFixed(2)}`}</Text>
                        ))}
                        <Text style={styles.price}>Total Price: R{item.price.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    totalItems: {
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    dishName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    coursesHeading: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    courseItem: {
        marginLeft: 10,
    },
    price: {
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default MenuDisplay;
