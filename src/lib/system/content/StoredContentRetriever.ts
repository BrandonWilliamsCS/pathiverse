import { ContentIndicator } from "../../Content";
import { StorageFactory } from "../storage/Storage";

/**
 * Retrieves raw content from Storage using the ContentIndicator name as a path.
 */
export class StoredContentRetriever<R> {
  public constructor(private readonly storageFactory: StorageFactory<R>) {}

  public async retrieve(indicator: ContentIndicator): Promise<R> {
    const storage = this.storageFactory(indicator.name);
    const value = await storage.readValue();
    return value;
  }
}
