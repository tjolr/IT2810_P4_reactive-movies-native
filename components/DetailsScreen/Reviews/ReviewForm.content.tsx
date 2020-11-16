import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {
  Button,
  Icon,
  Text,
  ThemeContext,
  ThemeProps,
} from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { ADD_REVIEW } from '../../../GraphQL/MutationBuilder';
import { setReviewHasPendingChanges } from '../../../redux/actions';
import { IThemeObject } from '../../../theme/theme.model';

interface ReviewFormProps {
  movieId: string;
  toggleFormModal: Function;
}

interface Review {
  author: string;
  text: string;
}

const ReviewFormContent = ({ movieId, toggleFormModal }: ReviewFormProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const defaultReviewState: Review = { author: '', text: '' };

  const [formValues, setFormValues] = useState<Review>(defaultReviewState);
  const clearForm = () => {
    setFormValues(defaultReviewState);
  };

  const [
    addReview,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_REVIEW, {
    onCompleted(data) {
      if (data.addReview) {
        dispatch(setReviewHasPendingChanges(true));
        giveUserSuccessfulFeedback();
      }
    },
  });

  const handleSubmit = async () => {
    /* Tries to add a new review
    If it catches an error then show error message to user */
    try {
      await addReview({
        variables: {
          review: {
            movie_id: movieId,
            text: formValues.text,
            author: formValues.author,
          },
        },
      });
      clearForm();
    } catch (mutationError) {
      console.log('Mutation error:', mutationError);
    }
  };

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const giveUserSuccessfulFeedback = () => {
    setSuccessfulSubmit(true);

    // Reset success-state, and hide modal after 800 ms
    setTimeout(() => {
      toggleFormModal();
      setSuccessfulSubmit(false);
    }, 800);
  };

  return (
    <View style={styles(theme).container}>
      <TextInput
        style={[styles(theme).inputContainerStyle, { height: 40 }]}
        placeholder="Author"
        placeholderTextColor="grey"
        keyboardAppearance="dark"
        onChangeText={(value: string) =>
          setFormValues({ ...formValues, author: value })
        }
        value={formValues.author}
        autoFocus
      />

      <TextInput
        // enables multiline behvior and props
        multiline
        numberOfLines={2}
        // make sure iOS and Android behaves the same with text
        // aligned to the top
        textAlignVertical="top"
        style={[styles(theme).inputContainerStyle, { height: 60 }]}
        placeholder="Text"
        placeholderTextColor="grey"
        keyboardAppearance="dark"
        onChangeText={(value: string) =>
          setFormValues({ ...formValues, text: value })
        }
        value={formValues.text}
      />

      <Button
        buttonStyle={styles(theme).buttonStyle}
        title="SUBMIT"
        containerStyle={styles(theme).buttonContainerStyle}
        icon={<Icon name="send" style={{ marginLeft: 6 }} />}
        loading={mutationLoading}
        loadingProps={{ color: theme.colors.secondary }}
        disabled={mutationLoading || !formValues.author || !formValues.text}
        iconRight
        onPress={handleSubmit}
      />

      {mutationError ? (
        <View
          style={[
            styles(theme).userFeedbackContainer,
            { backgroundColor: 'red' },
          ]}
        >
          <Icon name="warning" containerStyle={{ margin: 5 }} />
          <Text h4>Error submitting your review</Text>
        </View>
      ) : (
        successfulSubmit && (
          <View
            style={[
              styles(theme).userFeedbackContainer,
              { backgroundColor: 'green' },
            ]}
          >
            <Icon name="check" containerStyle={{ margin: 5 }} />
            <Text h4>Review added</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    container: {
      paddingTop: 5,
    },
    inputContainerStyle: {
      borderColor: 'grey',
      borderWidth: 1,
      paddingLeft: 8,
      color: 'white',
      borderRadius: 5,
      marginTop: 8,
      fontSize: 16,
    },
    buttonStyle: {
      padding: 10,
    },
    buttonContainerStyle: {
      marginTop: 10,
    },
    userFeedbackContainer: {
      margin: 15,
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

export default ReviewFormContent;
