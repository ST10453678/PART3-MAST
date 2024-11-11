import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

const ManageMenu: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Spaghetti', description: 'Tomato sauce pasta', price: 750, course: 'Mains' },
    { id: '2', name: 'Fried Potato', description: 'Crispy fried potatoes', price: 150, course: 'Starters' },
    { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate cake', price: 600, course: 'Desserts' },
    { id: '4', name: 'Rolled Bread with Baked Beans', description: 'Fresh bread rolls served with baked beans', price: 300, course: 'Starters' },
    { id: '5', name: 'Pap, Cabbage, and Chicken', description: 'Traditional dish with pap, cabbage, and grilled chicken', price: 1500, course: 'Mains' },
    { id: '6', name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: 850, course: 'Desserts' },
  ]);

  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [courseOpen, setCourseOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  useEffect(() => {
    filterMenu();
  }, [selectedCourse, priceRange]);

  const filterMenu = () => {
    let filtered = menuItems;

    if (selectedCourse !== 'All') {
      filtered = filtered.filter(item => item.course === selectedCourse);
    }

    if (priceRange !== 'All') {
      const priceLimit = Number(priceRange);
      filtered = filtered.filter(item => item.price <= priceLimit);
    }

    setFilteredItems(filtered);
  };

  const goToPaymentPage = () => {
    navigation.navigate('Payment', { cartItems: filteredItems, totalPrice: calculateTotal() });
  };

  const calculateTotal = () => {
    return filteredItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <Text style={styles.label}>Select Course</Text>
      <DropDownPicker
        open={courseOpen}
        value={selectedCourse}
        items={[
          { label: 'All Courses', value: 'All' },
          { label: 'Starters', value: 'Starters' },
          { label: 'Mains', value: 'Mains' },
          { label: 'Desserts', value: 'Desserts' },
        ]}
        setOpen={setCourseOpen}
        setValue={setSelectedCourse}
        style={styles.picker}
        placeholder="Select Course"
      />

      <Text style={styles.label}>Select Price Range</Text>
      <DropDownPicker
        open={priceOpen}
        value={priceRange}
        items={[
          { label: 'All Prices', value: 'All' },
          { label: 'Up to R200', value: '200' },
          { label: 'Up to R500', value: '500' },
          { label: 'Up to R1000', value: '1000' },
        ]}
        setOpen={setPriceOpen}
        setValue={setPriceRange}
        style={styles.picker}
        placeholder="Select Price Range"
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name} - R{item.price} ({item.course})</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        )}
      />

      <Button title="Go to Payment" onPress={goToPaymentPage} />
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
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
    flexWrap: 'wrap', // Ensures text does not overflow horizontally
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'justify', // Ensures the description is neatly aligned
    lineHeight: 20,
    flexWrap: 'wrap', // Prevents description text from overflowing
  },
});

export default ManageMenu;
