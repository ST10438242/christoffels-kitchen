import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuItem } from './model/menu-item';
import { useState } from 'react';
import MenuItemForm from './component/MenuItemForm';
import MenuDisplay from './component/MenuDisplay';

export default function App() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const handleAddItem = (item: MenuItem) => {
        setMenuItems([...menuItems, item]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Christoffel's Kitchen</Text>
                <StatusBar style="auto" />
            </View>
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollViewContent}>
                <MenuItemForm onAddItem={handleAddItem} />
                <MenuDisplay menuItems={menuItems} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
        paddingBottom: 100,
    },
});
