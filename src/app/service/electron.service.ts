import { Injectable } from '@angular/core';

import { remote } from 'electron';
const dialog = remote.dialog;

type fileNamesFunction = (fileNames:string[]) => void;

@Injectable()
export class ElectronService {

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

    voidCallback (fileNames:string[]) {

    }

    showSpreadsheetOpenDialog (fn?: fileNamesFunction) {
        dialog.showOpenDialog(remote.getCurrentWindow(), this.xlsOptions, fn || this.voidCallback)
    }
}
