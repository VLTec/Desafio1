import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface NoteSchema {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(props: Replace<NoteSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      description: props.description || null,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
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

  set description(description: string) {
    this.props.description = description;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(createAt: Date) {
    this.props.createdAt = createAt;
  }
}
