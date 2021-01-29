"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operating_system_1 = require("../operating-system");
function getCurrentOperatingSystem(platform) {
    switch (platform) {
        case "win32": return operating_system_1.OperatingSystem.Windows;
        case "darwin": return operating_system_1.OperatingSystem.macOS;
        default: throw new Error("Platform \"" + platform + "\" is not supported");
    }
}
exports.getCurrentOperatingSystem = getCurrentOperatingSystem;
function isWindows(platform) {
    return getCurrentOperatingSystem(platform) === operating_system_1.OperatingSystem.Windows;
}
exports.isWindows = isWindows;
function isMacOs(platform) {
    return getCurrentOperatingSystem(platform) === operating_system_1.OperatingSystem.macOS;
}
exports.isMacOs = isMacOs;
