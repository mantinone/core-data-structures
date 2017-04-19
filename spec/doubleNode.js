import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DoubleNode from '../src/DoubleNode'

chai.use(chaiChange)

describe('DoubleNode', () => {
  'use strict'

  it('exists', () => {
    expect( DoubleNode ).to.be.a('function')
  })

  context('The Constructor', () => {
    it('Creates a new DoubleNode with some data value, with next defaulting to null', () => {
      const newNode = new DoubleNode( 12 )

      expect( newNode.data ).to.equal( 12 )
      expect( newNode.next ).to.be.null
      expect( newNode.prev ).to.be.null
    })

    it('Can create a new DoubleNode connected other nodes', () => {
      const node1 = new DoubleNode( 'one' )
      const node3 = new DoubleNode( 'three' )
      const node2 = new DoubleNode( 'two', node3, node1 )

      expect( node2.data ).to.equal( 'two' )
      expect( node2.next ).to.deep.equal( node3 )
      expect( node2.prev ).to.deep.equal( node1 )
    })
  })

  context("The Node's values can be changed", () => {
    it('"node.data = var" will change the Node\'s data', () => {
      const nodeA = new DoubleNode( 'a' )
      nodeA.data = 7

      expect( nodeA.data ).to.equal( 7 )
    })

    it('"node.next = otherNode" will update the next property', () => {
      const nodeA = new DoubleNode( 'a' )
      const nodeB = new DoubleNode( 'b' )

      expect( nodeB.next ).to.be.null
      nodeB.next = nodeA
      expect( nodeB.next ).to.deep.equal( nodeA )
    })

  })
})
