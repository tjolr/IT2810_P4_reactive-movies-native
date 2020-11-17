import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Icon, ThemeContext, ThemeProps } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { ADD_REVIEW } from '../../../GraphQL/MutationBuilder';
import { setReviewHasPendingChanges } from '../../../redux/actions';
import Userfeedback from '../../Generic/Userfeedback';

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

  // GraphQL mutation for adding reviews
  const [
    addReview,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_REVIEW, {
    onCompleted(data) {
      // Backend returns true if successfull mutation
      if (data.addReview) {
        // Set pending changes to store
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
    <View style={styles.container}>
      <TextInput
        style={[styles.inputContainerStyle, { height: 40 }]}
        placeholder="Author"
        placeholderTextColor="grey"
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
        style={[styles.inputContainerStyle, { height: 60 }]}
        placeholder="Text"
        placeholderTextColor="grey"
        keyboardAppearance="dark"
        onChangeText={(value: string) =>
          setFormValues({ ...formValues, text: value })
        }
        value={formValues.text}
      />

      <Button
        buttonStyle={styles.buttonStyle}
        title="SUBMIT"
        containerStyle={styles.buttonContainerStyle}
        icon={<Icon name="send" style={{ marginLeft: 6 }} />}
        loading={mutationLoading}
        loadingProps={{ color: theme.colors.secondary }}
        // Submit button should be disabled if mutation is loading,
        // or if the textInput fields are empty
        disabled={mutationLoading || !formValues.author || !formValues.text}
        iconRight
        onPress={handleSubmit}
      />

      {/* Give user feedback about the submit status */}
      {mutationError ? (
        <Userfeedback message="Error submitting your review" type="error" />
      ) : (
        successfulSubmit && (
          <Userfeedback message="Review successfully added" type="success" />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ReviewFormContent;
