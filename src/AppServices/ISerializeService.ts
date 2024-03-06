export interface ISerializeService<T> {
    serializeForUpdate(obj:T): any
}