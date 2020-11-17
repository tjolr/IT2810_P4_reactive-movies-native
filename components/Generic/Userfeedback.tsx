import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeProps, ThemeContext, Icon, Text } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IThemeObject } from '../../theme/theme.model';

interface IUserfeedbackProps {
  message: string;
  type: feedbackTypes;
}

type feedbackTypes = 'success' | 'error' | 'warning';

const Userfeedback = ({ message, type }: IUserfeedbackProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  const feedbackTypeInfo = {
    success: {
      iconName: 'check',
      backgroundColor: '#22bb33',
    },
    error: {
      iconName: 'warning',
      backgroundColor: '#cc0000',
    },
    warning: {
      iconName: 'mood-bad',
      backgroundColor: theme.colors.secondary,
    },
  };

  return (
    <View
      style={[
        styles.userFeedbackContainer,
        { backgroundColor: feedbackTypeInfo[type].backgroundColor },
      ]}
    >
      <Icon
        name={feedbackTypeInfo[type].iconName}
        containerStyle={{ margin: 5 }}
      />
      <Text h4>{message}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  userFeedbackContainer: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Userfeedback;
