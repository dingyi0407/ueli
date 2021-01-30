import Vue from "vue";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { PluginSettings } from "./plugin-settings";
import { ModalEditMode } from "./modals/modal-edit-mode";
// import { TranslationSet } from "../../common/translation/translation-set";
import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./modals/user-confirmation-dialog-params";
import { deepCopy } from "../../common/helpers/object-helpers";
import { PluginType } from "../../main/plugin-type";
import { CsvReaderCsvOption, defaultCsvReaderOptions } from "../../common/config/csv-reader-options";


export const csvReaderSettingsComponent = Vue.extend({
    data() {
        return {
            settingName: PluginSettings.CsvReader,
            visible: false,
            currentOptions: {
              path: "",
              reversiable: false
            }
        };
    },
    methods: {
        addPath() {
          vueEventDispatcher.$emit(VueEventChannels.openCsvReaderEditingModal);
        },
        editPath(index: number) {
          const config: UserConfigOptions = this.config;
          const csvOptions = config.csvReaderOptions.csvs[index];
          vueEventDispatcher.$emit(VueEventChannels.openCsvReaderEditingModal, csvOptions, ModalEditMode.Edit, index);
        },
        removePath(index: number) {
          const config: UserConfigOptions = this.config;
          config.csvReaderOptions.csvs.splice(index, 1);
          this.updateConfig(true);
        },
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
        updateForView() {
            
        }
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (this.settingName === settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });

        vueEventDispatcher.$on(VueEventChannels.csvReaderOptionSaved, (options: CsvReaderCsvOption, editMode: ModalEditMode, saveIndex?: number) => {
          const config: UserConfigOptions = this.config;
          if (editMode === ModalEditMode.Edit) {
            if (typeof saveIndex === "number") {
              // config.csvReaderOptions.csvs[saveIndex] = options;
              Vue.set(config.csvReaderOptions.csvs, saveIndex, options)
            }
          } else if (editMode === ModalEditMode.Add) {
              config.csvReaderOptions.csvs.push(options);
          }
          this.updateForView();
          this.updateConfig(true);
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
      <p class="settings__setting-description">A plugin for quick-searching data from csv</p>
      <div class="settings__setting-content">
        <div class="table-container">
          <div class="settings__setting-content-item box">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>FilePath</th>
                  <th>Reserviable</th>
                  <th class="has-text-centered">edit</th>
                  <th class="has-text-centered">remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(csv, index) in config.csvReaderOptions.csvs">
                  <td> {{ csv.path }}</td>
                  <td class="has-text-cnetered"><i v-if="csv.reverseSearchEnabled"
                                                    class="fas fa-check"></i></td>
                  <td class="has-text-centered">
                    <button class="button" @click="editPath(index)">
                      <span class="icon">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                  </td>
                  <td class="has-text-centered">
                    <button class="button is-danger" @click="removePath(index)">
                      <span class="icon">
                        <i class="fas fa-trash"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
        <div>
          <button class="button is-success" @click="addPath">
          <span class="icon"><i class="fas fa-plus"></i></span>
          <span>Add File</span>  
          </button>
        </div>
      </div>
      <csv-reader-editing></csv-reader-editing>
    </div>
    `,
});
