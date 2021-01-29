"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var light = {
    name: "Light",
    userInputBackgroundColor: "#fff",
    userInputTextColor: "#000",
    searchResultsBackgroundColor: "#fff",
    searchResultsItemActiveBackgroundColor: "#1976D2",
    searchResultsItemActiveDescriptionColor: "#ccc",
    searchResultsItemActiveTextColor: "#fff",
    searchResultsItemDescriptionTextColor: "#666",
    searchResultsItemNameTextcolor: "#000",
    scrollbarBackgroundColor: "#ccc",
    scrollbarForegroundColor: "#858585",
};
var dark = {
    name: "Dark",
    userInputBackgroundColor: "#000",
    userInputTextColor: "#fff",
    searchResultsBackgroundColor: "#000",
    searchResultsItemActiveBackgroundColor: "#0078d7",
    searchResultsItemActiveDescriptionColor: "#ccc",
    searchResultsItemActiveTextColor: "#fff",
    searchResultsItemDescriptionTextColor: "#ccc",
    searchResultsItemNameTextcolor: "#fff",
    scrollbarBackgroundColor: "#222",
    scrollbarForegroundColor: "#444",
};
exports.atomOneDark = {
    name: "Atom One Dark",
    userInputBackgroundColor: "#20252b",
    userInputTextColor: "#fff",
    searchResultsBackgroundColor: "#272c34",
    searchResultsItemActiveBackgroundColor: "#3d4452",
    searchResultsItemActiveDescriptionColor: "#fff",
    searchResultsItemActiveTextColor: "#fff",
    searchResultsItemDescriptionTextColor: "#ccc",
    searchResultsItemNameTextcolor: "#aab2c0",
    scrollbarBackgroundColor: "#1f2328",
    scrollbarForegroundColor: "#3d444f",
};
exports.colorThemes = [
    exports.atomOneDark,
    dark,
    light,
];
