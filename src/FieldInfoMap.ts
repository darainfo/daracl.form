import { FIELD_PREFIX } from "src/constants";
import { FormField } from "./types/FormField";
import { ValidResult } from "./types/ValidResult";
import util from "./util/utils";
import { getRenderer } from "./util/renderFactory";
import { reject } from "lodash";
import { resolve } from "path";
import Lanauage from "./util/Lanauage";

interface NumberFieldMap {
    [key: string]: FormField;
}

interface StringNumberMap {
    [key: string]: string;
}

export default class FieldInfoMap {

    private fieldIdx = 0;

    private allFieldInfo: NumberFieldMap = {};

    private keyNameMap: StringNumberMap = {};

    private conditionFields: string[] = [];

    private fieldPrefix;

    constructor(selector: string) {
        this.fieldPrefix = `${FIELD_PREFIX}-${util.getHashCode(selector)}`;
    }

    /**
     * add Field 정보
     *
     * @public
     * @param {FormField} field 폼필드 정보
     */
    public addField(field: FormField) {
        this.fieldIdx += 1;
        field.$key = `${this.fieldPrefix}-${this.fieldIdx}`;
        this.keyNameMap[field.name] = field.$key;
        this.allFieldInfo[field.$key] = field;
        field.$renderer = getRenderer(field);

        if (field.conditional) {
            this.conditionFields.push(field.$key);
        }
    }


    /**
     * 필드명으로 필드 정부 구하기
     *
     * @public
     * @param {string} fieldName 필드명
     * @returns {FormField}
     */
    public getFieldName(fieldName: string): FormField {
        return this.allFieldInfo[this.keyNameMap[fieldName]];
    }

    /**
     * 필드 키로 정보 구하기 
     *
     * @public
     * @param {string} fieldKey
     * @returns {FormField}
     */
    public get(fieldKey: string): FormField {
        return this.allFieldInfo[fieldKey];
    }

    /**
     * 필드명 있는지 여부 체크. 
     *
     * @public
     * @param {string} fieldName 필드명
     * @returns {boolean}
     */
    public hasFieldName(fieldName: string): boolean {
        if (this.keyNameMap[fieldName] && this.allFieldInfo[this.keyNameMap[fieldName]]) {
            return true;
        }

        return false;
    }

    /**
     * 모든 필드 정보 
     *
     * @public
     * @returns {NumberFieldMap}
     */
    public getAllFieldInfo(): NumberFieldMap {
        return this.allFieldInfo;
    }

    /**
     * 필드 정보 맵에서 지우기
     *
     * @public
     * @param {string} fieldName
     */
    public removeFieldInfo(fieldName: string) {
        delete this.allFieldInfo[this.keyNameMap[fieldName]];
    }

    /**
     * 모든 필드값 구하기
     *
     * @public
     * @param {boolean} isValid
     * @returns {*}
     */
    public getAllFieldValue(formValue: any, isValid: boolean) {
        if (isValid !== true) {
            for (const fieldKey in this.allFieldInfo) {
                const filedInfo = this.allFieldInfo[fieldKey];
                formValue[filedInfo.name] = filedInfo.$renderer.getValue();
            }
            return formValue;
        }

        return new Promise((resolve, reject) => {

            for (const fieldKey in this.allFieldInfo) {
                const filedInfo = this.allFieldInfo[fieldKey];
                
                if(!this.isValueFieldCheck(filedInfo)){
                    continue; 
                }

                const renderInfo = filedInfo.$renderer;
                let fieldValid = renderInfo.valid();

                if (fieldValid !== true) {
                    renderInfo.focus();
                    fieldValid = fieldValid as ValidResult;
                    fieldValid.message = Lanauage.validMessage(filedInfo, fieldValid)[0];
                    reject(new Error(fieldValid.message, { cause: fieldValid }));
                    return;
                }

                formValue[filedInfo.name] = renderInfo.getValue();
            }

            resolve(formValue);
        });
    }

    public getFormDataValue(formValue: any, isValid: boolean) {

        if (isValid !== true) {
            let reval = new FormData();

            for (const formKey in formValue) {
                reval.set(formKey, formValue[formKey]);
            }

            for (const fieldKey in this.allFieldInfo) {
                const filedInfo = this.allFieldInfo[fieldKey];
                reval.set(filedInfo.name, filedInfo.$renderer.getValue());
            }

            return reval;
        }

        return new Promise((resolve, reject) => {
            let reval = new FormData();

            for (const formKey in formValue) {
                reval.set(formKey, formValue[formKey]);
            }

            for (const fieldKey in this.allFieldInfo) {
                const filedInfo = this.allFieldInfo[fieldKey];
                
                if(!this.isValueFieldCheck(filedInfo)){
                    continue; 
                }

                const renderInfo = filedInfo.$renderer;
                let fieldValid = renderInfo.valid();

                if (fieldValid !== true) {
                    renderInfo.focus();
                    fieldValid = fieldValid as ValidResult;
                    fieldValid.message = Lanauage.validMessage(filedInfo, fieldValid)[0];
                    reject(new Error(fieldValid.message, { cause: fieldValid }));
                    return;
                }

                reval.set(filedInfo.name, renderInfo.getValue());
            }

            resolve(reval);
        });
    }

    /**
     * 
     * 
     * @param field 
     * @returns 
     */
    public isValueFieldCheck(field: FormField){

        let parent = field; 
        
        while(typeof parent !=='undefined'){ 
            if(!this.isConditionField(parent)){
                return false; 
            }

            parent = parent.$parent; 
        }

        return true; 
    }

    /**
     * field 활성 비활성화 여부.
     * 
     * @param field form field
     * @returns 
     */
    public isConditionField(field: FormField){

        if(!this.conditionFields.includes(field.$key)){
            return true;
        }

        let condFlag = false;

        if (field.conditional.custom) {
            condFlag = field.conditional.custom.call(null, field);
        }else {
            if (field.conditional.field) {
                const condField = this.getFieldName(field.conditional.field);
    
                if (condField) {
                    if (field.conditional.eq == condField.$renderer.getValue()) {
                        condFlag = true;
                    }
                }
            }
        }

        return condFlag; 
    }

    /**
     * 컬럼 로우 보이고 안보이기 체크. 
     *
     * @public
     */
    public conditionCheck() {
        this.conditionFields.forEach(fieldKey => {
            const filedInfo = this.allFieldInfo[fieldKey];

            let condFlag = this.isConditionField(filedInfo);

            if (condFlag) {
               filedInfo.$renderer.show();
            } else {
               filedInfo.$renderer.hide();
            }
        })
    }
}