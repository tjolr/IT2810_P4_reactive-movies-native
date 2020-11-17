import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext, ThemeProps, Text, Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateSort } from '../../../../../redux/actions';
import {
  defaultSortDirection,
  ISort,
  SortDirection,
  sortDirectionList,
  sortDirectionListLength,
} from '../../../../../redux/models/movieReducer.model';
import {
  mapFieldNameToDisplayValue,
  mapSortDirectionToIconName,
} from './MovieSorting.service';

interface SortButtonProps {
  field: string;
}

export const SortButton = (props: SortButtonProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  // Gets redux state of which sort button is active
  // Needs this to decide if current button should
  // be active or not
  const sortFieldRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.sort
  );

  // Checks if "this" button is active
  const isActiveSortField = (): boolean => {
    return sortFieldRedux.field === props.field;
  };

  const [sortState, setSortState] = useState(
    // If this button is active, use direction from redux store
    // if its inactive, set to default
    isActiveSortField() ? sortFieldRedux.direction : defaultSortDirection
  );

  // Sets sortbutton to next sortstate
  const nextState = () => {
    const nextIndex = sortDirectionList.indexOf(sortState) + 1;
    const nextSortDirection: SortDirection =
      sortDirectionList[nextIndex % sortDirectionListLength];

    setSortState(nextSortDirection);

    const sort: ISort = {
      // if sortdirection is null, the sort field in redux should also be null
      field: nextSortDirection === null ? null : props.field,
      direction: nextSortDirection,
    };

    // updates redux store with the new sortState
    dispatch(updateSort(sort));
  };

  // Sets sibling sort buttons to default when current sort
  // field is set to active.
  useEffect(() => {
    !isActiveSortField() && setSortState(defaultSortDirection);
  }, [sortFieldRedux]);

  return (
    <TouchableOpacity
      style={[
        styles.sortButtonContainer,
        {
          backgroundColor:
            isActiveSortField() && sortState !== null
              ? theme.colors.secondary
              : theme.colors.grey4,
        },
      ]}
      onPress={nextState}
    >
      <Text style={styles.fieldText}>
        {mapFieldNameToDisplayValue(props.field)}
      </Text>
      {sortState !== null && (
        <Icon
          name={mapSortDirectionToIconName(sortState)}
          size={buttonFontSize}
        />
      )}
    </TouchableOpacity>
  );
};

const buttonFontSize = 18;

const styles = EStyleSheet.create({
  sortButtonContainer: {
    padding: 10,
    borderRadius: 5,
    margin: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    fontSize: buttonFontSize,
  },
});
