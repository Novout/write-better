import { ContextState } from '@/types/context'
import { EditorState } from './editor'
import { LoggerState } from './logger'
import { PDFState } from './pdf'

export interface ProjectState {
  name: string
  nameRaw: string
  version: string
  creator: string
  subject: string
  type: string
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<ContextState>
  pageLoaded: number
}

export interface ProjectObject {
  project: ProjectState
  editor: EditorState
  logger: LoggerState
  pdf: PDFState
}
