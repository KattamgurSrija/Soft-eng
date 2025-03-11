// styles/cfa.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  }, 

  navItem: 
  {
    padding: 40,
    paddingTop: 50 ,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
    
  },


  navText: {
    color: 'rgb(0, 7, 3)',
    fontSize: 14,
    textAlign: 'center'
  },

  textContainer: {
    marginBottom: 5,
  },
  
  
  
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  selectedNavItem: {
    backgroundColor: 'rgb(218, 15, 15)',
  },
  navColumn: {
    flex: .9,
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
  },
  
  menuContainer: {
    flex: 7,
    padding: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  card: {
    width: '32%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 50,
    justifyContent: 'space-evenly',
    elevation: 3,
    margin: '6%',
    overflow:'hidden',
    height: 322
  },

  itemImage: {
    width: 'auto',
    height: '70%',
    borderRadius: 8,
    resizeMode: 'cover'
  },

  

  itemName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  calories: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  price: {
    color: '#c41200', 
    fontSize: 14,
    fontWeight: '700',
  },
  orderButton: {
    backgroundColor: '#c41200',
    borderRadius: 16,
    minWidth: 80,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  cartContainer: {
    flex: 2.2,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },

  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 15,
  },
 
  cartItemName: {
    fontSize: 14,
    maxWidth: '70%',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#c41200',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemInfo: {
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  removeText: {
    fontSize: 24,
    color: '#c41200',
    lineHeight: 24,
  },

});