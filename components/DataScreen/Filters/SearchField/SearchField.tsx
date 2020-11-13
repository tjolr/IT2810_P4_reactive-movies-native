import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar, ThemeProps} from 'react-native-elements';
import {ThemeContext} from 'react-native-elements';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {IThemeObject} from '../../../../theme/theme.model';
import {useDebounce} from 'use-debounce';
import {updateSearch} from '../../../../redux/actions';

const SearchField = () => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const searchIsLoadingRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.searchIsLoading
  );

  const [searchFieldValue, setSearchFieldValue] = useState<string>('');

  const [debouncedSearchTerm] = useDebounce(searchFieldValue, 200);

  const updateSearchFieldValue = (searchValue: string) => {
    setSearchFieldValue(searchValue);
  };

  useEffect(() => {
    dispatch(updateSearch(searchFieldValue));
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <SearchBar
      placeholder="Search for a movie"
      onChangeText={updateSearchFieldValue}
      containerStyle={styles(theme).containerStyle}
      inputContainerStyle={styles(theme).inputContainerStyle}
      inputStyle={styles(theme).inputStyle}
      value={searchFieldValue}
      showLoading={searchIsLoadingRedux}
    />
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      paddingBottom: 0,
    },
    inputContainerStyle: {
      backgroundColor: theme.colors.grey5,
    },
    inputStyle: {
      color: 'white',
    },
  });
export default SearchField;
