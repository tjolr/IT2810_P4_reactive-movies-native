import {
  currencyFormatter,
  minutesToHourString,
} from '../../../utils/columnFormatting';

interface ColDef {
  field: string;
  headerName?: string;
  hide?: boolean;
  width?: number;
  valueFormatter?: any;
  type?: string;
}

/* ColDef for dataGrid. */
export const columnDefs: ColDef[] = [
  /* Needs the id rows to pass to detailview so it can review
  the chosen movieId */
  {field: 'id', hide: true},
  {field: '_id', hide: true},
  {field: 'title', headerName: 'Title', width: 340},
  {
    field: 'release_date',
    headerName: 'Release year',
    width: 120,
    type: 'number',
    /* Formats the date to only show the year */
    valueFormatter: ({value}: any) => new Date(value).getFullYear(),
  },
  {
    field: 'popularity',
    headerName: 'Popularity',
    width: 120,
    type: 'number',
  },
  {
    field: 'vote_average',
    headerName: 'Average vote',
    type: 'number',
    width: 120,
  },
];
