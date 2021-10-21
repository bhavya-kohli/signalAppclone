import React, { useLayoutEffect, useState ,useEffect} from "react";
import { ScrollView, View,StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import CustomListItem from "../Components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
    const [chats,setChats]=useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    }
    
    useEffect(() => {
        const unsubscribe=db.collection('chats').onSnapshot(snapshot=>{
           setChats(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
           }))) 
        })
        return unsubscribe;
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                    <Avatar
                        rounded
                        source={
                            {
                                uri: auth?.currentUser?.photoURL
                            }
                        }
                    />
                </TouchableOpacity>
            </View>
            ),
            headerRight: () => (
                <View
                style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,
                }}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <AntDesign color="black" size={24} name="camerao"/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("AddChat")}>
                            <SimpleLineIcons color="black" size={24} name="pencil"/>
                        </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat=(id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView>
            <StatusBar style="Light" />
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}})=>(
                    <CustomListItem id={id} chatName={chatName} key={id}  enterChat={enterChat}/>    
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles=StyleSheet.create({
    container:{
        height:"100%",
    }
});