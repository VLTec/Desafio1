import { CreateNoteUseCase } from './createNoteUseCase';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { NoteException } from '../../exception/NoteException';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { EmailService } from 'src/modules/email/EmailService';
import { MailtrapEmailService } from 'src/modules/email/emailTrapEmailService';

let createNoteUseCase: CreateNoteUseCase;
let userRepository: UserRepositoryInMemory;
let noteRepository: NoteRepositoryInMemory;
let emailService: EmailService

describe('Create Note', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    noteRepository = new NoteRepositoryInMemory();
    emailService = new MailtrapEmailService()
    createNoteUseCase = new CreateNoteUseCase(noteRepository, userRepository, emailService);

    userRepository.create(
      makeUser({
        id: '58be049a-33f3-4920-aee5-e38655eceafc',
        email: 'email@email.com',
        name: 'Vitor',
        password: '123123',
      }),
    );
  });

  it('Create a note in the database', async () => {
    expect(noteRepository.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Teste',
      description: 'Teste',
      userId: '58be049a-33f3-4920-aee5-e38655eceafc',
    });

    expect(noteRepository.notes).toEqual([note]);
  });

  it('Create note with invalid title', async () => {
    expect(
      async () => await createNoteUseCase.execute({
        title: '',
        description: 'Teste',
        userId: '58be049a-33f3-4920-aee5-e38655eceafc',
      }),
    ).rejects.toThrowError(NoteException);
  });

  it('Create note with invalid user id', async () => {
    expect(
      async () => await createNoteUseCase.execute({
        title: 'Teste',
        description: 'Teste',
        userId: 'ID Inválido',
      }),
    ).rejects.toThrowError(NoteException);
  });
});
