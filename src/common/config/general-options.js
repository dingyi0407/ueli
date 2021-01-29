"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var language_1 = require("../translation/language");
var global_hot_key_key_1 = require("../global-hot-key/global-hot-key-key");
var global_hot_key_modifier_1 = require("../global-hot-key/global-hot-key-modifier");
exports.defaultGeneralOptions = {
    allowWindowMove: true,
    autostart: true,
    clearCachesOnExit: false,
    hideMainWindowAfterExecution: true,
    hideMainWindowOnBlur: true,
    hotKey: {
        key: global_hot_key_key_1.GlobalHotKeyKey.Space,
        modifier: global_hot_key_modifier_1.GlobalHotKeyModifier.Alt,
    },
    language: language_1.Language.English,
    logExecution: true,
    persistentUserInput: false,
    rememberWindowPosition: false,
    rescanEnabled: true,
    rescanIntervalInSeconds: 300,
    showAlwaysOnPrimaryDisplay: false,
    showTrayIcon: true,
};
