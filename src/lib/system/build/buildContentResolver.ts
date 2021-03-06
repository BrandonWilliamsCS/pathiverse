import { ContentResovler } from "../../kernel/ContentResolver";
import { SimpleContentBuilder } from "../content/SimpleContentBuilder";
import { SimpleContentResolution } from "../content/SimpleContentResolution";
import { StoredContentRetriever } from "../content/StoredContentRetriever";
import { StorageFactory } from "../storage/StorageFactory";

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
