import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles/RegistrationUI';

const PlaceholderImage = require('@/assets/images/food1.jpg');

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [mNumber, setMNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();
  
    const togglePasswordVisibility = (field: 'password' | 'confirm') => {
        if (field === 'password') {
          setShowPassword(!showPassword);
        } else {
          setShowConfirmPassword(!showConfirmPassword);
        }
      };
    
      

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    {/* 
    fetch('http://138.197.75.233:8080/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        fullName,
        mNumber,
        email,
        password 
      }),
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      Alert.alert('Registration Successful', 'You can now login');
      navigation.navigate('login' as never);
    })
    .catch(error => {
      Alert.alert('Registration Failed', 'Please check your information');
      console.error('Registration error:', error);
    });
    */}

    console.info("Registration submitted");
    navigation.navigate('login' as never);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={PlaceholderImage} style={styles.backgroundImage} blurRadius={5}>
        <View style={styles.background}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('index' as never) }>
                <Image source={require('@/assets/images/swipein_1.png')} style={styles.navbarTitle}
                />
                </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks}>
              {[
                { label: 'Home', route: 'index' },
                { label: 'Membership', route: 'membership'},
                { label: 'Menu', route: 'menu' },
                { label: 'About', route: 'about' }
              ].map((navItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate(navItem.route as never)}
                  style={styles.navItem}
                >
                  <Text style={styles.navText}>{navItem.label}</Text>
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          </View>

          <View style={styles.RegistrationContainer}>
            <Text style={styles.RegisterHeading}>
              Student Registration 
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>M Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your M number with M (M00...)"
                placeholderTextColor="#999"
                value={mNumber}
                onChangeText={setMNumber}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>University Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your university email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Create a password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  onPress={() => togglePasswordVisibility('password')}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  onPress={() => togglePasswordVisibility('confirm')}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
                
              </View>

              
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.RegisterButton}>
              <Text style={styles.RegisterButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={styles.linkText}>
              <Text style={styles.linkText}>Already have an Account ?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('index' as never) } style={styles.linkText}>
              <Text style={styles.linkText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}