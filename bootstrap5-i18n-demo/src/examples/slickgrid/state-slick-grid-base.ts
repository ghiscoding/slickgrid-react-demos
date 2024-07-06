import type { Column, GridOption } from 'slickgrid-react';

export default class BaseSlickGridState {
  dataset?: any[];
  gridOptions?: GridOption;
  columnDefinitions: Column[] = [];
}
