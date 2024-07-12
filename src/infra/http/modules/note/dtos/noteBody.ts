import { ApiProperty } from '@nestjs/swagger';

export class NoteBody {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  note: string;
}

export class NoteUpdateBody {
  id: number;
  title: string;
  description?: string;
  note: string;
}
