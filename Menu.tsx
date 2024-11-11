import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuProps {
  navigation: MenuScreenNavigationProp;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Course {
  course: string;
  data: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const [menuItems] = useState<Course[]>([
    {
      course: 'Starters',
      data: [
        { id: '1', name: 'Fried Potato', description: 'Crispy fried potatoes', price: 150 },
        { id: '2', name: 'Rolled Bread with Baked Beans', description: 'Fresh bread rolls served with baked beans', price: 300 },
      ],
    },
    {
      course: 'Mains',
      data: [
        { id: '3', name: 'Spaghetti', description: 'Delicious spaghetti with tomato sauce', price: 750 },
        { id: '4', name: 'Pap, Cabbage, and Chicken', description: 'Traditional dish with pap, cabbage, and grilled chicken', price: 1500 },
      ],
    },
    {
      course: 'Desserts',
      data: [
        { id: '5', name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: 850 },
        { id: '6', name: 'Chocolate Cake', description: 'Decadent chocolate cake', price: 600 },
      ],
    },
  ]);

  const [cart, setCart] = useState<MenuItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(menuItems[0].course);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => [...prevCart, item]);
    setTotalPrice((prevTotal) => prevTotal + item.price);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const filteredMenu = menuItems.find((menu) => menu.course === selectedCourse)?.data || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <View style={styles.courseButtons}>
        {menuItems.map((menu) => (
          <TouchableOpacity
            key={menu.course}
            style={[styles.courseButton, selectedCourse === menu.course && styles.selectedCourseButton]}
            onPress={() => setSelectedCourse(menu.course)}
          >
            <Text style={[styles.courseButtonText, selectedCourse === menu.course && styles.selectedCourseButtonText]}>
              {menu.course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: R{item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cartSummary}>
        <Text style={styles.totalText}>Total: R{totalPrice}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Payment', { cartItems: cart, totalPrice })}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* New Manage Menu Button */}
      <TouchableOpacity
        style={styles.manageMenuButton}
        onPress={() => navigation.navigate('ManageMenu')}
      >
        <Text style={styles.manageMenuButtonText}>Manage Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  courseButtons: { flexDirection: 'row', marginBottom: 16 },
  courseButton: { padding: 8, marginHorizontal: 4, borderRadius: 8, backgroundColor: '#ddd' },
  selectedCourseButton: { backgroundColor: '#007bff' },
  courseButtonText: { color: '#333' },
  selectedCourseButtonText: { color: '#fff' },
  menuItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  dishName: { fontSize: 18, fontWeight: 'bold' },
  description: { color: '#666', marginBottom: 8 },
  price: { color: '#007bff', marginBottom: 8 },
  addButton: { backgroundColor: '#007bff', padding: 8, borderRadius: 4 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  cartSummary: { marginTop: 16, alignItems: 'center' },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { marginTop: 8, backgroundColor: '#28a745', padding: 12, borderRadius: 8 },
  checkoutButtonText: { color: '#fff', fontWeight: 'bold' },
  manageMenuButton: { 
    marginTop: 16, 
    backgroundColor: '#6c757d', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center'
  },
  manageMenuButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default Menu;
