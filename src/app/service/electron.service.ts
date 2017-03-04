import { Injectable, OnInit } from '@angular/core';

import { remote } from 'electron';
const dialog = remote.dialog;

type fileNamesFunction = (fileNames:string[]) => void;

@Injectable()
export class ElectronService implements OnInit {

    private xlsOptions: Object = {
        title: 'The title',
        defaultPath: './',
        filters: [
            { name: 'Spreadsheets', extensions: ['xls', 'xlsx', 'csv'] }
        ],
        properties: [
            'openFile'
        ]
    };

    constructor () {

    }

    ngOnInit () {
        return remote.require('./main.js');
    }
    
    getMainProcess () {
        return remote.require('./main.js');
    }

    voidCallback (fileNames:string[]) {

    }

    showSpreadsheetOpenDialog (fn?: fileNamesFunction) {
        dialog.showOpenDialog(remote.getCurrentWindow(), this.xlsOptions, fn || this.voidCallback);
    }

    getXMLParser () {
        let window:any = remote.getCurrentWindow();

        if (window) {
            return window.finances.xlsx;
        }
    }

    parseSpreadsheet (file) {
        let window: any = remote.getCurrentWindow();

        if (window && window.finances && window.finances.parseSpreadsheet) {
            let parser = window.finances.getParser();
            return parser.parse(file);
        }

        return null; 
    }
}
