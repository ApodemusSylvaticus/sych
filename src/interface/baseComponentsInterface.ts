export interface IsActive {
  isActive: boolean;
}

export type Nullable<T> = T | null;

export function assertNever(x: never, message: string = 'Unhandled case'): never {
  throw new Error(`${message}: ${JSON.stringify(x)}`);
}
