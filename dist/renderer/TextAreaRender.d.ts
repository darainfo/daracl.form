import { FormField } from "@t/FormField";
import Render from "./Render";
import DaraForm from "src/DaraForm";
export default class TextAreaRender extends Render {
    private element;
    private field;
    constructor(field: FormField, rowElement: HTMLElement, daraForm: DaraForm);
    initEvent(): void;
    static template(field: FormField): string;
    getValue(): string;
    setValue(value: any): void;
    reset(): void;
    getElement(): HTMLElement;
    valid(): any;
}