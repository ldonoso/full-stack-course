# Part 1

## Introduction to React

It seems like React components are returning HTML markup. However, this is not the case. The layout of React components is mostly written using JSX. Although JSX looks like HTML, we are actually dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into JavaScript.

After compiling, our application looks like this:

    const App = () => {
      const now = new Date()
      const a = 10
      const b = 20
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p', null, 'Hello world, it is ', now.toString()
        ),
        React.createElement(
          'p', null, a, ' plus ', b, ' is ', a + b
        )
      )
    }

    ReactDOM.render(
      React.createElement(App, null),
      document.getElementById('root')
    )

Writing components with React is easy, and by combining components, even a more complex application can be kept fairly maintainable. Indeed, a core philosophy of React is composing applications from many specialized reusable components.

Because the root element is stipulated, we have "extra" div-elements in the DOM-tree. This can be avoided by using fragments, i.e. by wrapping the elements to be returned by the component with an empty element:

    const App = () => {
      const name = 'Peter'
      const age = 10

      return (
        <>
          <h1>Greetings</h1>
          <Hello name="Maya" age={26 + 10} />
          <Hello name={name} age={age} />
          <Footer />
        </>
      )
    }

## Javascript

### Arrays

When using React, techniques from functional programming are often used. One characteristic of the functional programming paradigm is the use of immutable data structures. In React code, it is preferable to use the method `concat` than `push`, which does not add the item to the array, but creates a new array in which the content of the old array and the new item are both included.

    const t = [1, -1, 3]

    const t2 = t.concat(5)

    console.log(t)  // [1, -1, 3] is printed
    console.log(t2) // [1, -1, 3, 5] is printed

### Objects

There are a few different ways of defining objects in Javascript. One very common method is using object literals, which happens by listing its properties within braces:

    const object1 = {
      name: 'Arto Hellas',
      age: 35,
      education: 'PhD',
    }

The properties of an object are referenced by using the "dot" notation, or by using brackets:

    console.log(object1.name)

    const fieldName = 'age' 
    console.log(object1[fieldName])

You can also add properties to an object on the fly by either using dot notation or using brackets:

    object1.address = 'Helsinki'
    object1['secret number'] = 12341

## Component state, event handlers

## A more complex state, debugging React apps
