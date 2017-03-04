import { Injectable, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';
import * as _ from 'lodash';

@Injectable()
export class XLSXService implements OnInit {

    private lastImport: any;

    constructor (
        private electron: ElectronService,
    ) {

    }

    ngOnInit () {
    }

    private parseCellAddress (cellAddress) {
        return {
            col: cellAddress.match(/[a-zA-Z]+/)[0],
            row: cellAddress.match(/[0-9]+/)[0],
        }
    }

    public getLastImport () {
        return this.lastImport;
    }

    public parseXLSX (filename) {

        // v=='Date' => w=='Date' => t=='s' ==> ixfe==15
        // v==42371 => w=="02/01/16" => t=='n' ==> ixfe==21
        // v==101 => w=="101" => t=='n' ==> ixfe==15

        let self = this;
        let mainProcess = this.electron.getMainProcess();

        let workbook = mainProcess.parseSpreadsheetFile(filename);

        let readingHeaders = true;
        
        let headerRow:number = undefined;
        let worksheet = {
            name: '',
            headers: [],
            statements: []
        };

        let currentRow = undefined;
        let worksheetObj = workbook.Sheets[workbook.SheetNames];
        worksheet.name = workbook.SheetNames[0];
        let statement = undefined;

        for (let cellAddress in worksheetObj) {

            /* all keys that do not begin with "!" correspond to cell addresses */
            if(cellAddress[0] !== '!') {

                let cellObj = worksheetObj[cellAddress];
                let cell = self.parseCellAddress(cellAddress);

                if (headerRow == undefined) {
                    headerRow = cell.row;
                }

                if (cell.row == headerRow) {

                    // Processing headers
                    worksheet.headers.push({
                        name: cellObj.v,
                        cell: cell,
                    });

                } else {

                    let header = _.find (worksheet.headers, { cell: { col : cell.col }});

                    if (currentRow == undefined || currentRow != cell.row) {
                        currentRow = cell.row;

                        if (statement != undefined){
                            // Row complete, save it
                            worksheet.statements.push(statement);
                        }

                        statement = {
                            fields: []
                        };

                    }

                    statement.fields.push({
                        value: cellObj.w,
                        cell: cell,
                        header: header,
                    });

                }
            }
        }

        this.lastImport = worksheet;

        return worksheet;
    }
};

