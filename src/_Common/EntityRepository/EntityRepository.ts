import { ClientSession, ClientSessionOptions, Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import Mongoose from 'mongoose';

interface IEntityMethodOptions {
  session?: Mongoose.ClientSession | null,
}

export abstract class EntityRepository<Doc extends Document, Ent> {
  protected constructor(protected readonly entityModel: Model<Doc>) {}

  async startSession(options?: ClientSessionOptions): Promise<ClientSession> {
    const {} = options || {};
    return this.entityModel.startSession();
  }

  async findById(_id: any): Promise<Doc | undefined> {
    return this.entityModel.findById(_id);
  }
  async findOne(query: FilterQuery<Doc>): Promise<Doc | undefined> {
    return this.entityModel.findOne(query);
  }
  async findMany(query: FilterQuery<Doc>): Promise<Doc[] | []> {
    return this.entityModel.find(query);
  }
  async create(createEntityData: unknown, options?: IEntityMethodOptions): Promise<Doc> {
    const { session=null } = options || {};
    const newEntity = new this.entityModel(createEntityData);
    return newEntity.save({session});
  }
  async remove(query: FilterQuery<Doc>, options?: IEntityMethodOptions): Promise<Doc | undefined> {
    const { session=null } = options || {};
    return this.entityModel.findOneAndRemove(query).session(session);
  }
  async update(query: FilterQuery<Doc>, payload: UpdateQuery<Partial<Ent>>, options?: IEntityMethodOptions): Promise<Doc | undefined> {
    const { session=null } = options || {};
    return this.entityModel.findOneAndUpdate(query, payload).session(session);
  }
}