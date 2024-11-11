import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

const GuestMenu: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Static menu items for the guest view (this can be updated dynamically as needed)
  const menuItems: MenuItem[] = [
    { id: '1', name: 'Spaghetti', description: 'Tomato sauce pasta', price: 750, course: 'Mains' },
    { id: '2', name: 'Fried Potato', description: 'Crispy fried potatoes', price: 150, course: 'Starters' },
    { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate cake', price: 600, course: 'Desserts' },
    { id: '4', name: 'Rolled Bread with Baked Beans', description: 'Fresh bread rolls served with baked beans', price: 300, course: 'Starters' },
    { id: '5', name: 'Pap, Cabbage, and Chicken', description: 'Traditional dish with pap, cabbage, and grilled chicken', price: 1500, course: 'Mains' },
    { id: '6', name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: 850, course: 'Desserts' },
  ];

  const goToDescriptionPage = (item: MenuItem) => {
    // Navigate to the Description page with the selected item details
    navigation.navigate('Description', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name} - R{item.price}</Text>
            <Text style={styles.courseText}>{item.course}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToDescriptionPage(item)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'column',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  courseText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GuestMenu;
