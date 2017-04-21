'use strict'

import BinaryNode from '../src/binaryNode'

export default class BinaryTree {
  constructor(){
    this.root = null
    this.size = 0
  }

  insert( data ){
    let newNode = new BinaryNode( data )
    this.size++
    if( this.size <= 1 ){
      this.root = newNode
    } else {
      let parentNode = null
      let destination = this.root

      while( destination ){
        parentNode = destination
        if( data < parentNode.data ){
          destination = parentNode.left
          if( destination === null ){
            parentNode.left = newNode
          }
        } else{
          destination = parentNode.right
          if( destination === null ){
            parentNode.right = newNode
          }
        }
      }
      newNode.parent = parentNode
    }
  }

  search( data ){
    let currentNode = this.root
    while( currentNode ){
      if( data === currentNode.data ){
        return currentNode
      } else if( data < currentNode.data ){
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    return null
  }

  remove( data ){
    let toRemove = this.search( data )

    this.size--
  }

  traverse( fxn ){

  }

  count(){
    return this.size
  }

}
