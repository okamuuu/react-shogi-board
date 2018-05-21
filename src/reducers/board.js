const board = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return Object.assign([], action.board)
    default:
      return state
  }
}

export default board
