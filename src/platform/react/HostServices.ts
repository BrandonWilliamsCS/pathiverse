import { ActionMiddleware } from "system/ActionMiddleware";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface HostServices<S> {
  actionMiddleware: ActionMiddleware<S>;
  interfaceElementRenderer: InterfaceElementRenderer;
}
