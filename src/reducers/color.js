const color = (state = 0, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return action.color
    default:
      return state
  }
}

export default color
