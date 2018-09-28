import * as actions from './FlashMessageActions';
import reducer from './FlashMessageReducer';

describe('FlashMessage', () => {

  const testMessage = {
    type: "success",
    text: "hey"
  }

  const initialState = [
    { id: 1, type: "success", text: "hey" },
    { id: 2, type: "success", text: "you" }
  ];

  it('should create action to add flash message', () => {
    expect(actions.addFlashMessage(testMessage)).toEqual({
      type: actions.ADD_FLASH_MESSAGE,
      message: testMessage
    });
  });

  it('should create action to delete flash message', () => {
    expect(actions.deleteFlashMessage(5)).toEqual({
      type: actions.DELETE_FLASH_MESSAGE,
      id: 5
    });
  });

  it('should add flash message', () => {
    expect(reducer(undefined, actions.addFlashMessage(testMessage))).toEqual([
      expect.objectContaining({
        type: testMessage.type,
        text: testMessage.text
      })
    ]);
  });

  it('should delete flash message by id', () => {
    expect(reducer(initialState, actions.deleteFlashMessage(2))).toEqual([
      { id: 1, type: "success", text: "hey"}
    ]);
  });

  it('should return state if deleting with id not found', () => {
    expect(reducer(initialState, actions.deleteFlashMessage(3))).toEqual(initialState);
  });

  it('should return state with unexpected action', () => {
    expect(reducer(initialState, { type: "unexpected" })).toEqual(initialState);
  });

});