import { FormField } from "@t/FormField";
import Render from "./Render";
import { stringValidator } from "src/rule/stringValidator";
import { resetRowElementStyleClass, setInvalidMessage } from "src/util/validUtil";
import { inputEvent } from "src/util/renderEvents";

export default class PasswordRender implements Render {
    private element: HTMLInputElement;
    private rowElement: HTMLElement;
    private field;

    constructor(field: FormField, rowElement: HTMLElement) {
        this.field = field;
        this.rowElement = rowElement;
        this.element = rowElement.querySelector(`[name="${field.$xssName}"]`) as HTMLInputElement;
        this.initEvent();
    }

    initEvent() {
        inputEvent(this.element, this);
    }

    static template(field: FormField): string {
        return `
            <span class="dara-form-field">
                <input type="password" name="${field.name}" class="form-field password" autocomplete="off" /> <i class="help-icon"></i>
            </span>
        `;
    }

    getValue() {
        return this.element.value;
    }

    setValue(value: any): void {
        this.element.value = value;
    }

    reset() {
        this.setValue('');
        resetRowElementStyleClass(this.rowElement);
    }

    getElement(): HTMLElement {
        return this.element;
    }

    valid(): any {
        // TODO password 관련 사항 처리 할것. 
        const validResult = stringValidator(this.getValue(), this.field);

        setInvalidMessage(this.field, this.rowElement, validResult);

        return validResult;
    }
}