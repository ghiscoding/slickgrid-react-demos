import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { TextExportService } from '@slickgrid-universal/text-export';
import {
  Aggregators,
  type Column,
  FieldType,
  FileType,
  Filters,
  Formatters,
  type GridOption,
  type Grouping,
  GroupTotalFormatters,
  SortDirectionNumber,
  SortComparers,
  type SlickDataView,
  type SlickGrid,
  SlickgridReact,
  type SlickgridReactInstance,
} from 'slickgrid-react';
import React from 'react';
import type BaseSlickGridState from './state-slick-grid-base';

interface Props { }
interface State extends BaseSlickGridState {
  dataset: any[],
  processing: boolean;
}

export default class Example13 extends React.Component<Props, State> {
  title = 'Example 13: Grouping & Aggregators';
  subTitle = `
    <ul>
      <li><a href="https://ghiscoding.gitbook.io/slickgrid-react/grid-functionalities/grouping-aggregators" target="_blank">Docs</a></li>
      <li>Fully dynamic and interactive multi-level grouping with filtering and aggregates over 50'000 items</li>
      <li>Each grouping level can have its own aggregates (over child rows, child groups, or all descendant rows)..</li>
      <li>Use "Aggregators" and "GroupTotalFormatters" directly from Slickgrid-React</li>
    </ul>
  `;

  reactGrid!: SlickgridReactInstance;
  dataviewObj!: SlickDataView;
  gridObj!: SlickGrid;
  excelExportService = new ExcelExportService();
  textExportService = new TextExportService();

  constructor(public readonly props: Props) {
    super(props);

    this.state = {
      columnDefinitions: [],
      gridOptions: undefined,
      processing: false,
      dataset: this.loadData(500),
    };
  }

  componentDidMount() {
    document.title = this.title;

    // define the grid options & columns and then create the grid itself
    this.defineGrid();

    // this.initDataLoad();
  }

  initDataLoad() {
    // populate the dataset once the grid is ready
    this.setState((state: State) => {
      return {
        ...state,
        dataset: this.loadData(500)
      };
    });
  }

  reactGridReady(reactGrid: SlickgridReactInstance) {
    this.reactGrid = reactGrid;
    this.dataviewObj = reactGrid.dataView;
    this.gridObj = reactGrid.slickGrid;
  }

  /* Define grid Options and Columns */
  defineGrid() {
    // add a simple button with event listener on 1st column for testing purposes
    // a simple button with click event
    const nameElementColumn1 = document.createElement('div');
    const btn = document.createElement('button');
    const btnLabel = document.createElement('span');
    btnLabel.className = 'mdi mdi-help-circle no-padding';
    btn.dataset.test = 'col1-hello-btn';
    btn.className = 'btn btn-outline-secondary btn-xs btn-icon ms-1';
    btn.textContent = 'Click me';
    btn.title = 'simple column header test with a button click listener';
    btn.addEventListener('click', () => alert('Hello World'));
    btn.appendChild(btnLabel);
    nameElementColumn1.appendChild(document.createTextNode('Id '));
    nameElementColumn1.appendChild(btn);

    const columnDefinitions: Column[] = [
      {
        id: 'sel', name: nameElementColumn1, field: 'num', type: FieldType.number,
        columnPickerLabel: 'Custom Label', // add a custom label for the ColumnPicker/GridMenu when default header value extractor doesn't work for you ()
        width: 140, maxWidth: 150,
        excludeFromExport: true,
        resizable: true,
        filterable: true,
        selectable: false,
        focusable: false
      },
      {
        id: 'title', name: 'Title', field: 'title',
        width: 50,
        minWidth: 50,
        cssClass: 'cell-title',
        filterable: true,
        sortable: true
      },
      {
        id: 'duration', name: 'Duration', field: 'duration',
        minWidth: 50, width: 60,
        filterable: true,
        filter: { model: Filters.slider, operator: '>=' },
        sortable: true,
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        params: { groupFormatterPrefix: 'Total: ' }
      },
      {
        id: 'percentComplete', name: '% Complete', field: 'percentComplete',
        minWidth: 70, width: 90,
        formatter: Formatters.percentCompleteBar,
        filterable: true,
        filter: { model: Filters.compoundSlider },
        sortable: true,
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
        params: { groupFormatterPrefix: '<i>Avg</i>: ' }
      },
      {
        id: 'start', name: 'Start', field: 'start',
        minWidth: 60,
        maxWidth: 130,
        filterable: true,
        filter: { model: Filters.compoundDate },
        sortable: true,
        type: FieldType.dateIso,
        formatter: Formatters.dateIso,
        exportWithFormatter: true
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        minWidth: 60,
        maxWidth: 130,
        filterable: true,
        filter: { model: Filters.compoundDate },
        sortable: true,
        type: FieldType.dateIso,
        formatter: Formatters.dateIso,
        exportWithFormatter: true
      },
      {
        id: 'cost', name: 'Cost', field: 'cost',
        minWidth: 70, width: 80,
        sortable: true, filterable: true,
        filter: { model: Filters.compoundInputNumber },
        type: FieldType.number,
        formatter: Formatters.currency,
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsCurrency,
        params: { displayNegativeNumberWithParentheses: true, currencyPrefix: '€', groupFormatterCurrencyPrefix: '€', minDecimal: 2, maxDecimal: 4, groupFormatterPrefix: '<b>Total</b>: ' },
        excelExportOptions: {
          style: {
            font: { outline: true, italic: true },
            format: '€0.00##;[Red](€0.00##)',
          },
          width: 18
        },
        groupTotalsExcelExportOptions: {
          style: {
            alignment: { horizontal: 'center' },
            font: { bold: true, color: 'FF005289', underline: 'single', fontName: 'Consolas', size: 10 },
            fill: { type: 'pattern', patternType: 'solid', fgColor: 'FFE6F2F6' },
            border: {
              top: { color: 'FFa500ff', style: 'thick', },
              left: { color: 'FFa500ff', style: 'medium', },
              right: { color: 'FFa500ff', style: 'dotted', },
              bottom: { color: 'FFa500ff', style: 'double', },
            },
            format: '"Total: "€0.00##;[Red]"Total: "(€0.00##)'
          },
        },
      },
      {
        id: 'effortDriven', name: 'Effort Driven',
        minWidth: 30, width: 80, maxWidth: 90,
        cssClass: 'cell-effort-driven',
        field: 'effortDriven',
        formatter: Formatters.checkmarkMaterial,
        sortable: true,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        }
      }
    ];

