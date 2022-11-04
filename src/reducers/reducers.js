import { CREATE_BLOCK } from "../Constants/constants";

const initialState = {
  blocks: [
    {
      blockNo: 1,
      nounce: 200,
      prev: "0000ushsncvj",
      hash: "0000absdkfjo",
    },
  ],
};

export const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BLOCK:
      return { ...state, blocks: [...state.blocks, action.payload] };
    default:
      return state;
  }
};
