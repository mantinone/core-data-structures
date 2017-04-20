'use strict'

import Node from '../src/Node'

export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  insert( data ){
    let newNode = new Node( data )
    if( this.isEmpty() ){
      this.head = newNode
    } else {
      this.tail.next = newNode
    }
    this.tail = newNode
    this.size++
  }

  insertFirst( data ){
    let newNode = new Node( data )
    newNode.next = this.head
    if( this.isEmpty() ){
      this.tail = newNode
    }
    this.head = newNode
    this.size++
  }

  find( data ) {
    let currentNode = this.head
    while( currentNode ){
      if( data === currentNode.data ){
        return currentNode
      }
      currentNode = currentNode.next
    }
    return -1
  }

  findBeforeLast( ) { //second to last node
    let currentNode = this.head
    while( currentNode.next != this.tail ){
      currentNode = currentNode.next
    }
    return currentNode
  }

  contains( data ){
    return this.find( data ) !== -1
  }

  findBefore( data ){
    let currentNode = this.head
    if ( currentNode === this.tail ){
      if( currentNode.data === data ){
        return null
      } else {
        return -1
      }
    }
    while( currentNode.next ){
      if( data === currentNode.next.data ){
        return currentNode
      }
      currentNode = currentNode.next
    }
    return -1
  }

  insertBefore( data, before ){
    let newNode = new Node( data )
    let foundNode = this.findBefore( before )
    if( foundNode === -1 ) {
      return -1
    }
    if( foundNode === null ){
      this.head = newNode
      newNode.next = this.tail
    } else {
      newNode.next = foundNode.next
      foundNode.next = newNode
    }
  }

  insertAfter( after, data ){
    let newNode = new Node( data )
    let foundNode = this.find( after )
    if( foundNode === -1 ){
      return -1
    }
    if( foundNode.next === null ){
      this.tail = newNode
    }
    newNode.next = foundNode.next
    foundNode.next = newNode
  }

  getHeadNode() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.head
    }
  }

  getTailNode() {
    if( this.isEmpty() ){
      return null
    } else {
      return this.tail
    }
  }

  remove(){
    if( this.isEmpty() ){
      return -1
    } else if( this.size === 1 ){
      this.clear()
      return
    }
    let beforeLast = this.findBeforeLast()
    this.tail = beforeLast
    beforeLast.next = null
    this.size--
  }

  removeFirst(){
    if( this.isEmpty() ){
      return -1
    }

    this.head = this.head.next
    if( this.head === null ){
      this.tail = null
    }
    this.size--
  }

  clear(){
    this.head = this.tail = null
    this.size = 0
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