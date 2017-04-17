'use strict'

import Node from '../src/node'

export default class Stack {
  constructor() {
    this.top = null
    this.size = 0
  }

  push( data ) {
    let newNode = new Node( data, this.top )
    this.top = newNode
    this.size++
  }

  pop() {
    let result = this.top.data
    this.top = this.top.next
    this.size--
    return result
  }

  peek() {
    if( this.isEmpty() ) {
      return null
    } else {
      return this.top.data
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
