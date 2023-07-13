import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  increment,
  where,
  or,
  and,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { TouchableOpacity, View, Text } from 'react-native';
import { RootState } from '../store';

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

export function ClientPersonalChat({ navigation, route }: Props) {
  const { tailor } = route.params;
  const clientSlice = useSelector((state: RootState) => state.client.user);

  console.log(clientSlice);

  const [messages, setMessages] = useState<MessageDetailsProps[]>([]);

  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [active, setActive] = useState(false);
  const [specificContact, setSpecificContact] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUserEmail(currentUser.email);
      setUserID(currentUser.uid);
    });
  }, []);
  // console.log(userID);
  // console.log('message', messages);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(!active);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // console.log('adasd', tailor);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Text>{tailor.shopName}</Text>
        </View>
      ),
    });
    const q = query(
      collection(db, 'chats'),

      and(
        where('clientID', '==', userID),
        where('tailorID', '==', tailor.tailorID)
      ),
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

  const addContacted = async () => {
    try {
      const contactedRef = collection(db, 'contacted');

      const q = query(
        contactedRef,
        where('clientEmail', '==', clientSlice.clientEmail)
      );

      const querySnapshot = await getDocs(q);
      setSpecificContact(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      console.log('job', specificContact);

      if (
        typeof specificContact[0]?.contactedClient === 'undefined' ||
        specificContact[0]?.contactedClient === false
      ) {
        console.log('it ran');

        await addDoc(contactedRef, {
          clientName: clientSlice.clientName,
          clientEmail: userEmail,
          clientID: clientSlice.clientID,
          contactedClient: true,
          tailorEmail: tailor.email,
          tailorID: tailor.tailorID,
          tailorName: tailor.shopName,
          phone: clientSlice.contact,
          // date: Date.now(),
        });
      }
      // querySnapshot.forEach((doc) => {

      //   console.log(doc.id, ' => ', doc.data());
      //   if (doc.data().contacted) {

      //     setSpecificContact(doc.data());
      //   }
      // });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const onSend = useCallback((messages: any[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    setActive(!active);
    addContacted();
    const timeout = setTimeout(() => {
      addDoc(collection(db, 'chats'), {
        _id,
        createdAt,
        text,
        user,
        clientID: clientSlice.clientID,
        tailorID: tailor.tailorID,
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
        //client id
      }}
    />
  );
}
