import { Note } from '../entities/Note'

export interface NoteRepository {
  getAll: () => Promise<Note[]>
  create: (note: Note) => Promise<Note>
  update: (note: Note) => Promise<Note>
  delete: (note: Note) => Promise<void>
  getById: (id: string) => Promise<Note | null>
}
