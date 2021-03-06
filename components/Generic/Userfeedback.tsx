import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeProps, ThemeContext, Icon, Text } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IUserfeedbackProps {
  message: string;
  type: feedbackTypes;
}

type feedbackTypes = 'success' | 'error' | 'warning';

/* Component for giving user feedback after user events */

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
        /* get backgroundcolor dependent on feedback type */
        { backgroundColor: feedbackTypeInfo[type].backgroundColor },
      ]}
    >
      <Icon
        /* Get icon based on feedback type */
        name={feedbackTypeInfo[type].iconName}
        containerStyle={{ margin: 5 }}
      />
      <Text style={{ fontSize: 18 }}>{message}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  userFeedbackContainer: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Userfeedback;
