import React from 'react'
import { View, Text , StyleSheet, ScrollView, Image} from 'react-native';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type AlignText= 'left' | 'center' | 'right' | 'auto'| 'justify' ;

interface NativeUITextProps{
    children:any;
    textSize?:number;
    textWeight?:FontWeight ;
    textColor?:string;
    textAlign?:AlignText

}

const NativeUIText = ({children,textSize,textWeight,textColor,textAlign}:NativeUITextProps) => {
  return (
    <>
     <Text
    style={{
      fontSize: textSize ? textSize : 14,
      fontWeight: textWeight ? textWeight : "normal",
      textAlign: textAlign ? textAlign : "left",
      color: textColor ? textColor : "black",
    }}
    >
        {children}
    </Text></>
   
  )
}

export default NativeUIText