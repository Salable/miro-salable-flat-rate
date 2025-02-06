'use server'
import {Result} from "../../fetch/licenses/check";
import initMiroAPI from "../../utils/initMiroAPI";

export const isBoardOwner = async (boardId: string): Promise<Result<boolean>> => {
  try {
    const {userId, miro} = initMiroAPI()
    const api = miro.as(userId)
    const board = await api.getBoard(boardId)
    return {
      data: board.owner?.id === userId,
      error: null
    }
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to verify board owner'
    }
  }
}