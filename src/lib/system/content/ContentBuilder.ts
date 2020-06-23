import { Content } from "../../Content";

/**
 * Performs the second part of Content resolution: converting raw data to a useful format.
 */
export abstract class ContentBuilder<R> {
  public abstract build(type: string, rawData: R): Promise<Content>;
}
