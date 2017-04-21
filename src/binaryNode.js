'use strict'

export default class BinaryNode {
  constructor( data, left = null, right = null){
    this.data = data
    this.left = left
    this.right = right
    this.parent = null
  }
}
