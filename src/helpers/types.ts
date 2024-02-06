import { AnyType } from 'sn-types-general';

export function ConvertType<T>(value: AnyType): T {
    return value as unknown as T;
}
