import { React, useContext, useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../index';
import { Grid, Container, Button, TextField, Avatar } from '@material-ui/core';
import Loader from './Loader';
import firebase from 'firebase';

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(() => {
        scrollToBottom()
      }, [messages]);

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
    }

    if (loading) {
        return <Loader/>
    }

    if (user) {
        return (
            <Container>
                <Grid
                container
                style={{height: window.innerHeight - 50, marginTop: 50}}
                // alignItems={"center"}
                justify={"center"}
                >
                    <div style={{width:'80%', height:'70vh', border:'1px solid grey', overflowY:'auto'}}>
                        {messages.map(message =>
                            <div style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5,
                            }}>
                                <Grid container>
                                    <Avatar src={message.photoURL}/>
                                    <div>{message.displayName}</div>
                                </Grid>
                                <div>{message.text}</div>
                            </div>
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                    <Grid
                        container
                        direction={'column'}
                        alignItems={'flex-end'}
                        style={{width:'80%'}}
                    >
                        <TextField
                            fullWidth
                            rowsMax={2}
                            variant={'outlined'}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <Button style={{marginTop: 20}} onClick={sendMessage} variant={'outlined'}>Send</Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default Chat;