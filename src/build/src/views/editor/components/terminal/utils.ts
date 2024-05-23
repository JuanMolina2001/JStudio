
export const keyEventHandler = ( e: KeyboardEvent) => {
  
  if (e.type === 'keydown') {
  if (e.key === 'Backspace') {
   
     

    return {
     content: '\b \b',
     bool: false
    }
  }
  if (e.key === 'Tab') {
    e.preventDefault()
    return {
      content:  '    ',
      bool: false
    }
  }
  if (e.ctrlKey && e.key === 'c') {
    return {
      content: '^C',
      bool: true
    }
  }
  }

  if (e.key === 'CapsLock' || e.key === 'Tab' || e.key === 'Escape' || e.key === 'Delete' || e.key === 'Insert' || e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'F1' || e.key === 'F2' || e.key === 'F3' || e.key === 'F4' || e.key === 'F5' || e.key === 'F6' || e.key === 'F7' || e.key === 'F8' || e.key === 'F9' || e.key === 'F10' || e.key === 'F11' || e.key === 'F12' || e.key === 'F13' || e.key === 'F14' || e.key === 'F15' || e.key === 'F16' || e.key === 'F17' || e.key === 'F18' || e.key === 'F19' || e.key === 'F20' || e.key === 'F21' || e.key === 'F22' || e.key === 'F23' || e.key === 'F24' || e.key === 'F25' || e.key === 'F26' || e.key === 'F27' || e.key === 'F28' || e.key === 'F29' || e.key === 'F30' || e.key === 'F31' || e.key === 'F32' || e.key === 'F33' || e.key === 'F34' || e.key === 'F35' || e.key === 'Dead' || e.key === 'PrintScreen' || e.key === 'ScrollLock' || e.key === 'Pause' || e.key === 'BrowserBack' || e.key === 'BrowserForward' || e.key === 'BrowserRefresh' || e.key === 'BrowserStop' || e.key === 'BrowserSearch' || e.key === 'BrowserFavorites' || e.key === 'BrowserHome' || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
    return false
  }

return {
  content: '',
  bool: false
}
}
