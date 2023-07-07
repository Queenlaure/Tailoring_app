import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../utils/colors';

interface CustomModalProps {
  visible: boolean;
  setVisible: any;
  extraFunction: any;
  children: any;
}
const CustomModal = ({
  visible,
  setVisible,
  extraFunction,
  children,
}: CustomModalProps) => {
  // const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <View>
      {/* <Modal visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
              extraFunction();
            }}
            style={styles.header}
          >
            <MaterialCommunityIcons
              name={'window-close'}
              color={COLORS.blue}
              size={30}
            />
          </TouchableOpacity>

          <View style={styles.childrenContainer}>{children}</View>
        </View>
      </View>
    </Modal> */}

      <Modal
        visible={visible}
        onRequestClose={hide}
        animationType="fade"
        transparent
      >
        <Pressable style={styles.upper} />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
              extraFunction();
            }}
            style={styles.header}
          >
            <MaterialCommunityIcons
              name={'window-close'}
              color={COLORS.blue}
              size={30}
            />
          </TouchableOpacity>

          <View style={styles.childrenContainer}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    // flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    width: '90%',
    height: 150,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 20,
    left: '5%',
    top: '40%',
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  upper: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#DDD',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'relative',
    opacity: 0.5,
  },
  lower: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
