import { AnyType } from 'types';

export function ConvertType<T>(value: AnyType): T {
    return value as unknown as T;
}
