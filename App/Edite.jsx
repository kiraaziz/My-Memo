import { View, Text, StatusBar, TouchableOpacity, Image, TextInput} from "react-native"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"

const Edite =({navigation, route})=>{

    const { state } = route.params
    const [memoData, setMemoData] = useState()
    const [col, setCol] = useState()

    const loadData =async()=>{

        try{
                const data = await AsyncStorage.getItem(state)
                setCol(await AsyncStorage.getItem("color"))

                if(data){
                    setMemoData(JSON.parse(data))
                } else {
                    setMemoData({
                        id: state,
                        title: "",
                        context: "" 
                    })
                }
        } catch(e){
            console.log(e)
        }
    }

    const saveMemo = async()=>{

        try{
            if(memoData.title.length >= 5 && memoData.context.length >= 5){
               await AsyncStorage.setItem(memoData.id, JSON.stringify(memoData))
               navigation.push("Home")
            } else {
                console.log("no info")
            }
        } catch(e){
            console.pog("e")
        }
    }

    const deleteMemo = async()=>{

        try{
            await AsyncStorage.removeItem(memoData.id)
            navigation.push("Home")
        } catch(e){
            console.log("e")
        }
    }

    useEffect(()=>{
        loadData()
    }, [state])

    return(
        <View className="h-full w-full bg-gray-800 flex items-center justify-center">
            <View style={{backgroundColor: col}} className={`h-24 w-full flex flex-row items-center`}>
                <TouchableOpacity onPress={()=>{navigation.push("Home")}} className="rounded-full h-12 w-12 bg-white mx-2">
                    <Image source={require("./../assets/icons/back.png")} className="h-8 w-8 m-auto" />
                </TouchableOpacity>
                <Text className="w-48 text-white font-bold text-2xl my-auto ">My Memo</Text>
            </View>
            <StatusBar backgroundColor="#111827" />
            <View className="grow w-full">
                <View className=" h-20 w-full flex items-center justify-center flex-row p-2">
                    <TextInput style={{borderColor: col}} value={memoData && memoData.title} onChangeText={(e)=>{setMemoData({...memoData, title: e})}} className={`w-max border-4 rounded-2xl p-3 text-md bg-gray-900 font-bold text-white`} placeholder="What is the name of the memo ..." />
                    <TouchableOpacity onPress={saveMemo} className={`rounded-xl h-14 w-14 bg-green-400/80 m-1`}>
                        <Image source={require("./../assets/icons/save.png")} className="h-6 w-6 m-auto" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteMemo} className="rounded-xl h-14 w-14 bg-red-500/80">
                        <Image source={require("./../assets/icons/delete.png")} className="h-6 w-6 m-auto" />
                    </TouchableOpacity>
                </View>
                <View className="grow flex items-center justify-center px-1 pb-2">
                    <TextInput value={memoData && memoData.context} onChangeText={(e)=>{setMemoData({...memoData, context: e})}} multiline={true} numberOfLines={20}  style={{textAlignVertical: 'top', borderColor: col}} className={` bg-gray-900 w-full grow border-4 rounded-2xl p-4 text-xl color-white font-bold`} placeholder="What is the name of the memo ..." />
                </View>
            </View>
        </View>
    )
}

export default Edite