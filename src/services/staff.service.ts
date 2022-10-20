import { StaffEntity } from "../entities/Staff";
import { StaffRepository } from "../repositories/staff.repository";

class StaffService {
  private repository: StaffRepository;
  constructor(repository: StaffRepository) {
    this.repository = repository;
  }
  public async getById(id: number) {
    return this.repository.findOne(id);
  }

  public async list(limit: string, offset: string) {
    if (limit || offset) {
      return this.repository.findWithPagination(limit, offset);
    }
    return this.repository.findAll([]);
  }

  public async add(data: StaffEntity) {
    return this.repository.create(data);
  }

  public async delete(id: number) {
    return this.repository.delete(id);
  }

  public async getByEmail(email: string) {
    return this.repository.findByEmail(email, []);
  }

  public async searchByName(text: string) {
    return this.repository.searchBy("name", text);
  }
}

export default StaffService;
