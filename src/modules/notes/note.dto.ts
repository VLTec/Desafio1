export class CreateNoteDto {
  readonly title: string;
  readonly description?: string;
  id: string;
 
}

export class UpdateNoteDto {
  readonly title?: string;
  readonly description?: string;
}
