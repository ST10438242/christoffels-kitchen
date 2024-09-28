import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MenuItem } from './model/menu-item';
import { useState } from 'react';
import MenuItemForm from './component/MenuItemForm';
import MenuDisplay from './component/MenuDisplay';

export default function App() {
    const [menuItems,  setMenuItems] = useState<MenuItem[]>([]);

    const handleAddItem = (item: MenuItem) => {
      setMenuItems([...menuItems, item]);
    }

    return (
        <View style={styles.container}>
            <Text>christoffels-kitchen!</Text>
            {/* <StatusBar style="auto" /> */}
            <MenuItemForm onAddItem={handleAddItem}></MenuItemForm>
            <MenuDisplay menuItems={menuItems}></MenuDisplay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
