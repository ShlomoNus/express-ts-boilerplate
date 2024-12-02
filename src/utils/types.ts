import { AnyType } from 'shen-types';

export function convertType<T>(value: AnyType): T {
    return value as unknown as T;
}

export function convertToError(error: unknown) {
    return convertType<Error>(error);
}
