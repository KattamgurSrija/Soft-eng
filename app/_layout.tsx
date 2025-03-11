import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index" screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="index" options={{
        headerShown: false
        
        }} />
        <Stack.Screen name="about" options={{
        headerShown: false,
        }} />
        
        <Stack.Screen name="Login" options={{
        headerShown: false,
        }} />

        <Stack.Screen name="membership" options={{
          headerShown: false,
        }} />

        <Stack.Screen name="Registration" options={{
          headerShown: false,
        }} />
        
        <Stack.Screen name="chickfilA" options={{
          headerShown: false,
        }} />
               
      <Stack.Screen name="+not-found" options={{}} />

      
    </Stack>



  )
}
