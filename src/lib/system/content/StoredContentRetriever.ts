import { ContentIndicator } from "../../Content";
import { StorageFactory } from "../storage/Storage";

/**
 * Retrieves raw content from Storage using the ContentIndicator name as a path.
 */
export class StoredContentRetriever<CType extends string, R> {
  public constructor(private readonly storageFactory: StorageFactory<R>) {}

  public async retrieve(indicator: ContentIndicator<CType>): Promise<R> {
    const storage = this.storageFactory(indicator.name);
    const value = await storage.readValue();
    return value;
  }
}
