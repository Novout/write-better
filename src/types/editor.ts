export type BetterWriteThemes =
  | 'BetterWrite - Light'
  | 'BetterWrite - Dark'
  | 'BetterWrite - Rise'
  | 'BetterWrite - Ascend'
  | 'BetterWrite - Harmonic'

export interface EditorState {
  styles: EditorStateStyles
  configuration: EditorStateConfiguration
  actives: EditorStateActives
}

export interface EditorStateActivesEntity {
  index: number
}

export interface EditorStateActives {
  entity: EditorStateActivesEntity
}

export interface EditorStateConfigurationEntity {
  updateTime: boolean
}

export interface EditorStateConfigurationCommands {
  prefix: string
  paragraph: {
    prefix: string
  }
  headingTwo: {
    prefix: string
  }
  headingThree: {
    prefix: string
  }
  pageBreak: {
    prefix: string
  }
  lineBreak: {
    prefix: string
  }
  image: {
    prefix: string
  }
  dialogue: {
    prefix: string
    value: string
  }
}

export interface EditorStateConfiguration {
  theme: BetterWriteThemes
  lang?: boolean
  draggable: boolean
  bars: boolean
  auto: number | 'never'
  entity: EditorStateConfigurationEntity
  commands: EditorStateConfigurationCommands
}

export interface EditorStateStyles {
  input: EditorStateInput
  show: EditorStateShow
}
export interface EditorStateInput {
  fontFamily: string
  fontSize: string
  fontColor: string
}

export interface EditorStateShow {
  entity: EditorStateShowEntity
  fontFamily: string
  fontColor: string
  paragraph: EditorStateShowParagraph
  heading: EditorStateShowHeading
}

export interface EditorStateShowEntity {
  shadow: boolean
}

export interface EditorStateShowParagraph {
  indent: string
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeading {
  one: EditorStateShowHeadingOne
  two: EditorStateShowHeadingTwo
  three: EditorStateShowHeadingThree
}

export interface EditorStateShowHeadingOne {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeadingTwo {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeadingThree {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}
