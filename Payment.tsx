import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

// Define the shape of the cart item (you can adjust according to your app's data)
interface CartItem {
  id: string;
  name: string;
  price: number;
}

// Type for route params, ensuring the Payment screen has 'cartItems' and 'totalPrice' as expected
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

interface PaymentProps {
  route: PaymentScreenRouteProp;
  navigation: any; // In a production app, consider typing navigation properly (e.g., using `NavigationProp` from React Navigation)
}

const Payment: React.FC<PaymentProps> = ({ route, navigation }) => {
  const { cartItems, totalPrice } = route.params;

  // Function to handle payment confirmation
  const handleConfirmPayment = () => {
    Alert.alert(
      "Payment Confirmation",
      `Confirm payment of R${totalPrice}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            // Add logic to process the payment here
            Alert.alert("Payment Successful", `You have paid R${totalPrice}.`);
            navigation.navigate('Description'); // Navigate back to Description after payment
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item: CartItem) => item.id} // Ensure the `id` is typed
        renderItem={({ item }: { item: CartItem }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>
          </View>
        )}
      />
      
      <Text style={styles.totalText}>Total: R{totalPrice}</Text>
      
      {/* Confirm Payment Button */}
      <Button title="Confirm Payment" onPress={handleConfirmPayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  itemName: { fontSize: 18, color: '#333' },
  itemPrice: { fontSize: 18, color: '#333' },
  totalText: { fontSize: 20, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
});

export default Payment;
