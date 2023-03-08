import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

const Splash =({navigation})=>{

    const [colors, setColors] = useState([
        "#EF4444", // Red - gb-red-400
        "#F472B6", // Pink - gb-pink-400
        "#6366F1", // Indigo - gb-indigo-400
        "#8B5CF6", // Purple - gb-purple-400
        "#34D399", // Green - gb-green-400
        "#FCD34D", // Yellow - gb-yellow-400
        "#F97316"  // Orange - gb-orange-400
      ])

    const [selectColor, setSelectColor] = useState(colors[0])

    const toStorage=async(e)=>{
        try{
            await AsyncStorage.setItem("color", e)
            console.log(await AsyncStorage.getItem("color"))
        }catch (e){
            console.log(e)
        }
    }

    const setCol =(e)=>{
        setSelectColor(e)
        toStorage(e)
    }

    return(
        <View className="h-full w-full bg-gray-900 flex items-center justify-center">
            <StatusBar backgroundColor="#111827" />
            <Text className="h-1/5 m-10 text-white font-bold text-4xl">Welcom To My Memo</Text>
            <Text className="w-5/6 text-white font-bold pl-5">Choose a color</Text>
            <View className="h-14 bg-gray-800 w-5/6 m-2 rounded-full flex flex-row items-center justify-evenly px-2">
                {colors.map((val)=>{
                    return(
                        <TouchableOpacity onPress={()=>{setCol(val)}} className={`rounded-full h-9 w-9 m-0.5`} style={{backgroundColor: val}}>
                            {selectColor === val && <Image source={require("./../assets/icons/use.png")} className="m-auto h-8 w-8" /> }
                        </TouchableOpacity>
                    )
                })}
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} style={{backgroundColor: selectColor}} className={` px-5 mt-24 py-3 rounded-full flex flex-row items-center justify-center`}>
                <Text className="text-white font-bold text-lg">Memo It Now</Text>
                <Image source={require("./../assets/icons/goto.png")} className="ml-2 h-8 w-8" />
            </TouchableOpacity>
        </View>
    )
}

export default Splash