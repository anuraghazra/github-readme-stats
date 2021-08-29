import { VercelRequestQuery } from "@vercel/node";

type ValueOf<T> = T[keyof T];

type ValueOfQuery = ValueOf<VercelRequestQuery> | undefined;

const isValueEmpty = (value: ValueOfQuery): boolean => {
  return !value || value.length === 0;
};

export const toBoolean = (value: ValueOfQuery): boolean | undefined => {
  return value === "true" || value === "false" ? JSON.parse(value) : undefined;
};

export const toString = (value: ValueOfQuery): string | undefined => {
  if (isValueEmpty(value)) return undefined;
  const originalValue = Array.isArray(value) ? value[0] : value;

  return typeof originalValue === "string" ? originalValue : undefined;
};

export const toInteger = (value: ValueOfQuery = ""): number | undefined => {
  const number = parseInt(value.toString(), 10);
  return isNaN(number) ? undefined : number;
};

export const toFloatingNumber = (
  value: ValueOfQuery = "",
): number | undefined => {
  const number = parseFloat(value.toString());

  return isNaN(number) ? undefined : number;
};

export const toStringArray = (value: ValueOfQuery): string[] => {
  if (isValueEmpty(value)) return [];

  const originalArray = Array.isArray(value) ? value : [value!];

  return originalArray.every((value) => typeof value === "string")
    ? originalArray
    : [];
};
