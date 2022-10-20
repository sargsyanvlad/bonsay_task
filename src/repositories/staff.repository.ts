import { BaseRepository } from "./base.repository";
import { StaffEntity } from "../entities/Staff";

export class StaffRepository extends BaseRepository<StaffEntity> {
  count(): Promise<number> {
    return this.model.count({});
  }

  async create(item: any): Promise<StaffEntity> {
    return this.model.create(item);
  }

  update(id: number, data: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<boolean> {
    return this.model.destroy({
      where: { id },
    });
  }

  findAll(exclude: Array<string> | [] = ["password"]): Promise<StaffEntity[]> {
    return this.model.findAll({
      attributes: {
        exclude,
      },
    });
  }

  findOne(
    id: number,
    exclude: Array<string> | [] = ["password"]
  ): Promise<StaffEntity> {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude,
      },
    });
  }

  findByEmail(
    email: string,
    exclude: Array<string> | [] = ["password"]
  ): Promise<StaffEntity> {
    return this.model.findOne({
      where: { email },
      attributes: {
        exclude,
      },
    });
  }

  searchBy(field = "name", text: string): Promise<StaffEntity[]> {
    const where = {};
    where[field] = { [this.Op.iLike]: `%${text}%` };
    return this.model.findAll({
      where,
      attributes: {
        exclude: ["password"],
      },
    });
  }

  findWithPagination(
    limit = "10",
    offset = "0",
    exclude: Array<string> | [] = ["password"]
  ): Promise<StaffEntity[]> {
    return this.model.findAll({
      limit,
      offset,
      attributes: {
        exclude,
      },
    });
  }
}
