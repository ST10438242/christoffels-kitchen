import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MenuItem } from "../model/menu-item";

interface Props {
  menuItems: MenuItem[];
}

const MenuDisplay = ({ menuItems }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu</Text>
      <Text>Total Items: {menuItems.length}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text>{item.description}</Text>
            <Text>Courses:</Text>
            {item.courses.map((course, index) => (
              <Text
                key={index}
              >{`${course.name} (${course.courseType}) - $${course.price.toFixed(2)}`}</Text>
            ))}
            <Text style={styles.price}>
              Total Price: ${item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontWeight: "bold",
  },
});

export default MenuDisplay;
