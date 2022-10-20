import { IWrite, IRead } from "./interfaces";
import { Sequelize, Op } from "sequelize";

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly model: any;
  public readonly sequelize: Sequelize;
  public readonly Op: typeof Op;

  constructor(model: any, sequelize: Sequelize) {
    this.model = model;
    this.Op = Op;
    this.sequelize = sequelize;
  }

  async create(item: T): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(id: number, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: number): Promise<T> {
    throw new Error("Method not implemented.");
  }

  findWithPagination(limit: string, offset: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}
