export class NoteBody {
  user_id: string;
  title: string;
  description?: string;
  note: string;
}

export class NoteUpdateBody {
  id: number;
  title: string;
  description?: string;
  note: string;
}
