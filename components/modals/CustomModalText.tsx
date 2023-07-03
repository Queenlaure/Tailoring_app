import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CustomModal from './CustomModal';
import NativeUIText from '../NativeUIText/NativeUIText';
import Octicons from 'react-native-vector-icons/Octicons';
import { COLORS } from '../../utils/colors';

interface CustomModalTextProp {
  title: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  extraFunction: () => void;
  showIcon: any;
}

const CustomModalText = ({
  title,
  setVisible,
  visible,
  extraFunction,
  showIcon,
}: CustomModalTextProp) => {
  return (
    <CustomModal
      visible={visible}
      setVisible={setVisible}
      extraFunction={extraFunction}
    >
      <View style={styles.icon}>
        {showIcon ? (
          <Octicons
            name={'check-circle-fill'}
            size={70}
            color={COLORS.lightBlue}
          />
        ) : (
          ''
        )}
      </View>
      <View style={styles.text}>
        <NativeUIText textAlign={'center'} textSize={20} textWeight={'bold'}>
          {title}
        </NativeUIText>
      </View>
    </CustomModal>
  );
};

export default CustomModalText;

const styles = StyleSheet.create({
  text: {
    width: '100%',
    marginTop: 10,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
