import { NoteRepository } from '../note/repositories/NoteRepository';
import { NoteRepositoryInMemory } from '../note/repositories/NoteRepositoryInMemory';
import { UserRepository } from '../user/repositories/UserRepository';
import { UserRepositoryInMemory } from '../user/repositories/UserRepositoryInMemory';

class RandomRepository {
  public readonly note: NoteRepository;
  public readonly user: UserRepository;

  constructor(noteRepository: NoteRepository, userRepository: UserRepository) {
    this.note = noteRepository;
    this.user = userRepository;
  }
}

export const randomRepository = new RandomRepository(
    new NoteRepositoryInMemory(),
    new UserRepositoryInMemory()
);
