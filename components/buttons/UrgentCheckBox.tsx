import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';

function MyCheckbox({setUrgent}:{setUrgent: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [checked, setChecked] = useState(false);
    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => {setChecked(!checked); setUrgent(true)}}>
        {checked && <Ionicons name="checkmark" size={15} color="white" />}
      </Pressable>
    );
  }

const UrgentCheckBox = ({setUrgent}:{setUrgent: React.Dispatch<React.SetStateAction<boolean>>}) => {


   return (
    <View style={styles.appContainer}>
      <View style={styles.checkboxContainer}>
        <MyCheckbox setUrgent= {setUrgent}/>
        <Text style={styles.checkboxLabel}>Mark as Urgent</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    checkboxBase: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: COLORS.blue,
        backgroundColor: 'transparent',
      },
      checkboxChecked: {
        backgroundColor: COLORS.blue,
      },
      appContainer: {
        flex: 1,
        marginVertical: 20
      },

      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
      },
});

export default UrgentCheckBox;