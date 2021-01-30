export interface CsvReaderOptions {
    isEnabled: boolean;
    csvs: CsvReaderCsvOption[];
}

export interface CsvReaderCsvOption {
  path: string;
  reverseSearchEnabled: boolean;
}

export const defaultCsvReaderOptions: CsvReaderOptions = {
    isEnabled: true,
    csvs: [
      {
        path: 'C:\\repo\\ueli\\src\\main\\plugins\\csv-reader-plugin\\randomGenerateResult.csv',
        reverseSearchEnabled: false,
      },
      {
        path: 'C:\\test.csv',
        reverseSearchEnabled: true
      }
    ]
}