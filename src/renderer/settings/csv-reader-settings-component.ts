import Vue from "vue";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { PluginSettings } from "./plugin-settings";
// import { TranslationSet } from "../../common/translation/translation-set";
import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./modals/user-confirmation-dialog-params";
import { deepCopy } from "../../common/helpers/object-helpers";
import { PluginType } from "../../main/plugin-type";
import { defaultCsvReaderOptions } from "../../common/config/csv-reader-options";


export const csvReaderSettingsComponent = Vue.extend({
    data() {
        return {
            settingName: PluginSettings.CsvReader,
            visible: false,
        };
    },
    methods: {
        toggleEnabled() {
            const config: UserConfigOptions = this.config;
            config.csvReaderOptions.isEnabled = !config.csvReaderOptions.isEnabled;
            this.updateConfig();
        },
        resetAll() {
            const userConfirmationDialogParams: UserConfirmationDialogParams = {
                callback: () => {
                    const config: UserConfigOptions = this.config;
                    config.csvReaderOptions = deepCopy(defaultCsvReaderOptions);
                    this.updateConfig();
                },
                message: "Are you sure to switch to default settings",
                modalTitle: "reset",
                type: UserConfirmationDialogType.Default,
            };
            vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
        },
        updateConfig() {
            vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config, true, PluginType.CsvReader);
        },
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (this.settingName === settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });
    },
    props: ["config"],
    template: `
    <div v-if="visible">
        <div class="settings__setting-title title is-3">
            <span>
                csvReader
            </span>
            <div>
                <plugin-toggle :is-enabled="config.csvReaderOptions.isEnabled" :toggled="toggleEnabled"/>
                <button class="button" @click="resetAll">
                    <span class="icon">
                        <i class="fas fa-undo-alt"></i>
                    </span>
                </button>
            </div>
        </div>
        <p class="settings__setting-description">csvReaderSettingsDescription</p>
    </div>
    `,
});
