'use strict'

import DoubleNode from '../src/doubleNode'

export default class Queue {
  constructor() {
    this.front = null
    this.back = null
    this.size = 0
  }

  enqueue( data ) {
    let newNode = new DoubleNode( data )
    newNode.next = this.back
    if( this.isEmpty() ){
      this.front = newNode
    } else {
      this.back.prev = newNode
    }
    this.back = newNode
    this.size++
  }

  dequeue() {
    if( this.isEmpty() ){
      return null
    }
    let result = this.front.data

    this.front = this.front.prev
    if( this.front != null ) {
      this.front.next = null
    }

    this.size--
    return result
  }

  getFront() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.front.data
    }
  }

  getBack() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.back.data
    }
  }

  isEmpty() {
    if ( this.length() > 0) {
      return false
    } else {
      return true
    }
  }

  length() {
    return this.size
  }
}
