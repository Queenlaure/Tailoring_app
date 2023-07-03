import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
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
  return (
    <Modal visible={visible}>
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
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: 150,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 20,
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
});
