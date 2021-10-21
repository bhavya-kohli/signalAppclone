import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((err) => {
            alert(err);
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="Light" />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }} style={{
                width: 200,
                height: 200
            }} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(pass) => setPassword(pass)} onSubmitEditing={signIn} />
            </View>
            <View style={{ flexDirection: "row", }}>
                <Button containerStyle={styles.button} onPress={signIn} title="Login" />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="outline" title="Register" />
            </View>
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 180,
        marginTop: 10,
        borderRadius: 100,
        borderColor: "dodgerblue",
        borderWidth: 1,
        margin: 10,
    },

});