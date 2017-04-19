import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DoublyLinkedList from '../src/doublyLinkedList'

chai.use(chaiChange)

describe.only('DoublyLinkedList', () => {
  'use strict'

  it('exists', () => {
    expect(DoublyLinkedList).to.be.a('function')
  })

  context('insert()', () => {
    it('Puts an element into the list', () => {
      const myList = new DoublyLinkedList()

      expect(() => myList.insert( 'foo' ))
        .to.alter(() => myList.length(), { from: 0, to: 1 })
      expect(() => myList.insert( 'boo' ))
        .to.alter(() => myList.length(), { from: 1, to: 2 })
    })
  })

  context('find()', () => {
    it('Returns the first node with the given data', () => {
      const myList = new DoublyLinkedList()
      myList.insert( 'apples' )
      myList.insert( 'bananas' )
      myList.insert( 'papayas' )

      expect( myList.find('bananas').data ).to.equal( 'bananas' )
      expect( myList.find('bananas').next.data ).to.equal( 'papayas' )
    })

    it('Returns -1 if the item is not found', () => {
      const myList = new DoublyLinkedList()

      expect( myList.find('something') ).to.equal( -1 )
      myList.insert( 'anything' )
      expect( myList.find('something') ).to.equal( -1 )
    })
  })

  context( 'contains()', () => {
    const myList = new DoublyLinkedList()
    myList.insert( 'apples' )
    myList.insert( 'bananas' )
    myList.insert( 'papayas' )

    it('Returns true if the data is found', () => {
      expect( myList.contains('bananas')).to.be.true
    })

    it('Returns false if the data is not found', () => {
      expect(myList.contains( 'prunes' )).to.be.false
    })
  })

  context('gedHeadNode() and getTailNode()', () => {
    it('Return null for an empty queue', () => {
      const myList = new DoublyLinkedList()

      expect( myList.getHeadNode() ).to.be.null
      expect( myList.getTailNode() ).to.be.null
    })

    it('Return a value without altering the list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')

      expect(() => myList.getHeadNode() )
        .to.alter(() => myList.length(), { from: 1, to: 1 })
      expect(() => myList.getTailNode() )
        .to.alter(() => myList.length(), { from: 1, to: 1 })
    })

    it('Both return the same value for a single-item list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')

      expect( myList.getHeadNode().data ).to.equal( 'one' )
      expect( myList.getTailNode().data ).to.equal( 'one' )
    })

    it('Properly return the front and back items in the queue', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')
      myList.insert('three')

      expect( myList.getHeadNode().data ).to.equal( 'one' )
      expect( myList.getTailNode().data ).to.equal( 'three' )
    })
  })

  context( 'insertFirst()', () => {
    it('Inserts a new node as the head instead of the tail', () => {
      const myList = new DoublyLinkedList()
      myList.insertFirst('one')
      myList.insert('two')
      myList.insertFirst('three')

      expect( myList.getTailNode().data ).to.equal( 'two' )
      expect( myList.getHeadNode().data ).to.equal( 'three' )
    })
  })

  context( 'insertBefore()', () => {
    it('returns -1 if the given node is not found', () => {
      const myList = new DoublyLinkedList()
      myList.insert('apples')
      myList.insert('bananas')
      myList.insert('pears')

      expect( myList.insertBefore( 'prunes', 'plums' ) ).to.equal( -1 )
    })

    it( 'inserts an item in the middle of a list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')
      myList.insertBefore( 'three', 'two' )

      expect( myList.getHeadNode().next.data ).to.equal('three')
      expect( myList.getTailNode().data ).to.equal('two')
    })

    it( 'inserts a node into a single-item list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('apples')
      myList.insertBefore( 'bananas', 'apples' )

      expect( myList.getHeadNode().data ).to.equal( 'bananas' )
      expect( myList.getTailNode().data ).to.equal( 'apples' )
    })
  })

  context( 'insertAfter()', () => {
    it('returns -1 if the given node is not found', () => {
      const myList = new DoublyLinkedList()
      myList.insert('apples')
      myList.insert('bananas')

      expect( myList.insertAfter( 'prunes', 'plums' ) ).to.equal( -1 )
    })

    it( 'inserts an item in the middle of a list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')
      myList.insertAfter( 'one', 'three' )

      expect( myList.getHeadNode().next.data ).to.equal('three')
      expect( myList.getTailNode().data ).to.equal('two')
    })

    it( 'inserts a node into a single-item list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('apples')
      myList.insertAfter( 'apples', 'bananas' )

      expect( myList.getHeadNode().data ).to.equal( 'apples' )
      expect( myList.getTailNode().data ).to.equal( 'bananas' )
    })
  })

  context('clear()', () => {
    it('Empties the list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')

      expect(() => myList.clear())
        .to.alter(() => myList.length(), { from: 2, to: 0 })
      expect( myList.getHeadNode() ).to.be.null
      expect( myList.getTailNode() ).to.be.null
    })
  })

  context('remove()', () => {
    it('Removes the last node from the list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')
      myList.insert('three')

      expect(() => myList.remove())
        .to.alter(() => myList.length(), { from: 3, to: 2 })
      expect( myList.getTailNode().data ).to.equal( 'two' )
    })

    it('Clears a single-item list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')

      expect(() => myList.remove())
        .to.alter(() => myList.length(), { from: 1, to: 0 })
      expect( myList.getTailNode() ).to.be.null

    })

    it('Returns -1 on an empty list', () => {
      const myList = new DoublyLinkedList()

      expect( myList.remove() ).to.equal( -1 )
    })
  })

  context('removeFirst()', () => {
    it('Removes the first node from the list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')
      myList.insert('two')
      myList.insert('three')

      expect(() => myList.removeFirst())
        .to.alter(() => myList.length(), { from: 3, to: 2 })
      expect( myList.getHeadNode().data ).to.equal( 'two' )
    })

    it('Clears a single-item list', () => {
      const myList = new DoublyLinkedList()
      myList.insert('one')

      expect(() => myList.removeFirst())
        .to.alter(() => myList.length(), { from: 1, to: 0 })
      expect( myList.getHeadNode() ).to.be.null

    })

    it('Returns -1 on an empty list', () => {
      const myList = new DoublyLinkedList()

      expect( myList.removeFirst() ).to.equal( -1 )
    })
  })
})