import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/cfa';

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  calories: string;
  image: any;
};

type CartItem = {
  item: MenuItem;
  quantity: number;
};

export default function ChickfilA() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Entree');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const menuData: MenuItem[] = [
    { 
      id: '1', 
      name: 'Chick-fil-A® Regular Sandwich', 
      category: 'Entree', 
      price: '$4.19',
      calories: '420 Cal per Sandwich',
      image: require('../assets/images/regular.png') 
    },
    { 
      id: '2', 
      name: 'Chick-fil-A® Spicy Sandwich', 
      category: 'Entree', 
      price: '$5.39',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/spicy.png')
    },
    { 
      id: '3', 
      name: 'Spicy Deluxe Sandwich', 
      category: 'Entree', 
      price: '$4.79',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/spicy_deluxe.png')
    },
    { 
      id: '4', 
      name: 'Chick-fil-A® Deluxe Sandwich', 
      category: 'Entree', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/CFA_Deluxe.png')
    },

    { 
      id: '5', 
      name: 'Grill Chicken Sandwich', 
      category: 'Entree', 
      price: '$4.19',
      calories: '420 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '6', 
      name: 'Grill Chicken Club Sandwich', 
      category: 'Entree', 
      price: '$5.39',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '7', 
      name: 'Medium Fries', 
      category: 'Fries', 
      price: '$4.79',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '8', 
      name: 'Large Fries', 
      category: 'Fries', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },

    { 
      id: '9', 
      name: 'Chocolate Brownie', 
      category: 'Treat', 
      price: '$4.19',
      calories: '420 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '10', 
      name: 'Fruit Cup', 
      category: 'Treat', 
      price: '$5.39',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '11', 
      name: 'Cookies & Cream Shake', 
      category: 'Treat', 
      price: '$4.79',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '12', 
      name: 'Strawberry Milkshake', 
      category: 'Treat', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '13', 
      name: 'Vanela Milkshake', 
      category: 'Treat', 
      price: '$4.19',
      calories: '420 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '14', 
      name: 'Froasted Coffee', 
      category: 'Treat', 
      price: '$5.39',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '15', 
      name: 'Froasted Lemonade', 
      category: 'Treat', 
      price: '$4.79',
      calories: '450 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    { 
      id: '16', 
      name: 'Froasted Diet Lemonade', 
      category: 'Treat', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },

    {id: '17', 
      name: 'Chick-fil-A® Sauce', 
      category: 'Sauces', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },

    {id: '18', 
      name: 'Barbeque Sauce', 
      category: 'Sauces', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },

    {id: '19', 
      name: 'Ranch Sauce', 
      category: 'Sauces', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },

    {id: '20', 
      name: 'Honey Mustard Sauce', 
      category: 'Sauces', 
      price: '$6.35',
      calories: '400 Cal per Sandwich',
      image: require('../assets/images/regular.png')
    },
    

  ];

  const categories = ['Entree', 'Meal', 'Fries', 'Treat', 'Sauces', 'Additional Items'];

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(ci => ci.item.id === itemId);
      if (existingIndex === -1) return prevCart;
      
      const updatedCart = [...prevCart];
      if (updatedCart[existingIndex].quantity > 1) {
        updatedCart[existingIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingIndex, 1);
      }
      return updatedCart;
    });
  };

  
  const handleOrderPress = (menuItem: MenuItem) => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(ci => ci.item.id === menuItem.id);
      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { item: menuItem, quantity: 1 }];
    });
  };

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find(ci => ci.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const price = parseFloat(cartItem.item.price.replace('$', ''));
      return total + (price * cartItem.quantity);
    }, 0).toFixed(2);
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.navColumn}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.navItem,
              selectedCategory === category && styles.selectedNavItem,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text style={styles.navText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

     

      <View style={styles.menuContainer}>
        <ScrollView showsHorizontalScrollIndicator = {false} contentContainerStyle={styles.menuGrid}>
          {menuData
            .filter((item) => item.category === selectedCategory)
            .map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleOrderPress(item)}>
                <Image source={item.image} style={styles.itemImage} resizeMode= 'cover' />
                <View style={styles.textContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.calories}>{item.calories}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  
                  <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => handleOrderPress(item)}>
                    <Text style={styles.buttonText}>
                    {quantity > 0 ? `${quantity}` : 'Add to Cart'}
                    </Text>
                  </TouchableOpacity>
                </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>

      <View style={styles.cartContainer}>
        <Text style={styles.cartHeader}>Your Cart</Text>
        <ScrollView style={styles.cartItems}>
          {cartItems.length === 0 ? 

          
          (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          ) : (
            cartItems.map((cartItem) => (
              <View key={cartItem.item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{cartItem.item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    {cartItem.quantity} x {cartItem.item.price}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(cartItem.item.id)}
                >
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${calculateTotal()}
          </Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => navigation.navigate('Payment' as never )}
            disabled={cartItems.length === 0}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}