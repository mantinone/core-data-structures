import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Node from '../src/node'

chai.use(chaiChange)

describe('Node', () => {
  'use strict'

  it('exists', () => {
    expect( Node ).to.be.a('function')
  })

  context('The Constructor', () => {
    it('Creates a new node with some data value, with next defaulting to null', () => {
      const newNode = new Node( 12 )

      expect( newNode.data ).to.equal( 12 )
      expect( newNode.next ).to.be.null
    })

    it('Can create a new node connected to another node', () => {
      const nodeA = new Node( 'a' )
      const nodeB = new Node( 'b', nodeA )

      expect( nodeB.data ).to.equal( 'b' )
      expect( nodeB.next ).to.deep.equal( nodeA )
      expect( nodeB.next.data ).to.equal( 'a' )
    })
  })

  context("The Node's values can be changed", () => {
    it('"node.data = var" will change the Node\'s data', () => {
      const nodeA = new Node( 'a' )
      nodeA.data = 7

      expect( nodeA.data ).to.equal( 7 )
    })

    it('"node.next = otherNode" will update the next property', () => {
      const nodeA = new Node( 'a' )
      const nodeB = new Node( 'b' )

      expect( nodeB.next ).to.be.null
      nodeB.next = nodeA
      expect( nodeB.next ).to.deep.equal( nodeA )
    })

  })
})
