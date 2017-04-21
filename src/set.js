'use strict'

export default class Set {
  constructor( data = [] ){
    if( !Array.isArray( data )){
      this.dataset = [ data ]
    } else {
      this.dataset = data
    }
  }

  getDataset() {
    return this.dataset
  }

  contains( searchItem ){
    for( let setItem of this.dataset ){
      if( setItem === searchItem ){
        return true
      }
    }
    return false
  }

  add( item ){
    if ( !this.contains( item )){
      this.dataset.push( item )
    } else {
      return -1
    }
  }

  remove( item ){
    let index = this.dataset.indexOf( item )
    if( index > -1) {
      this.dataset.splice( index, 1 )
    } else {
      return -1
    }
  }

  forEach( func ) {
    for( let i = 0; i < this.dataset.length; i++ ){
      func( this.dataset[i] )
    }
  }

  clone() {
    return new Set( this.dataset.slice() )
  }

  isEmpty() {
    return ! this.dataset.length > 0
  }

  size() {
    return this.dataset.length
  }

  union( set ){
    let result = this.dataset.slice()
    for( let item of set.getDataset() ){
      if( !(this.dataset.indexOf( item) >= 0) ){
        result.push( item )
      }
    }
    return new Set( result )
  }

  intersect( set ){
    let result = []

    for( let item of set.getDataset() ){
      if( this.dataset.indexOf( item) >= 0){
        result.push( item )
      }
    }
    return new Set( result )
  }

  difference( set ){
    let result = []
    for( let item of set.getDataset() ){
      if( !(this.dataset.indexOf( item) >= 0) ){
        result.push( item )
      }
    }
    return new Set( result )
  }

  isSubset( set ){
    let result = true
    for( let item of set.getDataset()) {
      if( this.dataset.indexOf( item ) < 0){
        result = false
      }
    }
    return result
  }

}
