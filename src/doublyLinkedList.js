'use strict'

import DoubleNode from '../src/doubleNode'

export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  insert( data ){
    let newNode = new DoubleNode( data )
    newNode.prev = this.tail
    if( this.isEmpty() ){
      this.head = newNode
    } else {
      this.tail.next = newNode
    }
    this.tail = newNode
    this.size++
  }

  insertFirst( data ){
    let newNode = new DoubleNode( data )
    newNode.next = this.head
    if( this.isEmpty() ){
      this.tail = newNode
    } else {
      this.head.prev = newNode
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

  contains( data ){
    return this.find( data ) !== -1
  }

  // insertBefore( data, before ){
  //   let newNode = new DoubleNode( data )
  //   let foundNode = this.find( before )
  //   if( foundNode === -1 ) {
  //     return -1
  //   }
  //   if( foundNode === null ){
  //     this.head = newNode
  //     newNode.next = this.tail
  //   } else {
  //     newNode.next = foundNode.next
  //     foundNode.next = newNode
  //   }
  // }

  insertAfter( after, data ){
    let newNode = new DoubleNode( data )
    let foundNode = this.find( after )
    if( foundNode === -1 ){
      return -1
    }
    if( foundNode.next === null ){
      this.tail = newNode
    } else {
      foundNode.next.prev = newNode
    }
    newNode.next = foundNode.next
    newNode.prev = foundNode
    foundNode.next = newNode
  }

  insertBefore( data, before ){
    let newNode = new DoubleNode( data )
    let foundNode = this.find( before )
    if( foundNode === -1 ){
      return -1
    }
    if( foundNode.prev === null ){
      this.head = newNode
    } else {
      foundNode.prev.next = newNode
    }
    newNode.prev = foundNode.next
    newNode.next = foundNode
    foundNode.prev = newNode
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
    }

    this.tail = this.tail.prev
    if( this.tail === null ){
      this.head = null
    } else {
      this.tail.next = null
    }
    this.size--
  }

  removeFirst(){
    if( this.isEmpty() ){
      return -1
    }

    this.head = this.head.next
    if( this.head === null ){
      this.tail = null
    } else {
      this.head.prev = null
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