import { randomUUID } from 'crypto';

export interface NoteSchema {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(
    props: Omit<NoteSchema, 'createdAt' | 'updatedAt'>,
    id: string = randomUUID()
  ) {
    this.props = {
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._id = id;
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

  get content(): string {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
