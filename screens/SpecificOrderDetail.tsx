import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../utils/colors';
import TextDisplay from '../components/headings/TextDisplay';

interface Props {
  navigation?: any;
  route?: any;
}

const SpecificOrderDetail = ({ navigation, route }: Props) => {
  const {
    jacket,
    blouse,
    jumpsuit,
    suit,
    gown,
    agbada,
    shirt,
    pants,
    imageUrl,
  } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 65,
        // alignItems: 'center',
      }}
    >
      <View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.heading}>
            {shirt
              ? 'Shirt'
              : gown
              ? 'Gown'
              : agbada
              ? 'Agbada'
              : blouse
              ? 'Blouse'
              : jacket
              ? 'Jacket'
              : jumpsuit
              ? 'Jumpsuit'
              : pants
              ? 'Pants'
              : suit
              ? 'Suit'
              : ''}
          </Text>
        </View>
        <View>
          {shirt ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Bicep" value={shirt.bicep} />
                <TextDisplay text="Chest" value={shirt.chest} />
                <TextDisplay text="Collar Size" value={shirt.collarSize} />
                <TextDisplay text="Seat" value={shirt.seat} />
                <TextDisplay text="Shirt Length" value={shirt.shirtLength} />
                <TextDisplay
                  text="Shoulder Width"
                  value={shirt.shoulderWidth}
                />
                <TextDisplay text="Sleeve Length" value={shirt.sleeveLength} />
                <TextDisplay text="Waist" value={shirt.waist} />
                <TextDisplay
                  text="Cuff Circumference"
                  value={shirt.cuffCircumference}
                />
                <TextDisplay text="Charge" value={shirt.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : gown ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Arm Hole" value={gown.armHole} />
                <TextDisplay text="Chest" value={gown.chest} />
                <TextDisplay
                  text="Front Neck Depth"
                  value={gown.frontNeckDepth}
                />
                <TextDisplay text="Gown Length" value={gown.gownLength} />
                <TextDisplay text="Hips" value={gown.hips} />
                <TextDisplay text="Shoulder" value={gown.shoulder} />
                <TextDisplay text="Sleeve Length" value={gown.sleeveLength} />
                <TextDisplay text="Sleeve Round" value={gown.sleeveRound} />
                <TextDisplay text="Stomach" value={gown.stomach} />
                <TextDisplay text="Upper Chest" value={gown.uperChest} />
                <TextDisplay text="Waist" value={gown.waist} />
                <TextDisplay text="Charge" value={gown.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : agbada ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Neck" value={agbada.neck} />
                <TextDisplay text="Shoulder" value={agbada.shoulder} />
                <TextDisplay text="Chest" value={agbada.chest} />
                <TextDisplay text="Waist" value={agbada.waist} />
                <TextDisplay text="Thigh" value={agbada.thigh} />
                <TextDisplay text="Hips" value={agbada.hips} />
                <TextDisplay text="Knee" value={agbada.knee} />
                <TextDisplay text="Calf" value={agbada.calf} />
                <TextDisplay text="Ankle" value={agbada.ankle} />
                <TextDisplay text="Bicep" value={agbada.bicep} />
                <TextDisplay text="Wrist" value={agbada.wrist} />
                <TextDisplay text="Charge" value={agbada.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : pants ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Waist" value={pants.waist} />
                <TextDisplay text="Outseam" value={pants.Outseam} />
                <TextDisplay text="Inseam" value={pants.inseam} />
                <TextDisplay text="Front Rise" value={pants.frontRise} />
                <TextDisplay text="Hips" value={pants.hips} />
                <TextDisplay text="Thigh" value={pants.thigh} />
                <TextDisplay text="Knee" value={pants.knee} />
                <TextDisplay text="Sura" value={pants.sura} />
                <TextDisplay text="Leg Opening" value={pants.legOpening} />
                <TextDisplay text="Length" value={pants.legth} />
                <TextDisplay text="Charge" value={pants.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : jacket ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Shoulder" value={jacket.shoulder} />
                <TextDisplay text="Sleeve Length" value={jacket.sleeveLength} />
                <TextDisplay text="Chest" value={jacket.chest} />
                <TextDisplay text="Waist" value={jacket.waist} />
                <TextDisplay text="Center Back" value={jacket.centerBack} />
                <TextDisplay text="Charge" value={jacket.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : jumpsuit ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Shoulders" value={jumpsuit.shoulders} />
                <TextDisplay
                  text="Sleeve Length"
                  value={jumpsuit.sleeveLength}
                />
                <TextDisplay text="Chest" value={jumpsuit.chest} />
                <TextDisplay text="Hips" value={jumpsuit.hips} />
                <TextDisplay text="Thigh" value={jumpsuit.thigh} />
                <TextDisplay text="Knee" value={jumpsuit.knee} />
                <TextDisplay text="Inseam" value={jumpsuit.Inseam} />
                <TextDisplay text="Cuff" value={jumpsuit.cuff} />
                <TextDisplay text="Charge" value={jumpsuit.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : suit ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Neck" value={suit.neck} />
                <TextDisplay text="Shoulder" value={suit.shoulder} />
                <TextDisplay text="Arm Hole" value={suit.armHole} />
                <TextDisplay text="Chest" value={suit.chest} />
                <TextDisplay text="Burst" value={suit.burst} />
                <TextDisplay text="Waist" value={suit.waist} />
                <TextDisplay text="Arm Length" value={suit.armLength} />
                <TextDisplay text="Hips" value={suit.hips} />
                <TextDisplay text="Crutch Depth" value={suit.crutchDepth} />
                <TextDisplay text="Back Width" value={suit.backWidth} />
                <TextDisplay text="Bicep" value={suit.bicep} />
                <TextDisplay text="Wrist" value={suit.wrist} />
                <TextDisplay text="Charge" value={suit.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : blouse ? (
            <View>
              <ScrollView
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
              >
                <TextDisplay text="Back Length" value={blouse.backLength} />
                <TextDisplay text="Full Shoulder" value={blouse.fullShoulder} />
                <TextDisplay
                  text="Shoulder Strap"
                  value={blouse.shoulderStrap}
                />
                <TextDisplay
                  text="Back Neck Depth"
                  value={blouse.backNeckDepth}
                />
                <TextDisplay
                  text="Front Neck Depth"
                  value={blouse.frontNeckDepth}
                />
                <TextDisplay
                  text="Shoulder to Apex"
                  value={blouse.shoulderToApex}
                />
                <TextDisplay text="Front Length" value={blouse.frontLength} />
                <TextDisplay text="Chest" value={blouse.chest} />
                <TextDisplay text="Waist" value={blouse.waist} />
                <TextDisplay text="Sleeve Length" value={blouse.sleeveLength} />
                <TextDisplay text="Arm Hole" value={blouse.armHole} />
                <TextDisplay text="Sleeve Round" value={blouse.sleeveRound} />
                <TextDisplay text="Arm Round" value={blouse.armRound} />
                <TextDisplay text="Charge" value={blouse.charge} />
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18 }}>Image</Text>
                  <Image source={{ uri: imageUrl }} style={styles.img} />
                </View>
              </ScrollView>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
  );
};

export default SpecificOrderDetail;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingBottom: 15,
  },
  clientName: {
    backgroundColor: COLORS.white,
    width: 350,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: COLORS.lightGrey,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    marginTop: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
});
