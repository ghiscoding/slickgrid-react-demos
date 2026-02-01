import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { TextExportService } from '@slickgrid-universal/text-export';
import React, { useEffect, useRef, useState } from 'react';
import {
  DelimiterType,
  Filters,
  Formatters,
  SlickgridReact,
  type Column,
  type Formatter,
  type GridOption,
  type GridStateChange,
  type SlickgridReactInstance,
} from 'slickgrid-react';
import { localeFrench } from './locales/fr';

const NB_ITEMS = 1500;

const taskFormatter: Formatter = (_row, _cell, value) => {
  return value !== undefined ? `Titre ${value}` : '';
};

const exportBooleanFormatter: Formatter = (_row, _cell, value) => {
  return value ? 'Vrai' : 'Faux';
};

const Example2: React.FC = () => {
  const [columnDefinitions, setColumnDefinitions] = useState<Column[]>([]);
  const [dataset] = useState<any[]>(getData(NB_ITEMS));
  const [gridOptions, setGridOptions] = useState<GridOption | undefined>(undefined);
  const [hideSubTitle, setHideSubTitle] = useState(false);
  const [excelExportService] = useState(new ExcelExportService());
  const [textExportService] = useState(new TextExportService());

  const reactGridRef = useRef<SlickgridReactInstance | null>(null);
  let duplicateTitleHeaderCount = 1;

  useEffect(() => {
    defineGrid();
  }, []);

  function reactGridReady(reactGrid: SlickgridReactInstance) {
    reactGridRef.current = reactGrid;
  }

  /* Define grid Options and Columns */
  function defineGrid() {
    const columnDefinitions: Column[] = [
      { id: 'title', name: 'Titre', field: 'id', sortable: true, minWidth: 100, filterable: true, formatter: taskFormatter, params: { useFormatterOuputToFilter: true } },
      { id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80 },
      {
        id: 'duration', name: 'Durée (jours)', field: 'duration', sortable: true,
        formatter: Formatters.percentCompleteBar,
        minWidth: 100,
        filterable: true,
        filter: { model: Filters.compoundSlider, operator: '>=' }
      },
      {
        id: 'start', name: 'Début', field: 'start', minWidth: 100,
        formatter: Formatters.dateIso, outputType: 'dateIso', type: 'date', exportWithFormatter: true,
        filterable: true, filter: { model: Filters.compoundDate }
      },
      {
        id: 'finish', name: 'Fin', field: 'finish',
        formatter: Formatters.dateIso, outputType: 'dateIso', type: 'date', exportWithFormatter: true,
        minWidth: 100, filterable: true, filter: { model: Filters.compoundDate }
      },
      {
        id: 'completedBool', name: 'Complétée', field: 'completedBool', minWidth: 100,
        sortable: true,
        formatter: Formatters.checkmarkMaterial,
        exportCustomFormatter: exportBooleanFormatter,
        filterable: true,
        filter: {
          collection: [{ value: true, label: 'Vrai' }, { value: false, label: 'Faux' }],
          model: Filters.multipleSelect,
        }
      }
    ];

    const gridOptions: GridOption = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
      },
      // use a Single Custom Locales set
      locale: 'fr', // this helps certain elements to know which locale to use, for example the Date Filter/Editor
      locales: localeFrench,
      enableAutoResize: true,
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      customFooterOptions: {
        // optionally display some text on the left footer container
        // leftFooterText: 'custom text shown on left container',
        metricTexts: {
          // default text displayed in the metrics section on the right
          items: 'éléments',
          of: 'de',
          lastUpdate: 'dernière mise à jour',
        },
        dateFormat: 'YYYY-MM-DD, hh:mm a',
        hideTotalItemCount: false,
        hideLastUpdateTimestamp: false,
      },
      excelExportOptions: {
        // optionally pass a custom header to the Excel Sheet
        // a lot of the info can be found on Excel-Builder-Vanilla
        // https://ghiscoding.gitbook.io/excel-builder-vanilla/cookbook/fonts-and-colors
        customExcelHeader: (workbook, sheet) => {
          const stylesheet = workbook.getStyleSheet();
          const aFormatDefn = {
            'font': { 'size': 12, 'fontName': 'Calibri', 'bold': true, color: 'FF0000FF' }, // every color starts with FF, then regular HTML color
            'alignment': { 'wrapText': true }
          };
          const formatterId = stylesheet.createFormat(aFormatDefn);
          sheet.setRowInstructions(0, { height: 30 }); // change height of row 0

          // excel cells start with A1 which is upper left corner
          sheet.mergeCells('B1', 'D1');
          const cols = [];
          // push empty data on A1
          cols.push({ value: '' });
          // push data in B1 cell with metadata formatter
          cols.push({ value: 'Titre qui est suffisament long pour être coupé', metadata: { style: formatterId.id } });
          sheet.data.push(cols);
        }
      },
      gridMenu: {
        hideExportCsvCommand: false,           // false by default, so it's optional
        hideExportTextDelimitedCommand: false  // true by default, so if you want it, you will need to disable the flag
      },
      enableExcelExport: true,
      enableTextExport: true,
      textExportOptions: {
        // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
        exportWithFormatter: true,
        sanitizeDataExport: true
      },
      externalResources: [excelExportService, textExportService],
    };

    setColumnDefinitions(columnDefinitions);
    setGridOptions(gridOptions);
  }

  function getData(count: number) {
    // mock a dataset
    const tmpData: any[] = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);

      tmpData[i] = {
        id: i,
        description: i % 5 ? 'desc ' + i : '🚀🦄 español', // also add some random to test NULL field
        duration: Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        completedBool: i % 5 === 0 ? true : false,
        completed: i % 5 === 0 ? 'TRUE' : 'FALSE',
      };
    }

    return tmpData;
  }

  function dynamicallyAddTitleHeader() {
    // you can dynamically add your column to your column definitions
    // and then use the spread operator [...cols] OR slice to force React to review the changes
    const newCol = {
      id: `title${duplicateTitleHeaderCount++}`,
      field: 'id',
      name: 'Titre',
      formatter: taskFormatter,
      sortable: true,
      minWidth: 100,
      filterable: true,
      params: { useFormatterOuputToFilter: true },
    };
    columnDefinitions.push(newCol);

    setColumnDefinitions(columnDefinitions.slice()); // or use spread operator [...cols]

    // NOTE if you use an Extensions (Checkbox Selector, Row Detail, ...) that modifies the column definitions in any way
    // you MUST use "getAllColumnDefinitions()" from the GridService, using this will be ALL columns including the 1st column that is created internally
    // for example if you use the Checkbox Selector (row selection), you MUST use the code below
    /*
    const allColumns = reactGrid.gridService.getAllColumnDefinitions();
    allColumns.push(newCol);
    columnDefinitions = [...allColumns]; // (or use slice) reassign to column definitions for React to do dirty checking
    */
  }

  function exportToExcel() {
    excelExportService.exportToExcel({
      filename: 'Export',
      format: 'xlsx',
    });
  }

  function exportToFile(type = 'csv') {
    textExportService.exportToFile({
      delimiter: type === 'csv' ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: type === 'csv' ? 'csv' : 'txt',
    });
  }

  /** Dispatched event of a Grid State Changed event */
  function gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Grid State changed:: ', gridStateChanges);
    console.log('Grid State changed:: ', gridStateChanges.change);
  }

  function toggleSubTitle() {
    const newHideSubTitle = !hideSubTitle;
    setHideSubTitle(newHideSubTitle);
    const action = newHideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    reactGridRef.current?.resizerService.resizeGrid(0);
  }

  return !gridOptions ? (
    ''
  ) : (
    <div id="demo-container" className="container-fluid">
      <h2>
        Example 2: Localization with Locales - French Locale displayed
        <span className="float-end font18">
        </span>
        <button
          className="ms-2 btn btn-outline-secondary btn-sm btn-icon"
          type="button"
          data-test="toggle-subtitle"
          onClick={() => toggleSubTitle()}
        >
          <span className="mdi mdi-information-outline" title="Toggle example sub-title details"></span>
        </button>
        <span className="float-end font18">
          see&nbsp;
          <a
            target="_blank"
            href="https://github.com/ghiscoding/slickgrid-react-demos/tree/main/single-locale-without-i18n/src/examples/slickgrid/Example2.tsx"
          >
            <span className="mdi mdi-link-variant"></span> code
          </a>
        </span>
      </h2>

      <div className="subtitle">
        This Examples uses French Locales but you could use your own custom locales
        <ul>
          <li>Defining your own Custom Locales must include all necessary text, see the docs (<a href="https://ghiscoding.gitbook.io/slickgrid-react/localization/localization-with-custom-locales" target="_blank">with Custom Locales</a>)</li>
        </ul>
      </div>

      <hr />

      <div className="row">
        <div className="col-sm-12">
          <span style={{ marginLeft: '20px' }}>
            <button className="btn btn-outline-secondary btn-sm btn-icon" onClick={() => exportToFile('csv')}>
              <i className="mdi mdi-download me-1"></i>
              Télécharger en format CSV
            </button>
            <button className="btn btn-outline-secondary btn-sm btn-icon mx-1" onClick={() => exportToFile('txt')}>
              <i className="mdi mdi-download me-1"></i>
              Télécharger en format Text
            </button>
            <button className="btn btn-outline-secondary btn-sm btn-icon" onClick={() => exportToExcel()}>
              <i className="mdi mdi-file-excel-outline text-success me-1"></i>
              Télécharger vers Excel
            </button>
          </span>
          <span style={{ marginLeft: '10px' }}>
            <button className="btn btn-outline-secondary btn-sm btn-icon" onClick={() => dynamicallyAddTitleHeader()}>
              <i className="mdi mdi-shape-square-plus me-1"></i>
              Ajouter la colonne Titre dynamiquement
            </button>
          </span>
        </div>
      </div>
      <SlickgridReact
        gridId="grid2"
        columns={columnDefinitions}
        options={gridOptions}
        dataset={dataset}
        onReactGridCreated={($event) => reactGridReady($event.detail)}
        onGridStateChanged={($event) => gridStateChanged($event.detail)}
      />
    </div>
  );
};

export default Example2;
