import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config'

export default function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { container, loginTextField, contentView, titleContainer, titleText, mainContent, button, text } = styles;

    const nav = useNavigation()

    const Login = async() => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            if(user) {
                nav.push('Main')
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message 
            console.log(errorMessage)
        })
    }

    const toRegister = () => {
        nav.push('Register')
    }

    return (
        <Pressable style={contentView} onPress={Keyboard.dismiss}>
            <SafeAreaView style={contentView}>
                <View style={container}>

                    <View style={titleContainer}>
                        <Text style={titleText}>Poway Wrestling</Text>
                    </View>

                    <View style={mainContent}>
                        <TextInput
                            style={loginTextField}
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            imputMode="email"
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={loginTextField}
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <Pressable style={button} onPress={Login}>
                        <Text style={text}>Login</Text>
                    </Pressable>

                    <Pressable style={button} onPress={toRegister}>
                        <Text style={text}>Sign Up</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 50,
        paddingTop: 20
    },
    titleContainer: {
        flex: 1.2,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 45,
        textAlign: 'center',
        fontWeight: '200',
    },
    loginTextField: {
        borderBottomWidth: 1,
        height: 60,
        fontSize: 30,
        marginVertical: 10,
        fontWeight: '300',
    },
    mainContent: {
        flex: 4
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    }
});
