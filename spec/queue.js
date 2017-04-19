import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Queue from '../src/queue'

chai.use(chaiChange)

describe('Queue', () => {
  'use strict'

  it('exists', () => {
    expect(Queue).to.be.a('function')
  })

  context('enqueue()', () => {
    it('Puts an element into the queue', () => {
      const myQueue = new Queue()

      expect(() => myQueue.enqueue( 'foo' ))
        .to.alter(() => myQueue.length(), { from: 0, to: 1 })
    })
  })

  context('dequeue()', () => {
    it('Returns null for an empty queue', () => {
      const myQueue = new Queue()

      expect( myQueue.dequeue() ).to.be.null
    })

    it('Removes the first element from the queue and decrements length', () => {
      const myQueue = new Queue()
      myQueue.enqueue('First')
      myQueue.enqueue('Second')
      myQueue.enqueue('Third')

      expect( myQueue.dequeue() ).to.equal('First')
      expect(() => myQueue.dequeue())
        .to.alter(() => myQueue.length(), { from: 2, to: 1 })
      expect( myQueue.dequeue() ).to.equal('Third')
      expect( myQueue.dequeue() ).to.be.null

    })
  })

  context('front() and back()', () => {
    it('Return null for an empty queue', () => {
      const myQueue = new Queue()

      expect( myQueue.getFront() ).to.be.null
      expect( myQueue.getBack() ).to.be.null
    })

    it('Return a value without altering the queue', () => {
      const myQueue = new Queue()
      myQueue.enqueue('one')

      expect(() => myQueue.getFront() )
        .to.alter(() => myQueue.length(), { from: 1, to: 1 })
      expect(() => myQueue.getBack() )
        .to.alter(() => myQueue.length(), { from: 1, to: 1 })
    })

    it('Both return the same value for a single-item queue', () => {
      const myQueue = new Queue()
      myQueue.enqueue('one')

      expect( myQueue.getFront() ).to.equal( 'one' )
      expect( myQueue.getBack() ).to.equal( 'one' )
    })

    it('Properly return the front and back items in the queue', () => {
      const myQueue = new Queue()
      myQueue.enqueue('one')
      myQueue.enqueue('two')
      myQueue.enqueue('three')

      expect( myQueue.getFront() ).to.equal( 'one' )
      expect( myQueue.getBack() ).to.equal( 'three' )
    })
  })

  context('isEmpty()', () => {
    it('Returns true if a queue is emtpy', () => {
      const myQueue = new Queue()

      expect( myQueue.isEmpty() ).to.be.true
    })

    it('Returns false if a queue has elements', () => {
      const myQueue = new Queue()
      myQueue.enqueue( 'foo' )

      expect( myQueue.isEmpty() ).to.be.false
    })
  })
})
