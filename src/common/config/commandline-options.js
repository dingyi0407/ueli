"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operating_system_helpers_1 = require("../helpers/operating-system-helpers");
var os_1 = require("os");
var shells_1 = require("../../main/plugins/commandline-plugin/shells");
var defaultMacOsCommandlineOptions = {
    isEnabled: true,
    prefix: ">",
    shell: shells_1.MacOsShell.Terminal,
};
var defaultWindowsCommandlineOptions = {
    isEnabled: true,
    prefix: ">",
    shell: shells_1.WindowsShell.Cmd,
};
exports.defaultCommandlineOptions = operating_system_helpers_1.isWindows(os_1.platform())
    ? defaultWindowsCommandlineOptions
    : defaultMacOsCommandlineOptions;
