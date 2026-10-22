// Given and object and field name, return the value for the field.

export function getField<T, K extends keyof T>(obj: T, fieldName: K): T[K] {
  return obj[fieldName];
}

// This is for used in typing string keys.  It's used to get the field value
// (see getField() above) from an object.

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];
