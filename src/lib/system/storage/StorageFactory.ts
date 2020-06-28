import { Storage } from "./Storage";

export type StorageFactory<S> = (path: string) => Storage<S>;
