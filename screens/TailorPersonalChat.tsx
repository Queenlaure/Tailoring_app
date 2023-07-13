import {
  addDoc,
  and,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../firebase-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { View, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';

interface Props {
  navigation: any;
  route: any;
}

interface MessageDetailsProps {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

export function TailorPersonalChat({ navigation, route }: any) {
  const { senderName, senderID } = route.params;

  console.log(senderName, senderID);

  const [messages, setMessages] = useState<MessageDetailsProps[]>([]);
  const [active, setActive] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState('');
  const tailorSlice = useSelector((state: RootState) => state.tailor);
  // console.log(tailorSlice.user.tailorId);

  // useEffect(() => {
  onAuthStateChanged(auth, (currentUser: any) => {
    setUserEmail(currentUser.email);
    setUserID(currentUser.uid);
  });
  // }, []);

  console.log('sa', messages);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(!active);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Text>{senderName}</Text>
        </View>
      ),
    });
    const q = query(
      collection(db, 'chats'),

      and(where('clientID', '==', senderID), where('tailorID', '==', userID)),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, [active]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages: any[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    setActive(!active);
    const timeout = setTimeout(() => {
      addDoc(collection(db, 'chats'), {
        _id,
        createdAt,
        text,
        user,
        clientID: senderID,
        tailorID: userID,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userID,
        //tailor id
      }}
    />
  );
}
