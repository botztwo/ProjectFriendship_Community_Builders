// @refresh reset
//tell expo that we don't want to refresh and we want to wipe the state everytime we load the app
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
//importing all dependancies
//had to downgrade the firebase version to 8

const firebaseConfig = {//All info needed to connect the database
  apiKey: "AIzaSyATIafZ4IFxX0-z2-crHe0Bbv4wvQmivcM",
  authDomain: "this-isn-t-working.firebaseapp.com",
  projectId: "this-isn-t-working",
  storageBucket: "this-isn-t-working.appspot.com",
  messagingSenderId: "513302092464",
  appId: "1:513302092464:web:a06b51803dbdadd125b975"
}

if (firebase.apps.length === 0) {//to prevent creating the app everytime we save
    firebase.initializeApp(firebaseConfig)//only want to create the app once
}


export default function Messages(props) {
    let room = 'MainGC'
    const db = firebase.firestore()//db used to access this path quickly
    const chatsRef = db.collection(room)//make reference to the chats collection in the database

    const [user, setUser] = useState()//initialize user
    const [name, setName] = useState('')//initialize the name with initial value of empty array
    const [messages, setMessages] = useState([])//initialize messages to be a state
    const _id = props.mid//id to use in firestore should be mid for us?
    trythis()

    useEffect(() => {//doing things initially at first render
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {//declare variable when we leave the app we want to call this to stop reading and updating the database 
            const messagesFirestore = querySnapshot//querySnapshot is all the data stored into this variable
                .docChanges()//just listen to the docchanges
                .filter(({ type }) => type === 'added')//filter using the type property added which will contain all previous messages too
                .map(({ doc }) => {//doc is the actual data or messages
                    const message = doc.data()//indivisual messages here
                    //doc.data is a method to give the data with id, text, created_at, user

                    return { ...message, createdAt: message.createdAt.toDate() }
                    //... is a spread operator that iterates through all the messages
                    //createdAt is being modified using toDate to transform to be able to use the date function in our code
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                //.sort will show our messages in the correct order
                //comparing so that the oldest times will be shown first and the newst times will be shown at the bottom
            appendMessages(messagesFirestore)//this command will store stuff into our database
        })
        return () => unsubscribe()//calling the unsubscribe here at the end of the initial render
    }, [])//pass no dependancies because it should run only at the beginning

    const appendMessages = useCallback(//useCallback hook helps memorizes the state to catch the previous state and add the new state
        (messages) => {//recieves an array
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
            //merges the previous messages and the one the user just typed
        },
        [messages]
    )

    async function readUser() {//look into the async storage to see if we have a user
        const user = await AsyncStorage.getItem('user')//
        if (user) {//if we have a user
            setUser(JSON.parse(user))//setuser parse the json with the user
        }
    }
    async function trythis() {//going to set the state of the user
        const _id = props.mid//id to use in firestore should be mid for us?
        const name = props.name
        const user = { _id, name }//user is going to have the id and name
        await AsyncStorage.setItem('user', JSON.stringify(user))//storing into async storage and we must store them as a string
        setUser(user)//sent the user to current value
    }
    async function handleSend(messages) {//we recieve a message array
        const writes = messages.map((m) => chatsRef.add(m))
        //writes will be an array of promises
        //chatsRef.add will add data to firestore
        await Promise.all(writes)
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    //Gifted Chat is an API that formats the chat box at the bottom and it will take our variables as they are messages, user
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})