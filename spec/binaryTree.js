import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import BinaryTree from '../src/binaryTree'

chai.use(chaiChange)

describe.only('BinaryTree', () => {
  'use strict'

  it('exists', () => {
    expect(BinaryTree).to.be.a('function')
  })

  context('count()', () => {
    it('Tracks the size of the tree as things are added', () => {
      const myTree = new BinaryTree()

      expect(() => myTree.insert(5))
        .to.alter(() => myTree.count(), { from: 0, to: 1 })
      expect(() => myTree.remove(5))
        .to.alter(() => myTree.count(), { from: 1, to: 0 })
    })
  })

  context('insert()', () => {
    it('Inserts elements into the tree in the right order', () => {
      const myTree = new BinaryTree()
      myTree.insert( 5 )
      myTree.insert( 3 )
      myTree.insert( 7 )
      myTree.insert( 4 )

      expect( myTree.root.left.data ).to.equal( 3 )
      expect( myTree.root.left.right.data ).to.equal( 4 )
      expect( myTree.root.right.data ).to.equal( 7 )
    })
  })

  context('search()', () => {
    const myTree = new BinaryTree()
    myTree.insert( 5 )
    myTree.insert( 3 )
    myTree.insert( 7 )
    myTree.insert( 4 )
    console.log(myTree.root);
    it('Returns a node if the item is found', () => {
      expect( myTree.search(7).data ).to.equal( 7 )
      expect( myTree.search(4).data ).to.equal( 4 )
    })

    it('Returns null if item not found', () => {
      expect( myTree.search(1) ).to.be.null
    })
  })
})