import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { styles } from './styles/LoginUI';
import chickfilA from './chickfilA';



const PlaceholderImage = require('@/assets/images/food1.jpg');

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    {/*fetch('http://138.197.75.233:8080/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      navigation.navigate('' as never); 
      
      setUsername('');
      setPassword('');
    })
    .catch(error => {
      Alert.alert('Login Failed', 'Check your credentials or try again later');
      console.error('Login error:', error);
    });

    */}
    navigation.navigate('chickfilA' as never);

    console.info("You have been logged in")


  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); 
    setUsername(''); 
    setPassword(''); 
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={PlaceholderImage} style={styles.backgroundImage} blurRadius={5}>
         <View style={styles.background}>
        <View style={styles.navbar}>
          
          <TouchableOpacity onPress={() => navigation.navigate('index' as never) }>
            <Image source={require('@/assets/images/swipein_1.png')} style={styles.navbarTitle} 
          
          /></TouchableOpacity>
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


          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'user' && styles.activeTab]}
              onPress={() => handleTabChange('user')}
            >
              <Text style={styles.tabText}>Student Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'employee' && styles.activeTab]}
              onPress={() => handleTabChange('employee')}
            >
              <Text style={styles.tabText}>Employee Login</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'user' ? (
          <>

<View style={styles.loginContainer}>
          <Text style={styles.loginHeading}>Log in < Image source={require('@/assets/images/graduate.png')} style = {styles.image_}></Image>
          
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Mnumber"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
                      onPress={togglePasswordVisibility}
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
           <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Registration' as never)} style={styles.linkText} >
          <Text style={styles.linkText}>Don't have an account? Register here!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkText} >
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
        
</View>
          </>

            ) : (
              <>

              <View style={styles.loginContainer}>
          <Text style={styles.loginHeading}>Log in < Image source={require('@/assets/images/employee.png')} style = {styles.image_}></Image>
          
          </Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Employee ID</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Employee ID"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />

                    <TouchableOpacity 
                      onPress={togglePasswordVisibility}
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

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={styles.linkText} >
          <Text style={styles.linkText}>Forgot Password ? </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('index' as never)} style={styles.linkText} >
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
        
        </View>
        
              </>
            )}
             
       </View>
      </ImageBackground>
    </ScrollView>
  );
}
