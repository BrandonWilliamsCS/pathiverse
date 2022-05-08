import { ActionMiddleware } from "system/ActionMiddleware";
import { HostServices } from "./HostServices";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export class HostServicesBuilder<S> {
  private readonly actionMiddlewarePieces: ActionMiddleware<S>[] = [];
  private readonly interfaceElementRendererPieces: InterfaceElementRenderer[] =
    [];

  public registerActionMiddleware(middleware: ActionMiddleware<S>) {
    this.actionMiddlewarePieces.push(middleware);
  }

  public registerInterfaceElementRenderer(renderer: InterfaceElementRenderer) {
    this.interfaceElementRendererPieces.push(renderer);
  }

  public build(): HostServices<S> {
    return {
      actionMiddleware: this.buildActionMiddleware(),
      interfaceElementRenderer: this.buildInterfaceElementRenderer(),
    };
  }

  private buildActionMiddleware(): ActionMiddleware<S> {
    return this.actionMiddlewarePieces.reduceRight(
      (acc, incoming) => (action, next) =>
        incoming(action, (a) => acc(a, next)),
    );
  }

  private buildInterfaceElementRenderer(): InterfaceElementRenderer {
    return {
      canRender: (interfaceElement) =>
        this.interfaceElementRendererPieces.some((renderer) =>
          renderer.canRender(interfaceElement),
        ),
      render: (interfaceElement, actionHandler, interfaceElementRenderer) =>
        this.interfaceElementRendererPieces
          .find((renderer) => renderer.canRender(interfaceElement))!
          .render(interfaceElement, actionHandler, interfaceElementRenderer),
    };
  }
}
