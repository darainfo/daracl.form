import NumberRender from "src/renderer/NumberRender";
import TextAreaRender from "src/renderer/TextAreaRender";
import DropdownRender from "src/renderer/DropdownRender";
import TextRender from "src/renderer/TextRender";
import CheckboxRender from "src/renderer/CheckboxRender";
import RadioRender from "src/renderer/RadioRender";
import PasswordRender from "src/renderer/PasswordRender";
import FileRender from "src/renderer/FileRender";
import CustomRender from "./renderer/CustomRender";


export const RULES = {
    MIN: 'minimum',
    EXCLUSIVE_MIN: 'exclusiveMinimum',
    MAX: 'maximum',
    EXCLUSIVE_MAX: 'exclusiveMaximum',
    MIN_LENGTH: 'minLength',
    MAX_LENGTH: 'maxLength',
    BETWEEN: 'between',
    BETWEEN_EXCLUSIVE_MIN: 'betweenExclusiveMin',
    BETWEEN_EXCLUSIVE_MAX: 'betweenExclusiveMax',
    BETWEEN_EXCLUSIVE_MINMAX: 'betweenExclusiveMinMax',
    REGEXP: 'regexp',
    REQUIRED: 'required',
    VALIDATOR: 'validator',
} as const;


export const RENDER_TEMPLATE: any = {
    'number': NumberRender
    , 'textarea': TextAreaRender
    , 'dropdown': DropdownRender
    , 'checkbox': CheckboxRender
    , 'radio': RadioRender
    , 'text': TextRender
    , 'password': PasswordRender
    , 'file': FileRender
    , 'custom': CustomRender
};

export type FORM_FIELD_TYPE = 'number' | 'string' | 'array';

export type RENDER_TYPE = 'number' | 'text' | 'file' | 'textarea' | 'dropdown' | 'radio' | 'checkbox' | 'date' | 'group' | 'custom';

export type REGEXP_TYPE = 'email' | 'url' | 'alpha' | 'alpha-num';