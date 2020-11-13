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

export const SortButton = (props: any) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();
  const sortFieldRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.sort
  );

  const isActiveSortField = (): boolean => {
    return sortFieldRedux.field === props.field;
  };

  const [sortState, setSortState] = useState(
    isActiveSortField() ? sortFieldRedux.direction : defaultSortDirection
  );

  const nextState = () => {
    const nextIndex = sortDirectionList.indexOf(sortState) + 1;
    const nextSortDirection: SortDirection =
      sortDirectionList[nextIndex % sortDirectionListLength];

    setSortState(nextSortDirection);

    const sort: ISort = {
      field: nextSortDirection === null ? null : props.field,
      direction: nextSortDirection,
    };

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
