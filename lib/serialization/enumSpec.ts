// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { TypeSpec, createValidationErrorMessage } from "./typeSpec";
import { SpecPath } from "./specPath";

export interface EnumTypeSpec<T> extends TypeSpec<T, T> {
  /**
   * The name of the enum type that this EnumTypeSpec describes.
   */
  enumName: string;

  /**
   * The values that are allowed for this EnumTypeSpec.
   */
  allowedValues: T[];
}

/**
 * A type specification that describes how to validate and serialize an object.
 */
export function enumSpec<T>(enumName: string, allowedValues: T[]): EnumTypeSpec<T> {
  return {
    specType: `Enum`,

    enumName: enumName,

    allowedValues: allowedValues,

    serialize(propertyPath: SpecPath, value: T): T {
      const foundMatch: boolean = allowedValues.some((item) => {
        return item === value || (typeof item === "string" && typeof value === "string" && item.toLowerCase() === value.toLowerCase());
      });
      if (!foundMatch) {
        throw new Error(createValidationErrorMessage(propertyPath, value, `one of the enum allowed values: ${JSON.stringify(allowedValues)}`));
      }
      return value;
    },

    deserialize(propertyPath: SpecPath, value: T): T {
      const foundMatch: boolean = allowedValues.some((item) => {
        return item === value || (typeof item === "string" && typeof value === "string" && item.toLowerCase() === value.toLowerCase());
      });
      if (!foundMatch) {
        throw new Error(createValidationErrorMessage(propertyPath, value, `one of the enum allowed values: ${JSON.stringify(allowedValues)}`));
      }
      return value;
    }
  };
}