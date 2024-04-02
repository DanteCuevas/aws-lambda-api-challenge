import { ObjectId } from 'mongodb'

const isValidObjectId = (str: string) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const objectId = new ObjectId(str)
    return true;
  } catch (error) {
    return false;
  }
}

export {
  isValidObjectId
}
