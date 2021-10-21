import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input,Button,Icon } from 'react-native-elements';
import { db } from '../firebase';
const AddChatScreen = ({navigation}) => {
    
    const [input,setInput]=useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add new Chat",
            headerBackTitle:"Chats"
        })
    }, [navigation]);

    const createChat= async()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack();
        }).catch((error)=>alert(error));
    }

    return (
        <View style={styles.container}>
            <Input 
            placeholder="Enter chat name"
            value={input}
            onChangeText={(text)=>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black"/>
            }
            />
            <Button onPress={createChat} title="Create New Chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        padding:30,
        height:"100%"
    }
})

