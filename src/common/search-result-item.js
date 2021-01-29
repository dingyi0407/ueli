"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSearchResultItemViewModel(searchResult, counter) {
    return {
        active: false,
        description: searchResult.description,
        executionArgument: searchResult.executionArgument,
        hideMainWindowAfterExecution: searchResult.hideMainWindowAfterExecution,
        icon: searchResult.icon,
        id: "search-result-item-" + counter,
        name: searchResult.name,
        needsUserConfirmationBeforeExecution: searchResult.needsUserConfirmationBeforeExecution,
        originPluginType: searchResult.originPluginType,
        resultNumber: counter,
        searchable: searchResult.searchable,
        supportsAutocompletion: searchResult.supportsAutocompletion,
        supportsOpenLocation: searchResult.supportsOpenLocation,
    };
}
exports.createSearchResultItemViewModel = createSearchResultItemViewModel;
