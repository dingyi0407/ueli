import { SearchPlugin } from "../../search-plugin";
import { PluginType } from "../../plugin-type";
// import { TranslationSet } from "../../../common/translation/translation-set";
import { CsvReaderOptions } from "../../../common/config/csv-reader-options";
import { SearchResultItem } from "../../../common/search-result-item";
import { defaultCsvReaderIcon } from "../../../common/icon/default-icons";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { CsvRecord } from "./csv-record";
import * as fs from "fs";

import parse = require('csv-parse')

export class CsvReaderPlugin implements SearchPlugin {
    public readonly pluginType = PluginType.CsvReader;

    private config: CsvReaderOptions;
    // private translations: TranslationSet;
    // private csvReaderResults: csvReaderResult[];
    private searchList: CsvRecord[]
    private readonly clipboardCopier: (value: string) => Promise<void>;

    constructor(
        config: CsvReaderOptions, clipboardCopier: (value: string) => Promise<void>
    ){
        // config: CsvReaderOptions,
        // translation: TranslationSet,
        this.config = config;
        // this.translations = translations;
        this.searchList = []
        this.clipboardCopier = clipboardCopier;
    }

    public getAll(): Promise<SearchResultItem[]> {
        return new Promise((resolve) => {
            resolve(this.searchList.map((csvRecord) => this.buildResultItem(csvRecord)))
        });
    }

    public refreshIndex(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getSearchList()
                .then((result) => {
                    this.searchList = result;
                    resolve();
                })
                .catch((err) => reject(err))
        })
    }

    public isEnabled(): boolean {
        return this.config.isEnabled;
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        return this.clipboardCopier(searchResultItem.executionArgument);
    }

    public clearCache(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        })
    }

    public updateConfig(updatedConfig: UserConfigOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            this.config = updatedConfig.csvReaderOptions
            resolve()
        })
    }
    // public updateConfig 
    //TODO: turn this function to Promise<CsvRecord>
    public getSearchList(): Promise<CsvRecord[]> {
        return new Promise((resolve) => {
            // TODO: set filepath from config
            let retSearchItem: CsvRecord[] = []
            // let filename: string = __dirname + 'C:\\repo\\ueli\\src\\main\\plugins\\csv-reader-plugin\\randomGenerateResult.csv';
            let filename: string = 'C:\\repo\\ueli\\src\\main\\plugins\\csv-reader-plugin\\randomGenerateResult.csv';
            fs.readFile(filename, 'utf-8', (err, f) => {
                parse(f, function(err, data: string[][]) {
                    // for (let line of data) {
                    //     let result: string = line.shift()!
                    //     for (let line of data ) {
                    //         let item =  { result: result, query: line.shift()! }
                    //         retSearchItem.push(item)
                    //         }
                    for (let line of data) {
                        let item = { result: line.shift()!, queries: line }
                        retSearchItem.push(item)
                    }
                })
            })
            resolve(retSearchItem)
        })
    }

    public buildResultItem(csvRecord: CsvRecord): SearchResultItem {
        return {
            description: csvRecord.queries.join(","),
            executionArgument: csvRecord.result,
            // executionArgument: "test",
            hideMainWindowAfterExecution: true,
            icon: defaultCsvReaderIcon,
            name: csvRecord.result,
            // name: "test1",
            needsUserConfirmationBeforeExecution: false,
            originPluginType: this.pluginType,
            searchable: [csvRecord.queries.join("")],
            //searchable :TOdo list to string 
            // searchable: ["test2"]
        };
    } 
}