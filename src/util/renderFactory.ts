import { FormField } from "@t/FormField";

import Render from "../renderer/Render";
import { RENDER_TEMPLATE } from "../constants";
import utils from "./utils";

export const getRenderer = (field: FormField): Render => {
  let renderType = field.renderType || "text";

  if (utils.isUndefined(field.name) && field.children) {
    return RENDER_TEMPLATE["group"];
  }

  let render = RENDER_TEMPLATE[renderType];

  return render ? render : RENDER_TEMPLATE["text"];
};

export const getRenderTemplate = (field: FormField): string => {
  let render = getRenderer(field) as any;

  return render.template(field);
};
