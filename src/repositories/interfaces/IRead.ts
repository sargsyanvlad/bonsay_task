export interface IRead<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  findWithPagination(limit: string, offset: string): Promise<T[]>;
}
