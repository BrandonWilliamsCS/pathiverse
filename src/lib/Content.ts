export interface Content<CType extends string> {
  type: CType;
}

export interface ContentIndicator<CType extends string> {
  type: CType;
  name: string;
}
