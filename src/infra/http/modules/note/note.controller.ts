import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase";
import { UpdateNoteUseCase } from "src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase";

import { CreateNoteBody } from "./dtos/createNoteBody";
import { UpdateNoteBody } from "./dtos/updateNoteBody";
import { NoteViewModel } from "./viewModel/noteViewModel";

import { ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorators/isPublic";
import { GetAllNotesUseCase } from "src/modules/note/useCases/getAllNotesUseCase/getAllNotesUseCase";
import { MailerServices } from "../../../services/mailer/mailer.service"; 
import { UserRepository } from "src/modules/user/repositories/UserRepository";

@ApiTags('note')
@Controller('notes')
export class NoteController {
    constructor(
        private createNoteUseCase: CreateNoteUseCase,
        private updateNoteUseCase: UpdateNoteUseCase,
        private getNoteUseCase: GetNoteUseCase,
        private getAllNotesUseCase: GetAllNotesUseCase,
        private deleteNoteUseCase: DeleteNoteUseCase,
        private mailerService: MailerServices,
        private user: UserRepository
    ) {}

    @Public()
    @Post()
    async createNote(@Body() body: CreateNoteBody) {
        const { title, description, userId } = body;

        const note = await this.createNoteUseCase.execute({
            title,
            description,
            userId
        })

        const user = await this.user.findById(userId);

        if (user) {
            await this.mailerService.sendMail(user)
        }

        return NoteViewModel.toHttp(note);
    }

    @Public()
    @Put('/:id')
    async updateNote(@Param('id') id: string, @Body() body: UpdateNoteBody) {
        const { title, description, userId } = body;
        
        const note = await this.updateNoteUseCase.execute({
            id,
            title,
            description,
            userId
        })

        if (note) return NoteViewModel.toHttp(note);
    }

    @Public()
    @Get('/:id')
    async getNote(@Param('id') id: string) {
        const note = await this.getNoteUseCase.execute({
            id
        })

        return NoteViewModel.toHttp(note);
    }

    @Public()
    @Get()
    async getAllNotes() {
        const notes = await this.getAllNotesUseCase.execute();
        return notes.map((note) => NoteViewModel.toHttp(note));
    }

    @Public()
    @Delete('/:id')
    async deleteNote(@Param('id') id: string) {
        await this.deleteNoteUseCase.execute({
            id
        })
    }
}