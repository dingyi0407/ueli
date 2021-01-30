import Vue from "vue";
import { vueEventDispatcher } from "../../vue-event-dispatcher";
import { VueEventChannels } from "../../vue-event-channels";
// import { CsvReaderCsvOption, CsvReaderOptions } from "../../../common/config/csv-reader-options";
import { CsvReaderCsvOption } from "../../../common/config/csv-reader-options";
import { ModalEditMode } from "./modal-edit-mode";
import { NotificationType } from "../../../common/notification-type";
import { existsSync, lstatSync } from "fs";
import { getFilePath } from "../../dialogs";
// import { TranslationSet } from "../../../common/translation/translation-set";
import { deepCopy } from "../../../common/helpers/object-helpers";

const initialCsvOptions: CsvReaderCsvOption = {
    path: "",
    reverseSearchEnabled: false
};

const filePathValidator = (filePath: string): boolean => {
    return filePath.length > 0
        && existsSync(filePath)
        && lstatSync(filePath).isFile();
};

export const csvReaderEditingModalComponent = Vue.extend({
    data() {
        return {
            editMode: ModalEditMode.Add,
            options: deepCopy(initialCsvOptions),
            saveIndex: undefined,
            visible: false,
            test: false
        };
    },
    methods: {
        getModalTitle(): string {
            // const translations: TranslationSet = this.translations;
            const editMode: ModalEditMode = this.editMode;
            switch (editMode) {
                case ModalEditMode.Add:
                    return "Add Path";
                case ModalEditMode.Edit:
                    return "Edit Path";
            }
        },
        closeModal() {
            this.editMode = ModalEditMode.Add;
            this.options = deepCopy(initialCsvOptions);
            this.saveIndex = 0;
            this.visible = false;
        },
        openFileDialog() {
          getFilePath()
                .then((path) => {
                    const options: CsvReaderCsvOption = this.options;
                    options.path = path;
                })
                .catch((err) => {
                    // do nothing if no folder is selected
                });
        },
        saveButtonClick() {
            const options: CsvReaderCsvOption = this.options;
            if (filePathValidator(options.path)) {
                vueEventDispatcher.$emit(VueEventChannels.csvReaderOptionSaved, options, this.editMode, this.saveIndex);
                this.closeModal();
            } else {
                vueEventDispatcher.$emit(VueEventChannels.notification, "Invalid folder path", NotificationType.Error);
            }
        },
        formIsValid(): boolean {
            const options: CsvReaderCsvOption = this.options;
            return filePathValidator(options.path);
        },
        getFilePathPlaceholder(): string {
            // const translations: TranslationSet = this.translations;
            // return `${translations.forExample}: ${join(homedir(), "Downloads")}`;
            return "placeHolder";
        },
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.openCsvReaderEditingModal, (csvOptions?: CsvReaderCsvOption, editMode?: ModalEditMode, saveIndex?: number) => {
            if (editMode) {
                this.editMode = editMode;
            }

            if (csvOptions) {
                this.options = deepCopy(csvOptions);
            }

            if (typeof saveIndex === "number") {
                this.saveIndex = saveIndex;
            }

            this.visible = true;
        });
    },
    props: ["translations"],
    template: `
        <div class="modal" :class="{ 'is-active' : visible }">
            <div class="modal-background" @click="closeModal"></div>
            <div class="modal-content">
                <div class="message">
                    <div class="message-header">
                        <p>{{ getModalTitle() }}</p>
                        <button class="delete" @click="closeModal" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        <div class="field">
                            <label class="label">
                                FilePath
                            </label>
                        </div>
                        <div class="field has-addons">
                            <div class="control is-expanded">
                                <input class="input" type="text" v-model="options.path" :placeholder="getFilePathPlaceholder()">
                            </div>
                            <div class="control">
                                <button class="button" @click="openFileDialog" autofocus>
                                    <span class="icon">
                                        <i class="fas fa-folder"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">
                                reversiable
                            </label>
                            <div class="control">
                                <input class="is-checkradio" id="reversiableCheckbox" type="checkbox" name="reversiableCheckbox" v-model="options.reverseSearchEnabled">
                                <label for="reversiableCheckbox"></label>
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-danger" @click="closeModal">
                                    <span class="icon">
                                        <i class="fas fa-times"></i>
                                    </span>
                                    <span>
                                        cancel
                                    </span>
                                </button>
                                <button class="button is-success" :disabled="!formIsValid()" @click="saveButtonClick">
                                    <span class="icon">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span>
                                        save
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
});
