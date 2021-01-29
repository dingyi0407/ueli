"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var operating_system_helpers_1 = require("../helpers/operating-system-helpers");
var windowsApplicationSearchOptions = {
    applicationFileExtensions: [".lnk", ".appref-ms", ".url", ".exe"],
    applicationFolders: [
        "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
        os_1.homedir() + "\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
        os_1.homedir() + "\\Desktop",
    ],
    enabled: true,
    showFullFilePath: false,
    useNativeIcons: true,
};
var macOsApplicationSearchOptions = {
    applicationFileExtensions: [".app"],
    applicationFolders: [
        "/Applications",
        "/System/Library/CoreServices",
        os_1.homedir() + "/Applications",
    ],
    enabled: true,
    showFullFilePath: false,
    useNativeIcons: true,
};
exports.defaultApplicationSearchOptions = operating_system_helpers_1.isWindows(os_1.platform())
    ? windowsApplicationSearchOptions
    : macOsApplicationSearchOptions;
