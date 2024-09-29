import React from 'react';
import { StyleSheet } from 'react-native';
import { MenuItem } from '../../model/menu-item';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Props {
    menuItems: MenuItem[];
}

const MenuDisplay = ({ menuItems }: Props) => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.totalItems}>Total Items: {menuItems.length}</ThemedText>
            {menuItems.map((item) => (
                <ThemedView key={item.dishName} style={styles.itemContainer}>
                    <ThemedText type="subtitle" style={styles.dishName}>{item.dishName}</ThemedText>
                    <ThemedText style={styles.description}>{item.description}</ThemedText>
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Courses:</ThemedText>
                    {item.courses.map((course, index) => (
                        <ThemedText
                            key={index}
                            style={styles.courseItem}
                        >{`${course.name} (${course.courseType}) - R${course.price.toFixed(2)}`}</ThemedText>
                    ))}
                    <ThemedText type="defaultSemiBold" style={styles.price}>Total Price: R{item.price.toFixed(2)}</ThemedText>
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
        fontWeight: 'bold',
    },
    itemContainer: {
        marginBottom: 20,
        padding: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    dishName: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 10,
        fontSize: 16,
    },
    sectionTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    courseItem: {
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 16,
    },
    price: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MenuDisplay;
