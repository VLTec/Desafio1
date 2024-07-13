import { Note } from './Note'; 

describe('Note', () => {
  it('should create a note with provided properties', () => {
    const note = new Note({
      title: 'Test Note',
      content: 'This is a test note content',
    });

    expect(note.title).toBe('Test Note');
    expect(note.content).toBe('This is a test note content');
    expect(note.createdAt).toBeInstanceOf(Date);
    expect(note.updatedAt).toBeInstanceOf(Date);
    expect(note.id).toBeDefined();
  });

  it('should update title and content', () => {
    const note = new Note({
      title: 'Test Note',
      content: 'This is a test note content',
    });

    note.title = 'Updated Test Note';
    note.content = 'Updated test note content';

    expect(note.title).toBe('Updated Test Note');
    expect(note.content).toBe('Updated test note content');
  });

  it('should have a generated id if not provided', () => {
    const note = new Note({
      title: 'Test Note',
      content: 'This is a test note content',
    });

    expect(note.id).toBeDefined();
  });

  it('should use the provided id if given', () => {
    const customId = '12345';
    const note = new Note(
      {
        title: 'Test Note',
        content: 'This is a test note content',
      },
      customId,
    );

    expect(note.id).toBe(customId);
  });
});
