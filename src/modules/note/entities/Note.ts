import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface NoteSchema {
    title: string;
    userId: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Note {
    private props: NoteSchema;
    private _id: string;

    constructor(
        props: Replace<NoteSchema, { createdAt?: Date; updatedAt?: Date }>,
        id?: string
    ) {
        this.props = {
            ...props,
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

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }
}