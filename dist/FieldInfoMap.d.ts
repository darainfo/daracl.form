import { FormField } from "./types/FormField";
interface NumberFieldMap {
    [key: string]: FormField;
}
export default class FieldInfoMap {
    private fieldIdx;
    private allFieldInfo;
    private keyNameMap;
    private conditionFields;
    private fieldPrefix;
    constructor(selector: string);
    /**
     * add Field 정보
     *
     * @public
     * @param {FormField} field 폼필드 정보
     */
    addField(field: FormField): void;
    /**
     * 필드명으로 필드 정부 구하기
     *
     * @public
     * @param {string} fieldName 필드명
     * @returns {FormField}
     */
    getFieldName(fieldName: string): FormField;
    /**
     * 필드 키로 정보 구하기
     *
     * @public
     * @param {string} fieldKey
     * @returns {FormField}
     */
    get(fieldKey: string): FormField;
    /**
     * 필드명 있는지 여부 체크.
     *
     * @public
     * @param {string} fieldName 필드명
     * @returns {boolean}
     */
    hasFieldName(fieldName: string): boolean;
    /**
     * 모든 필드 정보
     *
     * @public
     * @returns {NumberFieldMap}
     */
    getAllFieldInfo(): NumberFieldMap;
    /**
     * 필드 정보 맵에서 지우기
     *
     * @public
     * @param {string} fieldName
     */
    removeFieldInfo(fieldName: string): void;
    /**
     * 모든 필드값 구하기
     *
     * @public
     * @param {boolean} isValid
     * @returns {*}
     */
    getAllFieldValue(formValue: any, isValid: boolean): any;
    getFormDataValue(formValue: any, isValid: boolean): Promise<unknown> | FormData;
    /**
     *
     *
     * @param field
     * @returns
     */
    isValueFieldCheck(field: FormField): boolean;
    /**
     * field 활성 비활성화 여부.
     *
     * @param field form field
     * @returns
     */
    isConditionField(field: FormField): boolean;
    /**
     * 컬럼 로우 보이고 안보이기 체크.
     *
     * @public
     */
    conditionCheck(): void;
}
export {};
