import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  label?: string;
  placeholder?: string;

}

const Calendar = ({ label, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    const onChange = ({type}:any, selectedDate: any) => {
        if (type == "set") {
            const currentDate=selectedDate;
            setDate(currentDate);
        } else {
            toggleDatePicker()
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} style={styles.placeholder} editable={false} />
        <View>
          <View>
            {showPicker && <DateTimePicker mode='date' display='spinner' value={date} onChange={onChange} />}
            {!showPicker && <Pressable onPress={toggleDatePicker}>
            <Ionicons
              name='calendar-sharp'
              size={20}
              style={styles.eye}
            />
            </Pressable>}
            
          </View>
        </View>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: ' transparent',
    width: 350,
    height: 45,
    borderRadius: 10,
    borderColor: COLORS.grey,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    obscureText: true,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 15,
    marginBottom: 10,
  },
  placeholder: {
    color: COLORS.dark,
    marginLeft: 10,
    marginTop: 7,
    width: 280,
  },
  container: {
    marginTop: 20,
  },
  eye: {
    marginRight: 18,
    marginTop: 10,
  },
});
