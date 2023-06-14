import React from 'react'
import InputField from './InputField';
import { Controller } from 'react-hook-form';

interface FieldInputProps{
    control:any;
    name:string;
    label?:string;
    placeholder:string;
    secureTextEntry?:boolean;
   
}

const FieldInput = ({control,name,label,placeholder,secureTextEntry}:FieldInputProps) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputField
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
        />
      )}
      name={name}
    />
  )
}

export default FieldInput