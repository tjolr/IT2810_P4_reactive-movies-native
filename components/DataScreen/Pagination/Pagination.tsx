import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext, ThemeProps, Text, Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../../redux/actions';
import { IThemeObject } from '../../../theme/theme.model';

const Pagination = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const pageRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.pagination.page
  );
  const pageIntervalRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.pagination.pageInterval
  );
  const totalRowCountRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.pagination.totalRowCount
  );
  const totalPagesRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.pagination.totalPages
  );

  const setNewPage = (page: number): void => {
    dispatch(changePage(page));
  };

  return (
    <View style={styles(theme).container}>
      <Icon
        reverse={true}
        raised={true}
        color={theme.colors.primary}
        reverseColor="white"
        name="arrow-back"
        onPress={() => setNewPage(pageRedux - 1)}
        disabled={pageRedux === 1}
        disabledStyle={styles(theme).disabledPaginationButton}
      />

      <View style={styles(theme).textContainer}>
        <View style={styles(theme).textBox}>
          <Text style={styles(theme).text}>
            {pageIntervalRedux[0]}-
            {/* If there are less than 25 matching movies,
            show the total number of rowCount, instead of 25
            E.g: "1-17 of 17" instead of "1-25 of 17" */}
            {pageIntervalRedux[1] > totalRowCountRedux
              ? totalRowCountRedux
              : pageIntervalRedux[1]}{' '}
            of {totalRowCountRedux}
          </Text>
        </View>
        <View style={styles(theme).textBox}>
          <Text style={styles(theme).text}>
            Page {pageRedux} of {totalPagesRedux}
          </Text>
        </View>
      </View>

      <Icon
        name="arrow-forward"
        reverse={true}
        raised={true}
        color={theme.colors.primary}
        reverseColor="white"
        onPress={() => setNewPage(pageRedux + 1)}
        disabled={pageRedux === totalPagesRedux}
        disabledStyle={styles(theme).disabledPaginationButton}
      />
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: theme.colors.grey5,
      padding: 7,
      backgroundColor: theme.colors.grey0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paginationButton: {
      borderRadius: 50,
      backgroundColor: theme.colors.grey4,
    },
    disabledPaginationButton: { backgroundColor: theme.colors.grey4 },
    text: {
      margin: 0,
      padding: 0,
    },
    textBox: {
      padding: 5,
      flex: 1,
    },
    textContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default Pagination;
