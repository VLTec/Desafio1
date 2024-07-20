import { Note } from "src/modules/note/entities/Note";
import { NoteRepository } from "src/modules/note/repositories/NoteRepository";
import { Injectable } from "@nestjs/common";
import { PrismaNoteMapper } from "../../mappers/note/PrismaNoteMapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
    constructor(
        private prisma: PrismaService
    ) {}

    async create(note: Note): Promise<void> {
        const noteRaw = PrismaNoteMapper.toPrisma(note);

        await this.prisma.note.create({
            data: noteRaw
        })
    }

    async update(note: Note): Promise<void> {
        const data = PrismaNoteMapper.toPrisma(note);

        await this.prisma.note.update({
            where: {
                id: note.id
            },

            data
        });
    }

    async findById(id: string): Promise<Note | null> {
        const note = await this.prisma.note.findUnique({
            where: {
                id
            }
        });

        if (!note) return null
        
        return PrismaNoteMapper.toDomain(note);
    }

    async findAll(userId: string): Promise<Note[] | null> {
        const notes = await this.prisma.note.findMany({ 
            orderBy: { updatedAt: 'asc' },
            where: {
                userId
            }
            
        });

        if (!notes) return null

        return (notes.map((note) => PrismaNoteMapper.toDomain(note)));
    }

    async delete(id: string): Promise<void> {
        await this.prisma.note.delete({
            where: {
                id
            }
        });
    }
}