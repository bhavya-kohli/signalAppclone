import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import firebase from 'firebase/app'
import { db,auth } from '../firebase'
const ChatScreen = ({navigation,route}) => {
    const [input,setInput]=useState("");
    const[messages,setMessages]=useState([]);
    const sendMessage=()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        setInput("")
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }}>
                    <Avatar
                    rounded 
                    source={{
                        uri: messages[messages.length-1]?.data.photoURL||"https://4.bp.blogspot.com/-QdexY6TX-Cw/VdLAHcsMOsI/AAAAAAAACfU/meAsqJy76mM/s400/10.jpg",
                    }}
                    />
                    <Text style={{color:"white", marginLeft:10,fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )

        });
    },[navigation,messages]);

    useLayoutEffect(()=>{
        const unsubscribe=db
                            .collection('chats')
                            .doc(route.params.id)
                            .collection('messages')
                            .orderBy('timestamp','asc')
                            .onSnapshot((snapshot)=>setMessages(snapshot.docs.map(doc=>({
                                id:doc.id,
                                data:doc.data()
                            }))));
                            return unsubscribe
    },[route])

    return (
        <SafeAreaView style={{flex:1 , backgroundColor:"white"}}>
            <StatusBar style ="Light" />
            <KeyboardAvoidingView
            behavior={Platform.OS==="ios"?"padding":"height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                    {/* chat goes here */}
                    {messages.map(({id,data})=>
                        data.email===auth.currentUser.email?(
                            <View key={id} style={styles.reciever}>
                                <Avatar
                                position="absolute"
                                containerStyle={{
                                    position:"absolute",
                                    bottom:-15,
                                    right:-5
                                }}
                                rounded
                                bottom={-15}
                                right={-5}
                                size={30}
                                source={{
                                    uri:data.photoURL
                                }} />
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ):(<View style={styles.sender}>
                            <Avatar rounded
                            left={0}
                            bottom={-15}
                            position="abolute"
                            containerStyle={{
                                position:"absolute",
                                bottom:-15,
                                left:0
                            }}
                            size={30}
                            source={{
                                uri:data.photoURL
                            }} />
                            <Text style={styles.senderText}>{data.message}</Text>
                        </View>)
                    )
                }
                </ScrollView>
                
               <View style={styles.footer}>
                   <TextInput placeholder="Signal Message" style={styles.textInput}
                   value={input}
                   onChangeText={(text)=>setInput(text)}
                   onSubmitEditing={sendMessage}/>
                   <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#2868E6" style={styles.sign}/>
                   </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        flex:1,
        bottom:0,
        height:40,
        padding:10,
        marginRight:15,
        color:"grey",
        borderRadius:30,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
    },
    sign:{
        marginLeft:5
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2868E6",
        borderRadius:20,
        margin:15,
        alignSelf:"flex-start",
        maxWidth:"80%",
        position:"relative",
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white",
    },
    senderText:{
        color:"white",
        marginLeft:10,
        marginBottom:15,
        fontWeight:"500",
    },
    recieverText:{
        color:"black",
        fontWeight:"750",
        marginLeft:10
    }
});
