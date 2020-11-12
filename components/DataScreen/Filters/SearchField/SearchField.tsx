import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar, ThemeProps} from 'react-native-elements';
import {ThemeContext} from 'react-native-elements';
import {IThemeObject} from '../../../../theme/theme.model';

const SearchField = () => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);

  const [searchFieldValue, setSearchFieldValue] = useState<string>('');

  const updateSearch = (searchValue: string) => {
    setSearchFieldValue(searchValue);
  };
  return (
    <SearchBar
      placeholder="Search for a movie"
      onChangeText={updateSearch}
      containerStyle={styles(theme).containerStyle}
      inputContainerStyle={styles(theme).inputContainerStyle}
      inputStyle={styles(theme).inputStyle}
      value={searchFieldValue}
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
