import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import PriorityQueue from '../src/PriorityQueue'

chai.use(chaiChange)

describe('PriorityQueue', () => {
  'use strict'

  it('exists', () => {
    expect(PriorityQueue).to.be.a('function')
  })

  context('enqueue()', () => {
    it('Puts an element into the queue', () => {
      const myQueue = new PriorityQueue()

      expect(() => myQueue.enqueue( 'foo', 1  ))
        .to.alter(() => myQueue.length(), { from: 0, to: 1 })
    })

    it('Puts a same or lower-priority item at the back of the queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue( 'ten', 10 )

      myQueue.enqueue( 'ten-again', 10 )
      expect( myQueue.getBack().getData() ).to.equal( 'ten-again' )

      myQueue.enqueue( 'five', 5  )
      expect( myQueue.getBack().getData() ).to.equal( 'five' )

    })

    it('Puts a higher priority item at the front of the queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue( 'five', 5  )
      myQueue.enqueue( 'ten', 10  )

      expect( myQueue.getBack().getData() ).to.equal( 'five' )
      expect( myQueue.getFront().getData() ).to.equal( 'ten' )

    })

    it('Puts a mid-priority item at the correct place in the middle of the queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue( 'ten', 10 )
      myQueue.enqueue( 'five', 5 )
      myQueue.enqueue( 'seven', 7 )

      expect( myQueue.getBack().getData() ).to.equal( 'five' )
      expect( myQueue.getBack().prev.getData() ).to.equal( 'seven' )
    })
  })

  context('dequeue()', () => {
    it('Returns null for an empty queue', () => {
      const myQueue = new PriorityQueue()

      expect( myQueue.dequeue() ).to.be.null
    })

    it('Removes the first element from the queue and decrements length', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue('First', 10)
      myQueue.enqueue('Second', 10)
      myQueue.enqueue('Third', 10)

      expect( myQueue.dequeue() ).to.equal('First')
      expect(() => myQueue.dequeue())
        .to.alter(() => myQueue.length(), { from: 2, to: 1 })
      expect( myQueue.dequeue() ).to.equal('Third')
      expect( myQueue.dequeue() ).to.be.null

    })

    it('Deques in proper priority order', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue('Second', 100)
      myQueue.enqueue('First', 1000)
      myQueue.enqueue('Third', 10)

      expect( myQueue.dequeue() ).to.equal('First')
      expect( myQueue.dequeue() ).to.equal('Second')
      expect( myQueue.dequeue() ).to.equal('Third')
    })
  })

  context('front() and back()', () => {
    it('Return null for an empty queue', () => {
      const myQueue = new PriorityQueue()

      expect( myQueue.getFront() ).to.be.null
      expect( myQueue.getBack() ).to.be.null
    })

    it('Return a value without altering the queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue('one', 1 )

      expect(() => myQueue.getFront() )
        .to.alter(() => myQueue.length(), { from: 1, to: 1 })
      expect(() => myQueue.getBack() )
        .to.alter(() => myQueue.length(), { from: 1, to: 1 })
    })

    it('Both return the same value for a single-item queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue('one', 1 )

      expect( myQueue.getFront().getData() ).to.equal( 'one' )
      expect( myQueue.getBack().getData() ).to.equal( 'one' )
    })

    it('Properly return the front and back items in the queue', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue('one', 1)
      myQueue.enqueue('two', 1)
      myQueue.enqueue('three', 1)

      expect( myQueue.getFront().getData() ).to.equal( 'one' )
      expect( myQueue.getBack().getData() ).to.equal( 'three' )
    })
  })

  context('isEmpty()', () => {
    it('Returns true if a queue is emtpy', () => {
      const myQueue = new PriorityQueue()

      expect( myQueue.isEmpty() ).to.be.true
    })

    it('Returns false if a queue has elements', () => {
      const myQueue = new PriorityQueue()
      myQueue.enqueue( 'foo', 1 )

      expect( myQueue.isEmpty() ).to.be.false
    })
  })
})
