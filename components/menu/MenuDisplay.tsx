import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MenuItem } from '../../model/menu-item';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from '@expo/vector-icons';

interface Props {
    menuItems: MenuItem[];
    onItemPress: (item: MenuItem) => void;
    onItemRemove: (dishName: string) => void;
}

const MenuDisplay = ({ menuItems, onItemPress, onItemRemove }: Props) => {
    const handleRemove = (dishName: string) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", onPress: () => onItemRemove(dishName), style: "destructive" }
            ]
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.totalItems}>Total Items: {menuItems.length}</ThemedText>
            {menuItems.map((item) => (
                <ThemedView key={item.dishName} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => onItemPress(item)} style={styles.itemContent}>
                        <ThemedText type="subtitle" style={styles.dishName}>{item.dishName}</ThemedText>
                        <ThemedText style={styles.description}>{item.description}</ThemedText>
                        <ThemedText style={styles.courseCount}>Courses: {item.courses.length}</ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.price}>Total Price: R{item.price.toFixed(2)}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemove(item.dishName)} style={styles.removeButton}>
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
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    itemContent: {
        flex: 1,
    },
    removeButton: {
        justifyContent: 'center',
        marginLeft: 10,
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
    courseCount: {
        marginBottom: 10,
        fontSize: 14,
        fontStyle: 'italic',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MenuDisplay;
