import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetNotesUseCase } from 'src/modules/note/useCases/getNotesUseCase/getNotesUseCase';
import { UpdateNoteUseCase } from 'src/modules/note/useCases/updateNoteUseCase/updateNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/createNoteBody';
import { UpdateNoteBody } from './dtos/updateNoteBody';
import { NoteViewModel } from './viewModel/noteViewModel';

@ApiTags('note')
@Controller('notes')
export class NoteController {
    constructor(
        private createNoteUseCase: CreateNoteUseCase,
        private getNoteUseCase: GetNoteUseCase,
        private getNotesUseCase: GetNotesUseCase,
        private updateNoteUseCase: UpdateNoteUseCase,
        private deleteNoteUseCase: DeleteNoteUseCase,
    ) {}
    
    @Post()
    async createNote(@Body() body: CreateNoteBody, @Request() request: AuthenticatedRequestModel) {
        const { id, email } = request.user

        const note = await this.createNoteUseCase.execute({
            user: {
                id,
                email
            },
            title: body.title,
            description: body.description
        })

        return NoteViewModel.toHttp(note)
    }

    @Get()
    async getNotes(@Request() request: AuthenticatedRequestModel) {
        const { id } = request.user

        const notes = await this.getNotesUseCase.execute({
            userId: id
        })
        
        return notes.map(note => {
            return NoteViewModel.toHttp(note)
        })
    }

    @Get(":id")
    async getNote(@Param('id') noteId: string, @Request() request: AuthenticatedRequestModel) {
        const { id } = request.user

        const note = await this.getNoteUseCase.execute({
            noteId,
            userId: id
        })

        return NoteViewModel.toHttp(note)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(":id")
    async updateNote(@Param('id') noteId: string, @Body() body: UpdateNoteBody, @Request() request: AuthenticatedRequestModel) {
        const { id } = request.user

        return this.updateNoteUseCase.execute({
            userId: id,
            noteId: noteId,
            title: body.title,
            description: body.description
        })
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    async deleteNote(@Param('id') noteId: string, @Request() request: AuthenticatedRequestModel) {
        const { id } = request.user
        
        return this.deleteNoteUseCase.execute({
            noteId,
            userId: id
        })
    }
}
