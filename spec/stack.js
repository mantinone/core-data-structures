import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Stack from '../src/stack'

chai.use(chaiChange)

describe('Stack', () => {
  'use strict'

  it('exists', () => {
    expect(Stack).to.be.a('function')
  })

  context('push()', () => {
    it('pushes an element to the top of the stack.', () => {
      const myStack = new Stack()

      expect(() => myStack.push('foo'))
        .to.alter(() => myStack.length(), { from: 0, to: 1 })
    })
  })

  context('pop()', () => {
    it('Removes the top node and returns its data', () => {
      const myStack = new Stack()
      myStack.push('one')
      myStack.push('two')

      expect( myStack.pop() ).to.equal( 'two' )
      expect( myStack.pop() ).to.equal( 'one' )

      myStack.push('one')
      myStack.push('two')
      expect( () => myStack.pop() )
        .to.alter( () => myStack.length(), { from: 2, to: 1 })

    })

    it('Returns null for an empty stack', () => {
      const myStack = new Stack()

      expect( myStack.pop() ).to.be.null
    })
  })

  context('peek()', () => {
    it('Returns null for an empty array', () => {
      const myStack = new Stack()

      expect( myStack.peek() ).to.be.null
    })

    it('Returns the top value without altering the stack', () => {
      const myStack = new Stack()
      myStack.push('one')

      expect( myStack.peek() ).to.equal( 'one' )
      expect(() => myStack.peek() )
        .to.alter(() => myStack.length(), { from: 1, to: 1 })

    })
  })

  context('isEmpty()', () => {
    it('Returns true if a stack is emtpy', () => {
      const myStack = new Stack()

      expect( myStack.isEmpty() ).to.be.true
    })

    it('Returns false if a stack has elements', () => {
      const myStack = new Stack()
      myStack.push( 'foo' )

      expect( myStack.isEmpty() ).to.be.false
    })
  })
})
