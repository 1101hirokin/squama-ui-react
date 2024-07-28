import clsx from "clsx";

/**
 * Build a class name string from a list of class names.
 */
type ClassValue =
    | ClassArray
    | ClassRecord
    | string
    | number
    | null
    | boolean
    | undefined;
type ClassRecord = Record<string, any>;
type ClassArray = ClassValue[];
export function buildClassName(...classes: ClassValue[]): string {
    return clsx(...classes);
}
