import { ProjectObject } from '@/types/project'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { useContextStore } from '@/store/context'

export const useLocalStorage = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const toast = useToast()
  const env = useEnv()
  const { t } = i18n.global

  const set = (obj: ProjectObject, name: string) => {
    localStorage.setItem(env.projectLocalStorage(), JSON.stringify(obj))
  }

  const get = (name: string) => {
    return JSON.parse((localStorage as any).getItem(name))
  }

  const setProject = (obj: ProjectObject) => {
    set(obj, env.projectLocalStorage())
  }

  const getProject = (): ProjectObject => {
    const _ = get(env.projectLocalStorage())

    // <= v0.3.10
    if (_.project?.pages[0]?.entity) {
      _.project?.pages.forEach((target: any) => {
        target['entities'] = target['entity']
        delete target['entity']
      })
    }

    return _
  }

  const onSaveProject = () => {
    if (PROJECT.name === env.projectEmpty()) return

    setProject({
      project: PROJECT.$state,
      editor: EDITOR.$state,
      logger: LOGGER.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
    })

    toast.success(t('toast.project.save'))
  }

  const onAutoSave = (time: number) => {
    setInterval(() => {
      if (PROJECT.name === env.projectEmpty()) return

      setProject({
        project: PROJECT.$state,
        editor: EDITOR.$state,
        logger: LOGGER.$state,
        pdf: {
          styles: PDF.styles,
          fonts: [],
          normalize: {},
        },
      })
    }, parseInt(`${time}000`))
  }

  const onLoadProject = async () => {
    const context = getProject()

    if (!context) return

    PROJECT.load(context.project)

    await nextTick

    CONTEXT.load(PROJECT.pages[0])

    await nextTick

    LOGGER.load(context.logger.content)

    PDF.load(context.pdf)

    toast.success(t('toast.project.load'))
  }

  return {
    set,
    get,
    setProject,
    getProject,
    onSaveProject,
    onLoadProject,
    onAutoSave,
  }
}
