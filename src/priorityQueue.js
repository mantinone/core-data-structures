'use strict'

import PriorityNode from '../src/priorityNode'

export default class PriorityQueue {
  constructor() {
    this.front = null
    this.back = null
    this.size = 0
  }

  enqueue( data, priority ){
    let newNode = new PriorityNode( { data, priority } )
    if( this.isEmpty()  ){
      this.front = newNode
      this.back = newNode
    } else {
      let { beforeNode, afterNode } = this.findPriority( priority )
      if( beforeNode === null ){
        this.back = newNode
      } else {
        beforeNode.prev = newNode
      }
      if( afterNode === null){
        this.front = newNode
      } else {
        afterNode.next = newNode
      }
      newNode.next = beforeNode
      newNode.prev = afterNode
    }
    this.size++
  }

  findPriority( priority ) {
    let beforeNode = this.front
    let afterNode = null
    while( beforeNode ){
      if( beforeNode.getPriority() < priority ){
        return { beforeNode, afterNode }
      }
      afterNode = beforeNode
      beforeNode = beforeNode.next
    }
    return { beforeNode, afterNode }
  }

  dequeue() {
    if( this.isEmpty() ){
      return null
    }
    let result = this.front.getData()

    this.front = this.front.next
    if( this.front != null ) {
      this.front.prev = null
    }

    this.size--
    return result
  }

  getFront() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.front
    }
  }

  getBack() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.back
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
