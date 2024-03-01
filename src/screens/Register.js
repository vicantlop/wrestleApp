import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config'
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { container, loginTextField, contentView, titleContainer, titleText, mainContent, button, text } = styles;

    const nav = useNavigation()

    const Register = async () => {
        createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            const user = userCredential.user;
            if (user) {
                try {
                    await setDoc(doc(db, 'users', user.uid), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    });
                } catch (e) {
                    console.log(e)
                }
                nav.replace('Main')
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
        
    }

    const toLogin = () => {
        nav.push('Login')
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
                            placeholder='First Name'
                            value={firstName}
                            onChangeText={setFirstName}
                            imputMode="text"
                        />
                        <TextInput
                            style={loginTextField}
                            placeholder='Last Name'
                            value={lastName}
                            onChangeText={setLastName}
                            imputMode="text"

                        />
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

                    <Pressable style={button} onPress={Register}>
                        <Text style={text}>Register</Text>
                    </Pressable>
                    <Pressable style={button} onPress={toLogin}>
                        <Text style={text}>Login</Text>
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
