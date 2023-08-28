import { FormField } from "@t/FormField";
import { ValidResult } from "@t/ValidResult";
import DaraForm from "src/DaraForm";
export default abstract class Render {
    protected daraForm: DaraForm;
    protected rowElement: HTMLElement;
    protected field: FormField;
    constructor(form: DaraForm, field: FormField, rowElement: HTMLElement);
    setDefaultInfo(): void;
    getForm(): DaraForm;
    abstract initEvent(): void;
    abstract getValue(): any;
    abstract setValue(value: any): void;
    abstract reset(): void;
    abstract getElement(): any;
    abstract valid(): ValidResult | boolean;
    setValueItems(value: any): void;
    changeEventCall(field: FormField, e: Event | null, rederInfo: Render): void;
    focus(): void;
    show(): void;
    hide(): void;
    setDisabled(flag: boolean): void;
    commonValidator(): void;
    static valuesValueKey(field: FormField): string;
    static valuesLabelKey(field: FormField): string;
    static valuesLabelValue(label: string, val: any): any;
}
