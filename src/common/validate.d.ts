export type DataTypes =
  | "enum"
  | "enum-array"
  | "array"
  | "string"
  | "boolean"
  | "number";

export function validateQueryStringParam(
  expectedDataType: DateTypes,
  param: string,
  value: string,
): boolean;

export function validateQueryStringParams(
  queryStringParams: object,
  queryStringParamsDataTypeMap: Map<string, DataTypes>,
): void;

export class InvalidQueryStringParamsError extends Error {
  constructor(message: string, secondaryMessage: string);
}
