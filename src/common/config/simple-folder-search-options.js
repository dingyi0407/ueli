"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
exports.defaultSimpleFolderSearchOptions = {
    folders: [
        {
            excludeHiddenFiles: true,
            folderPath: os_1.homedir(),
            recursive: false,
        },
    ],
    isEnabled: true,
    showFullFilePath: true,
};
