import { VercelRequestQuery } from "@vercel/node";

type ValueOf<T> = T[keyof T];

type ValueOfQuery = ValueOf<VercelRequestQuery>;

const isValueEmpty = (value?: ValueOfQuery): boolean => {
  return !value || value.length === 0;
};

export const toBoolean = (value: ValueOfQuery): boolean | undefined => {
  return value === "true" || value === "false" ? Boolean(value) : undefined;
};

export const toString = (value: ValueOfQuery): string | undefined => {
  return isValueEmpty(value)
    ? undefined
    : Array.isArray(value)
    ? value[0]
    : value;
};

export const toInteger = (value: ValueOfQuery = ""): number | undefined => {
  const number = parseInt(value.toString(), 10);
  return isNaN(number) ? undefined : number;
};

export const toFloatingNumber = (value: ValueOfQuery = ""): number | undefined => {
  if (Array.isArray(value)) return undefined;
  const number = parseFloat(value.toString());

  return isNaN(number) ? undefined : number;
};

export const toStringArray = (value: ValueOfQuery): string[] => {
  return isValueEmpty(value) ? [] : Array.isArray(value) ? value : [value];
};
