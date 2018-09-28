import * as actions from './FlashMessageActions';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const FlashMessage = (state = [], action = {}) => {
  switch(action.type) {
    case actions.ADD_FLASH_MESSAGE: {
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    }
    case actions.DELETE_FLASH_MESSAGE: {
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;
    }
    default: return state;
  }
}

export default FlashMessage;