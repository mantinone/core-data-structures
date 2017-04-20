'use strict'

export default class DoubleNode {
  constructor( data, next = null, prev = null){
    this.data = data
    this.next = next
    this.prev = prev
  }
}
