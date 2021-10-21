import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
const CustomListItem = ({ id, chatName, enterChat }) => {
    return (

        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar
                rounded
                source={{
                    uri: "https://www.whatsappimages.in/wp-content/uploads/2020/12/Sad-Girls-Whatsapp-DP-20.jpg"
                }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
