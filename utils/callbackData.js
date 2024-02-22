const {v4:uuid}=require('uuid')
class CallbackData {
  #name=uuid();
  #data;
  constructor(data){
    this.#data = data
  }
}
module.exports = CallbackData