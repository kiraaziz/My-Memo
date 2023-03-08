import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Splash from "./App/Splash"
import Home from "./App/Home"
import Edite from "./App/Edite"

const App =()=>{

    const Stack = createNativeStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Edite" component={Edite} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App