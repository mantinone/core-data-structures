'use strict'

export default class PriorityNode {
  constructor( info, next = null, prev = null){
    this.info = info
    this.next = next
    this.prev = prev
  }

  getData() {
    return this.info.data
  }

  getPriority() {
    return this.info.priority
  }

  setData( data ) {
    this.info.data = data
  }

  setPriority( priority ) {
    this.info.priority = priority
  }
}
