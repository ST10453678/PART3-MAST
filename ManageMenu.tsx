import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

interface Course {
  course: string;
  data: MenuItem[];
}

const coursesData: Course[] = [
  {
    course: 'Starters',
    data: [
      { id: '1', name: 'Fried Potato', description: 'Crispy fried potatoes', price: 150, course: 'Starters' },
      { id: '2', name: 'Rolled Bread with Baked Beans', description: 'Fresh bread rolls served with baked beans', price: 300, course: 'Starters' },
    ],
  },
  {
    course: 'Mains',
    data: [
      { id: '3', name: 'Spaghetti', description: 'Delicious spaghetti with tomato sauce', price: 750, course: 'Mains' },
      { id: '4', name: 'Pap, Cabbage, and Chicken', description: 'Traditional dish with pap, cabbage, and grilled chicken', price: 1500, course: 'Mains' },
    ],
  },
  {
    course: 'Desserts',
    data: [
      { id: '5', name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: 850, course: 'Desserts' },
      { id: '6', name: 'Chocolate Cake', description: 'Decadent chocolate cake', price: 600, course: 'Desserts' },
    ],
  },
];

const ManageMenu: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('Starters');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
  const [showDishModal, setShowDishModal] = useState<boolean>(false);

  // Handle adding a menu item
  const addItem = () => {
    if (selectedDish) {
      setMenuItems([...menuItems, selectedDish]);
      setSelectedDish(null);
    }
  };

  // Handle removing a menu item
  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Handle course selection and show corresponding dishes
  const selectCourse = (course: string) => {
    setSelectedCourse(course);
    setShowCourseModal(false); // Close course modal after selection
    setSelectedDish(null); // Reset selected dish
  };

  // Handle dish selection from the modal
  const selectDish = (dish: MenuItem) => {
    setSelectedDish(dish);
    setShowDishModal(false); // Close dish modal after selection
  };

  // Navigate to the Payment page with selected items
  const goToPaymentPage = () => {
    navigation.navigate('Payment', { cartItems: menuItems, totalPrice: calculateTotal() });
  };

  // Calculate the total price of the menu items in the cart
  const calculateTotal = () => {
    return menuItems.reduce((total, item) => total + item.price, 0);
  };

  // Get available dishes for the selected course
  const getAvailableDishes = () => {
    const course = coursesData.find(course => course.course === selectedCourse);
    return course ? course.data : [];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>

      {/* Select Course Button */}
      <Button title={`Select Course: ${selectedCourse}`} onPress={() => setShowCourseModal(true)} />

      {/* Course Modal */}
      <Modal visible={showCourseModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Course</Text>
            {coursesData.map((course) => (
              <Button
                key={course.course}
                title={course.course}
                onPress={() => selectCourse(course.course)}
              />
            ))}
            <Button title="Close" onPress={() => setShowCourseModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Select Dish Button */}
      <Button title={selectedDish ? `Selected Dish: ${selectedDish.name}` : 'Select Dish'} onPress={() => setShowDishModal(true)} disabled={!selectedCourse} />

      {/* Dish Modal */}
      <Modal visible={showDishModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Dish</Text>
            {getAvailableDishes().map((dish) => (
              <Button
                key={dish.id}
                title={`${dish.name} - R${dish.price}`}
                onPress={() => selectDish(dish)}
              />
            ))}
            <Button title="Close" onPress={() => setShowDishModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Add Item Button */}
      <Button title="Add Item" onPress={addItem} disabled={!selectedDish} />

      {/* Display Added Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - R{item.price} ({item.course})</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />

      {/* Button to go to the Filter Menu */}
      <Button title="Go to Filter Menu" onPress={() => navigation.navigate('FilterMenu')} />

      {/* Button to go to the Payment Page */}
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ManageMenu;
