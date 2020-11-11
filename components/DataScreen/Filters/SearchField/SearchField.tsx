import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ThemeContext} from 'react-native-elements';

const SearchField = () => {
  const {theme} = useContext<any>(ThemeContext);

  const [searchFieldValue, setSearchFieldValue] = useState<string>('');

  const updateSearch = (searchValue: string) => {
    setSearchFieldValue(searchValue);
  };
  return (
    <SearchBar
      placeholder="Search for a movie"
      onChangeText={updateSearch}
      containerStyle={styles.containerStyle}
      inputContainerStyle={[{backgroundColor: theme.colors.grey2}]}
      inputStyle={{
        color: 'white',
      }}
      value={searchFieldValue}
    />
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});
export default SearchField;
