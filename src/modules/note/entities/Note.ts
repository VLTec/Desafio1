import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface NoteSchema {
  title: string;
  description: string | null; 
  createdAt: Date;
  updatedAt: Date;
  IdUser: string;
}

export class Note {
  public props: NoteSchema;
  public _id: string;

  constructor(
    props: Replace<NoteSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      description: props.description ?? '', 
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get IdUser(): string {
    return this.props.IdUser; 
  }

  set IdUser(IdUser: string) {
    this.props.IdUser = IdUser; 
  }
}
