import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Define the RootStackParamList to type your stack if needed, e.g., 'Menu'
type RootStackParamList = {
  Menu: undefined; // Add more screens as needed
  GuestMenu: undefined; // Add GuestMenu screen here
};

// Define the type for navigation props
type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();

  // Dishes with descriptions and prices
  const dishes = [
    {
      name: 'Fried Potato',
      description: 'Golden crispy fried potatoes, seasoned with a touch of salt and pepper.',
      price: 150,
    },
    {
      name: 'Rolled Bread with Baked Beans',
      description: 'Soft, freshly baked bread rolls, served with rich and flavorful baked beans.',
      price: 300,
    },
    {
      name: 'Spaghetti',
      description: 'A plate of spaghetti topped with rich, savory tomato sauce and fresh basil.',
      price: 750,
    },
    {
      name: 'Pap, Cabbage, and Chicken',
      description: 'A traditional African dish consisting of soft pap, seasoned cabbage, and grilled chicken.',
      price: 1500,
    },
    {
      name: 'Chocolate Ice Cream',
      description: 'Creamy and decadent chocolate ice cream, made with the finest cocoa beans.',
      price: 500,
    },
    {
      name: 'Chocolate Cake',
      description: 'A rich, moist chocolate cake topped with a smooth chocolate ganache.',
      price: 1200,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar / Drawer Button */}
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        accessibilityLabel="Open Navigation Drawer"
        accessibilityHint="Opens the side navigation drawer."
      >
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Welcome to Chicken Dust Express</Text>

        <Text style={styles.subtitle}>
          Explore a World of Flavors and Culinary Techniques
        </Text>

        <Text style={styles.description}>
          Discover a curated selection of recipes, culinary tips, and techniques, 
          all designed to elevate your cooking experience. Whether you're a novice 
          or a seasoned chef, you'll find inspiration and guidance to help you 
          master the art of cooking. Get started by browsing the menu or exploring 
          our expert tips and guides.
        </Text>

        {/* Display Dishes with Descriptions */}
        {dishes.map((dish, index) => (
          <View key={index} style={styles.dishContainer}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishDescription}>{dish.description}</Text>
            <Text style={styles.dishPrice}>Price: R{dish.price}</Text>
          </View>
        ))}

        {/* Button to Navigate to the Menu */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Menu')}
          accessibilityLabel="Explore the Menu"
          accessibilityHint="Navigate to the Menu screen."
        >
          <Text style={styles.buttonText}>Explore the Menu</Text>
        </TouchableOpacity>

        {/* Button to Navigate to the Guest Menu */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('GuestMenu')}
          accessibilityLabel="Explore the Guest Menu"
          accessibilityHint="Navigate to the Guest Menu screen."
        >
          <Text style={styles.buttonText}>Explore the Guest Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  drawerButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dishContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dishDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
});

export default HomePage;
