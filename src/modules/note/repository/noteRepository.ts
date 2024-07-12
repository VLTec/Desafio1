export abstract class NoteRepository {
  //   abstract update(user): Promise<void>;
  abstract create(note): Promise<void>;
  //   abstract findById(id: number): Promise<void>;
  abstract findAll(user_id: string): Promise<void>;
  //   abstract delete(id: number): Promise<void>;
}
