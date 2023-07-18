import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  label?: string;
  placeholder?: string;
  control?: any;
  name: string;
  onChangeText?: () => void;
}

const Calendar = ({
  label,
  placeholder,
  control,
  name,
  onChangeText,
}: Props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dueDate, setDeuDate] = useState('');

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDeuDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onBlur, value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Due date:</Text>
          <View style={styles.inputContainer}>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )}
            {!showPicker && (
              <Pressable
                style={{ display: 'flex', flexDirection: 'row' }}
                onPress={toggleDatePicker}
              >
                <TextInput
                  placeholder={placeholder}
                  style={styles.placeholder}
                  editable={false}
                  value={dueDate}
                  onChangeText={setDeuDate}
                />
                <Ionicons name="calendar-sharp" size={20} style={styles.eye} />
              </Pressable>
            )}

            {/* <View>
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
          </View> */}
          </View>
        </View>
      )}
      name={name}
    />
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
    marginTop: 15,
  },
  eye: {
    marginRight: 18,
    marginTop: 10,
  },
});
