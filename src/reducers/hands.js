const hands = (state = [{}, {}], action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return Object.assign([{}, {}], action.hands)
    default:
      return state
  }
}

export default hands
