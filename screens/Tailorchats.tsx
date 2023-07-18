import { COLORS } from '../utils/colors';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { RootState } from '../store';

export interface ContactedTypes {
  clientEmail?: string;
  clientID?: string;
  clientName?: string;
  contacted?: boolean;
  id?: string;
  tailorEmail?: string;
  date?: Date | any;
}

const TailorChats = ({ navigation }: any) => {
  // const studentSlice = useSelector((state) => state.student);
  const [messages, setMessages] = useState([]);
  // const navigation = useNavigation();

  const tailorSlice = useSelector((state: RootState) => state.tailor);
  const clientSlice = useSelector((state: RootState) => state.client.user);

  const [contactedClients, setContactedClients] = useState<ContactedTypes[]>(
    []
  );

  // useEffect(() => {
  //   const chatCollectionRef = collection(db, "chat");

  //   const getChats = async () => {
  //     const data = await getDocs(chatCollectionRef);
  //     setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getChats();
  // }, []);

  // console.log(messages);

  const Messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/tailor-me6.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/tailor-me7.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/tailor1.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/tailor2.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  useEffect(() => {
    // console.log('Helloooooo there ', ordersSlice);

    const timeout = setTimeout(() => {
      const getClients = async () => {
        try {
          // Create a query against the collection.
          const clientsRef = collection(db, 'contacted');
          const q = query(
            clientsRef,
            // where('tailorEmail', '==', tailorSlice.user.email)
            where('tailorEmail', '==', tailorSlice.user.email)
          );

          const querySnapshot = await getDocs(q);
          // console.log(querySnapshot);

          setContactedClients(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );

          // dispatch(ClientsInfo(client[0]));
        } catch (error: any) {
          console.log(error.message);
        }
      };
      getClients();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  console.log('cccc', contactedClients);
  console.log('ttt', tailorSlice.user.tailorID);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingTop: 45,
        alignItems: 'center',
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.heading}>Chat</Text>
      </View>
      <View style={styles.Container}>
        {contactedClients.map((item: ContactedTypes) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('TailorPersonalChat', {
                  senderName: item.clientName,
                  senderID: item.clientID,
                })
              }
              style={styles.Card}
            >
              <View style={styles.UserInfo}>
                {/* <View style={styles.UserImgWrapper}>
                  <Image source={item.userImg} style={styles.UserImg} />
                </View> */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: generateColor(),
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  {/* <Image
                   source={{
                     uri: order.imageUrl,
                   }}
                   style={style.pic}
                 /> */}
                  <Text style={styles.initial}>
                    {/* {tailorSlice?.user?.shopName?.charAt(0)} */}
                    {item.clientName?.charAt(0)}
                  </Text>
                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.clientName}</Text>
                    {/* <Text style={styles.PostTime}>{item.date}</Text> */}
                  </View>
                  <Text style={styles.MessageText}>
                    {'Continue Conversation'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TailorChats;

const styles = StyleSheet.create({
  hero: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  Card: {
    // flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  Container: {
    width: '100%',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  UserName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  MessageText: {
    fontSize: 14,
    color: '#333333',
  },
  initial: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    // padding: 10,
  },
});
