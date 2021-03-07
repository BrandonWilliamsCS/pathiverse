import { StorageFactory } from "../storage/StorageFactory";
import { ContentResovler } from "./ContentResolver";
import { SimpleContentBuilder } from "./SimpleContentBuilder";
import { SimpleContentResolution } from "./SimpleContentResolution";
import { StoredContentRetriever } from "./StoredContentRetriever";

/**
 * Creates a ContentResolver that reads string content values from storage.
 * @param contentStorageFactory The source of content
 */
export function buildContentResolver(
  contentStorageFactory: StorageFactory<string>,
): ContentResovler {
  const retreiver = new StoredContentRetriever<string>(contentStorageFactory);
  const builder = new SimpleContentBuilder();
  const resolver = new SimpleContentResolution(retreiver, builder);
  return resolver.resolver;
}
