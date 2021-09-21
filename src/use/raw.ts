import { ContextStatePageContent } from '@/types/context'

export const useRaw = () => {
  const convert = (page: ContextStatePageContent) => {
    let final: string = ''
    let _italic = false
    let _bold = false

    for (var i = 0; i < page.raw.length; i++) {
      const letter = page.raw.charAt(i)

      if (letter === '*' && !_italic) {
        _italic = true
        final += '<span class="italic">'
      } else if (letter === '*' && _italic) {
        final += '</span>'
        _italic = false
      } else if (letter === '&' && !_bold) {
        _bold = true
        final += '<span class="font-bold">'
      } else if (letter === '&' && _bold) {
        final += '</span>'
        _bold = false
      } else {
        final += letter
      }
    }

    console.log(final)

    return final
  }

  return { convert }
}
