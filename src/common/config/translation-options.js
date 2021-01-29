"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translation_language_1 = require("../../main/plugins/translation-plugin/translation-language");
exports.defaultTranslationOptions = {
    debounceDelay: 250,
    enabled: false,
    minSearchTermLength: 3,
    prefix: "t?",
    sourceLanguage: translation_language_1.TranslationLanguage.German,
    targetLanguage: translation_language_1.TranslationLanguage.English,
};
