import { ContextState } from '@/types/context'
import { EditorState } from './editor'

export interface ProjectState {
  name: string
  nameRaw: string
  version: string
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<ContextState>
  pageLoaded: number
}

export interface ProjectObject {
  project: ProjectState
  editor: EditorState
}
