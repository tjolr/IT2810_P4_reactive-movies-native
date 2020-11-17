import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext, ThemeProps, Text } from 'react-native-elements';
import { IThemeObject } from '../../../../../theme/theme.model';

const width = 40;

export const CustomLabel = (props: LabelProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  let oneMarkerVal = props.oneMarkerValue;
  let twoMarkerVal = props.twoMarkerValue;

  // Use one decimal if the rating is not 10
  if (props.oneMarkerValue < 10) {
    oneMarkerVal = Number(props.oneMarkerValue).toFixed(1);
  }
  if (props.twoMarkerValue < 10) {
    twoMarkerVal = Number(props.twoMarkerValue).toFixed(1);
  }

  return (
    <View style={styles(theme).parentView}>
      {/* Left slider label */}
      <View style={[styles(theme).sliderLabel, { left: 0 }]}>
        <Text style={styles(theme).sliderLabelText}>{oneMarkerVal}</Text>
      </View>
      {/* Right slider label */}
      <View style={[styles(theme).sliderLabel, { right: 0 }]}>
        <Text style={styles(theme).sliderLabelText}>{twoMarkerVal}</Text>
      </View>
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    parentView: {
      position: 'relative',
    },
    sliderLabel: {
      position: 'absolute',
      justifyContent: 'center',
      bottom: -width - 4,
      width: width,
      height: width,
    },
    sliderLabelText: {
      textAlign: 'center',
      lineHeight: width,
      borderRadius: width / 2,
      backgroundColor: theme.colors.grey0,
      flex: 1,
      fontSize: 14,
      color: theme.colors.secondary,
    },
  });
