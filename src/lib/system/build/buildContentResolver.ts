import { ContentResovler } from "../../kernel/ContentResolver";
import { SimpleContentBuilder } from "../content/SimpleContentBuilder";
import { SimpleContentResolution } from "../content/SimpleContentResolution";
import { StoredContentRetriever } from "../content/StoredContentRetriever";
import { StorageFactory } from "../storage/Storage";

/**
 * Creates a ContentResolver that reads string content values from storage.
 * @param contentStorageFactory The source of content
 */
export function buildContentResolver<CType extends string>(
  contentStorageFactory: StorageFactory<string>,
): ContentResovler<CType> {
  const retreiver = new StoredContentRetriever<CType, string>(
    contentStorageFactory,
  );
  const builder = new SimpleContentBuilder<CType>();
  const resolver = new SimpleContentResolution(retreiver, builder);
  return resolver.resolver;
}
