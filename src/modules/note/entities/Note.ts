import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

export interface NoteSchema {
  title: string;
  userId: string;
  description: string;
  createdAt: Date;
}

export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(props: Replace<NoteSchema, { createdAt?: Date; }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = randomUUID() ;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
