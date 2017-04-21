import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Set from '../src/set'

chai.use(chaiChange)

describe('Set', () => {
  'use strict'

  it('exists', () => {
    expect( Set ).to.be.a('function')
  })

  context('The Constructor', () => {
    it('Creates a new set when passed an array', () => {
      const mySet = new Set( ['A', 'B', 'C'] )

      expect( mySet.size() ).to.equal( 3 )
      expect( mySet.getDataset() ).to.have.same.members( ['A','B', 'C'] )
    })

    it('Creates a single item set when passed a non-array', () => {
      const mySet = new Set( 'A' )

      expect( mySet.size() ).to.equal( 1 )
      expect( mySet.getDataset() ).to.deep.equal( ['A'] )
    })
  })

  context('isEmpty()', () => {
    it('Returns true for an empty set', () => {
      const mySet = new Set( )
      expect( mySet.isEmpty()).to.be.true
    })

    it('Returns false for a non-empty set', () => {
      const mySet = new Set( 'A' )
      expect( mySet.isEmpty()).to.be.false
    })
  })

  context('contains()', () => {
    const mySet = new Set( ['D', 'E', 'F', 'G'])
    it('Returns true when a set contains an item', () => {
      expect( mySet.contains( 'D')).to.be.true
      expect( mySet.contains( 'G')).to.be.true
    })

    it('Returns false when a set does not contain an item', () => {
      expect( mySet.contains( 'A')).to.be.false
      expect( mySet.contains( 12 )).to.be.false
    })
  })

  context('add()', () => {
    it('Adds an item to the set', () => {
      const mySet = new Set( ['A', 'B', 'C'] )

      expect(() => mySet.add('G'))
        .to.alter(() => mySet.size(), { from: 3, to: 4 })
      expect( mySet.getDataset() ).to.have.same.members( ['A', 'B', 'C', 'G'] )
    })

    it('Does not worry about order when adding to the set', () => {
      const mySet = new Set( ['A', 'M', 'Z'] )
      mySet.add('F')

      expect( mySet.getDataset() ).to.have.same.members( ['A', 'F', 'M', 'Z'] )
    })

    it('Fails if the set already contains the item', () => {
      const mySet = new Set( ['A', 'B', 'C'] )

      expect( mySet.add('A') ).to.equal( -1 )
      expect( mySet.getDataset() ).to.have.same.members( ['A', 'B', 'C'] )
    })
  })

  context('remove()', () => {
    it('Removes an item from the set', () => {
      const mySet = new Set( ['A', 'B', 'C'] )

      expect(() => mySet.remove('A'))
        .to.alter(() => mySet.size(), { from: 3, to: 2 })
      expect( mySet.getDataset() ).to.have.same.members( ['B', 'C'] )
    })

    it('Does nothing is the item is not in the set', () => {
      const mySet = new Set( ['A', 'B', 'C'] )

      expect(() => mySet.remove('Z'))
        .to.alter(() => mySet.size(), { from: 3, to: 3 })
      expect( mySet.getDataset() ).to.have.same.members( ['A', 'B', 'C'] )
    })
  })

  context('forEach()', () => {
    it('Preforms a function on each item of the set', () => {
      const mySet = new Set( [1,2,3,4] )
      let accum = 0
      mySet.forEach( ( item ) => { accum += item} )
      expect ( accum ).to.equal( 10 )
    })
  })

  context('clone()', () => {
    it('Makes a copy of the set', () => {
      const mySet = new Set( [2,4,6,8] )
      const cloneSet = mySet.clone()

      expect( cloneSet.getDataset() ).to.have.same.members( mySet.getDataset() )
    })

    it('Coned set and original set do not affect one another', () => {
      const mySet = new Set( [2,3,4] )
      const cloneSet = mySet.clone()

      cloneSet.remove( 3 )
      mySet.add( 1 )

      expect( mySet.getDataset() ).to.have.same.members( [1,2,3,4] )
      expect( cloneSet.getDataset() ).to.have.same.members( [2,4] )
    })


  })

  context( 'union()', () => {
    it('Creates a union set', () => {
      const mySet = new Set( [2,3,4] )
      const otherSet = new Set( [1,3,8] )
      const unionSet = mySet.union( otherSet )
      expect( unionSet.getDataset() ).to.have.same.members( [1,2,3,4,8] )
    })
  })

  context( 'intersect()', () => {
    it('Creates a union set', () => {
      const mySet = new Set( [2,1,3,4] )
      const otherSet = new Set( [2,4,6,8] )
      const unionSet = mySet.intersect( otherSet )
      expect( unionSet.getDataset() ).to.have.same.members( [2,4] )
    })
  })

  context( 'difference()', () => {
    it('Creates a right-hand compliment set', () => {
      const mySet = new Set( [1,2,3,4] )
      const otherSet = new Set( [3,4,5,6] )
      const unionSet = mySet.difference( otherSet )
      expect( unionSet.getDataset() ).to.have.same.members( [5,6] )
    })
  })

  context( 'isSubset()', () => {
    it('Returns true if passed a subset', () => {
      const mySet = new Set( [1,2,3,4,5,6] )
      const otherSet = new Set( [6,4,1] )
      expect( mySet.isSubset( otherSet ) ).to.be.true
    })

    it('Returns false if passed a non subset', () => {
      const mySet = new Set( [1,2,3,4,5,6] )
      const otherSet = new Set( [6,8] )
      expect( mySet.isSubset( otherSet ) ).to.be.false
    })
  })

})