    const gridOptions: GridOption = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
      },
      enableFiltering: true,
      // you could debounce/throttle the input text filter if you have lots of data
      // filterTypingDebounce: 250,
      enableGrouping: true,
      enableExcelExport: true,
      enableTextExport: true,
      excelExportOptions: { sanitizeDataExport: true },
      textExportOptions: { sanitizeDataExport: true },
      externalResources: [this.excelExportService, this.textExportService],
      showCustomFooter: true,
      customFooterOptions: {
        // optionally display some text on the left footer container
        hideMetrics: false,
        hideTotalItemCount: false,
        hideLastUpdateTimestamp: false
      },
    };

    this.setState((state: State) => ({
      ...state,
      columnDefinitions,
      gridOptions,
    }));
  }

  loadData(rowCount: number) {
    // mock a dataset
    const dataset: any[] = [];
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);
      const randomCost = (i % 33 === 0) ? null : Math.round(Math.random() * 10000) / 100;

      dataset[i] = {
        id: 'id_' + i,
        num: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        cost: i % 3 ? randomCost : randomCost !== null ? -randomCost : null,
        effortDriven: (i % 5 === 0)
      };
    }

    return dataset;
  }

  updateData(rowCount: number) {
    this.setState((state: State) => ({
      ...state,
      dataset: this.loadData(rowCount),
    }));
  }

  clearGrouping() {
    this.dataviewObj.setGrouping([]);
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }

  exportToExcel() {
    this.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx
    });
  }

  groupByDuration() {
    // you need to manually add the sort icon(s) in UI
    this.reactGrid.filterService.setSortColumnIcons([{ columnId: 'duration', sortAsc: true }]);
    this.dataviewObj.setGrouping({
      getter: 'duration',
      formatter: (g) => `Duration: ${g.value} <span style="color:green">(${g.count} items)</span>`,
      comparer: (a, b) => {
        return SortComparers.numeric(a.value, b.value, SortDirectionNumber.asc);
      },
      aggregators: [
        new Aggregators.Avg('percentComplete'),
        new Aggregators.Sum('cost')
      ],
      aggregateCollapsed: false,
      lazyTotalsCalculation: true
    } as Grouping);
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  groupByDurationOrderByCount(aggregateCollapsed: boolean) {
    this.reactGrid.filterService.setSortColumnIcons([]);
    this.dataviewObj.setGrouping({
      getter: 'duration',
      formatter: (g) => `Duration: ${g.value} <span style="color:green">(${g.count} items)</span>`,
      comparer: (a, b) => {
        return a.count - b.count;
      },
      aggregators: [
        new Aggregators.Avg('percentComplete'),
        new Aggregators.Sum('cost')
      ],
      aggregateCollapsed,
      lazyTotalsCalculation: true
    } as Grouping);
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  groupByDurationEffortDriven() {
    // you need to manually add the sort icon(s) in UI
    const sortColumns = [{ columnId: 'duration', sortAsc: true }, { columnId: 'effortDriven', sortAsc: true }];
    this.reactGrid.filterService.setSortColumnIcons(sortColumns);
    this.dataviewObj.setGrouping([
      {
        getter: 'duration',
        formatter: (g) => `Duration: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
        aggregators: [
          new Aggregators.Sum('duration'),
          new Aggregators.Sum('cost')
        ],
        aggregateCollapsed: true,
        lazyTotalsCalculation: true
      },
      {
        getter: 'effortDriven',
        formatter: (g) => `Effort-Driven: ${(g.value ? 'True' : 'False')} <span style="color:green">(${g.count} items)</span>`,
        aggregators: [
          new Aggregators.Avg('percentComplete'),
          new Aggregators.Sum('cost')
        ],
        collapsed: true,
        lazyTotalsCalculation: true
      }
    ] as Grouping[]);
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  groupByDurationEffortDrivenPercent() {
    // you need to manually add the sort icon(s) in UI
    const sortColumns = [
      { columnId: 'duration', sortAsc: true },
      { columnId: 'effortDriven', sortAsc: true },
      { columnId: 'percentComplete', sortAsc: true }
    ];
    this.reactGrid.filterService.setSortColumnIcons(sortColumns);
    this.dataviewObj.setGrouping([
      {
        getter: 'duration',
        formatter: (g) => `Duration: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
        aggregators: [
          new Aggregators.Sum('duration'),
          new Aggregators.Sum('cost')
        ],
        aggregateCollapsed: true,
        lazyTotalsCalculation: true
      },
      {
        getter: 'effortDriven',
        formatter: (g) => `Effort-Driven: ${(g.value ? 'True' : 'False')}  <span style="color:green">(${g.count} items)</span>`,
        aggregators: [
          new Aggregators.Sum('duration'),
          new Aggregators.Sum('cost')
        ],
        lazyTotalsCalculation: true
      },
      {
        getter: 'percentComplete',
        formatter: (g) => `% Complete: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
        aggregators: [
          new Aggregators.Avg('percentComplete')
        ],
        aggregateCollapsed: true,
        collapsed: true,
        lazyTotalsCalculation: true
      }
    ] as Grouping[]);
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  changeProcessing(isProcessing: boolean) {
    this.setState((state: State) => ({
      ...state,
      processing: isProcessing
    }));
  }

  render() {
    return !this.state.gridOptions ? '' : (
      <div id="demo-container" className="container-fluid">
        <h2>
          {this.title}
          <span className="float-end font18">
            see&nbsp;
            <a target="_blank"
              href="https://github.com/ghiscoding/slickgrid-react/blob/master/src/examples/slickgrid/Example13.tsx">
              <span className="mdi mdi-link-variant"></span> code
            </a>
          </span>
        </h2>
        <div className="subtitle" dangerouslySetInnerHTML={{ __html: this.subTitle }}></div>

        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-outline-secondary btn-xs btn-icon" data-test="add-500-rows-btn" onClick={() => this.updateData(500)}>
              500 rows
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="add-50k-rows-btn" onClick={() => this.updateData(50000)}>
              50k rows
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="clear-grouping-btn" onClick={() => this.clearGrouping()}>
              <i className="mdi mdi-close"></i> Clear grouping
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="collapse-all-btn" onClick={() => this.collapseAllGroups()}>
              <i className="mdi mdi-arrow-collapse"></i> Collapse all groups
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="expand-all-btn" onClick={() => this.expandAllGroups()}>
              <i className="mdi mdi-arrow-expand"></i> Expand all groups
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon" data-test="export-excel-btn" onClick={() => this.exportToExcel()}>
              <i className="mdi mdi-file-excel-outline text-success"></i> Export to Excel
            </button>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-outline-secondary btn-xs btn-icon" data-test="group-duration-sort-value-btn"
              onClick={() => this.groupByDuration()}>
              Group by Duration &amp; sort groups by value
            </button>
            <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="group-duration-sort-count-btn"
              onClick={() => this.groupByDurationOrderByCount(false)}>
              Group by Duration &amp; sort groups by count
            </button>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="group-duration-sort-count-collapse-btn"
                onClick={() => this.groupByDurationOrderByCount(true)}>
                Group by Duration &amp; sort groups by count, aggregate collapsed
              </button>
              <button className="btn btn-outline-secondary btn-xs btn-icon mx-1" data-test="group-duration-effort-btn"
                onClick={() => this.groupByDurationEffortDriven()}>
                Group by Duration then Effort-Driven
              </button>
              <button className="btn btn-outline-secondary btn-xs btn-icon" data-test="group-duration-effort-percent-btn"
                onClick={() => this.groupByDurationEffortDrivenPercent()}>
                Group by Duration then Effort-Driven then Percent.
              </button>
              {this.state.processing && <span>
                <i className="mdi mdi-sync mdi-spin"></i>
              </span>}
            </div>
          </div>
        </div>

        <SlickgridReact gridId="grid13"
          columnDefinitions={this.state.columnDefinitions}
          gridOptions={this.state.gridOptions!}
          dataset={this.state.dataset}
          onBeforeExportToExcel={() => this.changeProcessing(true)}
          onAfterExportToExcel={() => this.changeProcessing(false)}
          onReactGridCreated={$event => this.reactGridReady($event.detail)}
        />
      </div>
    );
  }
}
