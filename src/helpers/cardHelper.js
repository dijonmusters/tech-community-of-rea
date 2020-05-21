const LANGUAGE_URL = '/static/Languages/Low-res/'
const IDE_URL = '/static/IDEs/Low-res/'
const DREAM_JOB_URL = '/static/DreamJob/'

export const getDreamJob = dreamJob => {
  const stats = getDreamJobStats(dreamJob)
  return { ...stats, icon: `${DREAM_JOB_URL}${stats.icon}` }
}

const getDreamJobStats = dreamJob => {
  if (!dreamJob) return ''

  switch (dreamJob.toLowerCase()) {
    case 'tech lead': return { icon: 'coin.svg', points: '3', type: 'pos' }
    case 'engineering manager': return { icon: 'hand.svg', points: '5', type: 'pos' }
    case 'cto': return { icon: 'card.svg', points: '8', type: 'pos' }
    case 'ceo': return { icon: 'small_stack.svg', points: '5', type: 'pos' }
    case 'prime minister': return { type: 'fat_stack.svg', points: '5', type: 'neg' }
  }
}

export const getIDE = ide => {
  const stats = getIDEStats(ide)
  return { ...stats, icon: `${IDE_URL}${stats.icon}` }
}

const getIDEStats = ide => {
  if (!ide) return ''

  switch (ide.toLowerCase()) {
    case 'vscode': return { icon: 'vscode.png', points: '2', type: 'pos' }
    case 'jetbrains': return { icon: 'jetbrains.png', points: '2', type: 'neg' }
    case 'notepad++': return { icon: 'notepad++.png', points: '4', type: 'neg' }
    case 'vim': return { icon: 'vim.png', points: '4', type: 'pos' }
    case 'other': return { icon: '', points: '0', type: 'neut' }
  }
}

export const getIdent = indent => getIndentStats(indent)

const getIndentStats = indent => {
  if (!indent) return ''

  switch (indent.toLowerCase()) {
    case '1 tab': return { points: '4', type: 'neg', icon: '|____|' }
    case '1 space': return { points: '1', type: 'neg', icon: '|_|' }
    case '2 spaces': return { points: '2', type: 'pos', icon: '|_|_|' }
    case '3 spaces': return { points: '3', type: 'neg', icon: '|_|_|_|' }
    case '4 spaces': return { points: '0', type: 'neut', icon: '|_|_|_|_|' }
  }
}