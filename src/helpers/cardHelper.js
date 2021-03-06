const LANGUAGE_URL = '/Languages/Low-res/'
const IDE_URL = '/IDEs/Low-res/'
const DREAM_JOB_URL = '/DreamJob/'

const REA_RED = '#e4002b'
const RCA_BLUE = '#2b6ed2'
const SPACELY_PURPLE = 'rgb(112, 56, 186)'
const FLAT_MATES_BLUE = '#2f3a4a'

export const getTheme = (theme) => {
  if (!theme) return { main: REA_RED }

  switch (theme.toLowerCase()) {
    case 'residential':
      return { main: REA_RED, hue: '0' }
    case 'real commercial':
      return { main: RCA_BLUE, hue: '210' }
    case 'spacely':
      return { main: SPACELY_PURPLE, hue: '265' }
    case 'flatmates':
      return { main: FLAT_MATES_BLUE, hue: '160' }
  }
}

export const getLanguage = (lang) => `${LANGUAGE_URL}${getLanguageIcon(lang)}`

const getLanguageIcon = (lang) => {
  if (!lang) return ''

  switch (lang.toLowerCase()) {
    case 'javascript':
      return 'js.png'
    case 'scala':
      return 'scala.png'
    case 'java':
      return 'java.png'
    case 'ruby':
      return 'ruby.png'
    case 'other':
      return 'other.png'
  }
}

export const getDreamJob = (dreamJob) => {
  const stats = getDreamJobStats(dreamJob)
  return { ...stats, icon: `${DREAM_JOB_URL}target.svg` }
}

const getDreamJobStats = (dreamJob) => {
  if (!dreamJob) return { icon: '', points: '0', type: 'neut' }
  switch (dreamJob.toLowerCase()) {
    case '$ lead':
      return { points: '3', type: 'pos', text: 'Lead' }
    case '$$ em':
      return { points: '5', type: 'pos', text: 'Eng. Manager' }
    case '$$$ cto':
      return { points: '8', type: 'pos', text: 'C.T.O' }
    case '$$$$ ceo':
      return { points: '5', type: 'pos', text: 'C.E.O' }
    case '$$$$$ prime minister':
      return { points: '5', type: 'neg', text: 'Prime Minister' }
  }
}

export const getIDE = (ide) => {
  const stats = getIDEStats(ide)
  return { ...stats, icon: `${IDE_URL}${stats.icon}` }
}

const getIDEStats = (ide) => {
  if (!ide) return { icon: '', points: '0', type: 'neut' }

  switch (ide.toLowerCase()) {
    case 'vs code':
      return {
        icon: 'vscode.png',
        points: '2',
        type: 'pos',
        text: 'Visual Studio Code',
      }
    case 'jetbrains':
      return {
        icon: 'jetbrains.png',
        points: '2',
        type: 'neg',
        text: 'JetBrains',
      }
    case 'notepad++':
      return {
        icon: 'notepad++.png',
        points: '4',
        type: 'neg',
        text: 'Notepad++',
      }
    case 'cli':
      return {
        icon: 'vim.png',
        points: '4',
        type: 'pos',
        text: 'Vim/Emacs/CLI',
      }
    case 'other':
      return { icon: 'other.png', points: '0', type: 'neut', text: 'Other' }
  }
}

export const getIdent = (indent) => getIndentStats(indent)

const getIndentStats = (indent) => {
  if (!indent) return { icon: '?', points: '0', type: 'neut' }

  switch (indent.toLowerCase()) {
    case 'tab':
      return { points: '4', type: 'neg', icon: '|____|' }
    case '1 space':
      return { points: '1', type: 'neg', icon: '|_|' }
    case '2 spaces':
      return { points: '2', type: 'pos', icon: '|_|_|' }
    case '3 spaces':
      return { points: '3', type: 'neg', icon: '|_|_|_|' }
    case '4 spaces (tab)':
      return { points: '0', type: 'neut', icon: '|_|_|_|_|' }
  }
}
