import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import { useState, useEffect } from "react"

const Home =({navigation})=>{

    const [memoList, setMemoList] = useState([])
    const [col, setCol] = useState()

    const loadData =async()=>{

        try{
            const keys = await AsyncStorage.getAllKeys()
            const data = await Promise.all(keys.map(async key => {
                const value = await AsyncStorage.getItem(key)
                return value
            }))

            setCol(await AsyncStorage.getItem("color"))
            setMemoList(data)
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        loadData()
    }, [])

    return(
        <View className="h-full w-full bg-gray-800 flex items-center justify-center">
            <View style={{backgroundColor: col}} className={`h-24 w-full flex flex-row items-center`}>
                <Text className="text-white font-bold text-2xl my-auto mx-5">My Memo</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("Splash")}} className="h-10 w-10 flex items-end justify-center ml-auto mr-4">
                    <Image source={require("./../assets/icons/setting.png")} className="h-10 w-10" />
                </TouchableOpacity>      
            </View>
            <StatusBar backgroundColor="#111827" />
            <ScrollView className="grow w-full py-5 px-4 ">
                <TouchableOpacity onPress={()=>{navigation.navigate("Edite", {state: uuid.v4()})}} style={{backgroundColor: col, borderColor: col}} className={` h-20 py-5 px-2 w-max m-1 rounded-2xl border-4 `}>
                    <Image source={require("./../assets/icons/add.png")} className="h-10 w-10 m-auto" />
                </TouchableOpacity>
                {
                    memoList && memoList.map((val) => {
                        return (
                            val !== col &&
                            <View style={{borderColor: col}} className={` flex flex-row items-center justify-between bg-gray-900 h-max p-2 w-max m-1 rounded-2xl border-4 `}>
                                <Text className="h-max text-white font-bold text-md ml-2 w-48">{JSON.parse(val).title}</Text>
                                <TouchableOpacity onPress={()=>{navigation.navigate("Edite", {state: JSON.parse(val).id})}} style={{backgroundColor: col}} className={`h-14 w-14 rounded-2xl`}>
                                    <Image source={require("./../assets/icons/goto.png")} className="h-10 w-10 m-auto" />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Home