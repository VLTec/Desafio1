import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface NoteSchema {
  userId: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(
    props: Replace<NoteSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      description: props.description || null,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
