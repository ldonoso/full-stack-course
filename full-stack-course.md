# Part 1: Introduction to React

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

### Stateful component

Making repeated calls to the ReactDOM.render-method is not the recommended way to re-render components.

All of our components up till now have been simple in the sense that they have not contained any state that could change during the lifecycle of the component. Next, let's add state to our application's App component with the help of React's state hook.

    const App = (props) => {
      const [counter, setCounter] = useState(0)

      setTimeout(
        () => setCounter(counter + 1),
        1000
      )

      return (
        <div>{counter}</div>
      )
    }


When the state modifying function setCounter is called, React re-renders the component which means that the function body of the component function gets re-executed.

### Event handling

    const App = (props) => {
      const [counter, setCounter] = useState(0)

      return (
        <div>
          <div>{counter}</div>
          <button onClick={() => setCounter(counter + 1)}>
            plus
        </button>
        </div>
      )
    }

Every time we click the button, `onClick` is called which calls `setCounter` causing the component to be re-rendered.

### Passing state to child components

It's recommended to write React components that are small and reusable across the application and even across projects.

One best practice in React is to lift the state up high enough in the component hierarchy. The documentation says:

> Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

### Changes in state cause rerendering

When the application starts, the code in App is executed. This code uses a useState - hook to create the application state - value of the counter counter. The component renders the Display component. It displays the counter's value (0), and three Button components. The buttons have event handlers, which are used to change the state of the counter.

When one of the buttons is clicked, the event handler is executed. The event handler changes the state of the App component with the setCounter function. Calling a function which changes the state causes the component to rerender.

So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is rerendered. This causes its subcomponents Display and Button to also be rerendered. Display receives the new value of the counter, 1, as props. The Button components receive event handlers which can be used to change the state of the counter.

## A more complex state, debugging React apps

### Complex state

You might be wondering why we didn't just update the state directly, like this:

    const handleLeftClick = () => {
        clicks.left++
        setClicks(clicks)
    }

The application appears to work. However, it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object want to simply be copied, this has to be done by copying those properties into a new object.

Storing all of the state in a single state object is a bad choice for this particular application; there's no apparent benefit and the resulting application is a lot more complex. In this case storing the click counters into separate pieces of state is a far more suitable choice.

### Handling arrays

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

Adding the new item to the array is accomplished with the `concat` method, that does not mutate the existing array but rather returns a new copy of the array with the item added to it.

As mentioned previously, it's also possible in JavaScript to add items to an array with the push method. If we add the item by pushing it to the allClicks array and then updating the state, the application would still appear to work:

    const handleLeftClick = () => {
        allClicks.push('L')
        setAll(allClicks)
        setLeft(left + 1)
    }

However, don't do this. As mentioned previously, the state of React components like allClicks must not be mutated directly. Even if mutating state appears to work in some cases, it can lead to problems that are very hard to notice.

### Old React

In this course we use the state hook to add state to our React components, which is part of the newer versions of React and is available from version 16.8.0 onwards. Before the addition of hooks, there was no way to add state to React functional components. Components that required state had to be defined as React class components using the JavaScript class syntax.

In this course we have made the slightly radical decision to use hooks exclusively from day one, to ensure that we are learning the future style of React. Even though functional components are the future of React, it is still important to learn the class syntax, as there are billions of lines of old React code that you might end up maintaining some day. The same applies to documentation and examples of React that you may stumble across on the internet.

### Debugging

Keep the browser's developer console open at all times.

Keep both your code and the web page open together at the same time, all the time.

NB when you use console.log for debugging, don't combine objects in a Java-like fashion by using a plus. Instead of writing:

    console.log('props value is' + props)

Separate the things you want to log to the console with a comma:

    console.log('props value is', props)

If you use the Java-like way to combine a string with an object, you will end up with a rather uninformative log message:

    props value is [Object object]

Whereas the items separated by a comma will all be available in the browser console for further inspection.

You can pause the execution of your application code in the Chrome developer console's debugger, by writing the command `debugger` anywhere in your code.

You can also access the debugger without the debugger command by adding break points in the Sources tab. Inspecting the values of the component's variables can be done in the Scope-section.

It is highly recommended to add the React developer tools extension to Chrome. It adds a new React tab to the developer tools. The new React developer tools tab can be used to inspect the different React elements in the application, along with their state and props.

### Rules of Hooks

The `useState` function (as well as the `useEffect` function) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.

To recap, hooks may only be called from the inside of a function body that defines a React component:

	const App = (props) => {
	  const [age, setAge] = useState(0)
	  const [name, setName] = useState('Juha Tauriainen')

	  if ( age > 10 ) {
		// this does not work!
		const [foobar, setFoobar] = useState(null)
	  }

	  for ( let i = 0; i < age; i++ ) {
		// also this is not good
		const [rightWay, setRightWay] = useState(false)
	  }

	  const notGood = () => {
		// and this is also illegal
		const [x, setX] = useState(-1000)
	  }

	  return (
		//...
	  )
	}

### Do Not Define Components Within Components

The application still appears to work, but don't implement components like this! Never define components inside of other components. The method provides no benefits and leads to many unpleasant problems. 

# Part 2: Communicating with server

## Rendering a collection, modules

React uses the key attributes of objects in an array to determine how to update the view generated by a component when the component is re-rendered.

### Anti-pattern: array indexes as keys

We could have used the array indexes as keys. The indexes can be retrieved by passing a second parameter to the callback function of the map-method:

	notes.map((note, i) => ...)

As such, one way to define the row generation without getting errors is:

	<ul>
	  {notes.map((note, i) => 
		<li key={i}>
		  {note.content}
		</li>
	  )}
	</ul>

This is, however, not recommended and can cause undesired problems even if it seems to be working just fine.

### Refactoring modules

	const Note = ({ note }) => {  return (    <li>{note.content}</li>  )}

	const App = ({ notes }) => {
	  return (
		<div>
		  <h1>Notes</h1>
		  <ul>
			{notes.map(note =>           
				<Note key={note.id} note={note} />        
			)}
          </ul>
		</div>
	  )
	}

Note, that the key attribute must now be defined for the Note components, and not for the li tags like before. 

## Forms

	const addNote = (event) => {
	  event.preventDefault()
	  console.log('button clicked', event.target)
	}

The event parameter is the event that triggers the call to the event handler function.

The event handler immediately calls the event.preventDefault() method, which prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.

How do we access the data contained in the form's input element? There are many ways to accomplish this; the first method we will take a look at is the use of so-called controlled components.

	  const [newNote, setNewNote] = useState('a new note...')

	  return (
		<div>

		  <form onSubmit={addNote}>
			  <input value={newNote} />
			  <button type="submit">save</button>
		  </form>

		</div>
	  )

The placeholder text stored as the initial value of the newNote state appears in the input element, but the input text can't be edited. Since we assigned a piece of the App component's state as the value attribute of the input element, the App component now controls the behavior of the input element.

In order to enable editing of the input element, we have to register an event handler that synchronizes the changes made to the input with the component's state:

	<input
	  value={newNote}
	  onChange={handleNoteChange}
	/>

The event handler is called every time a change occurs in the input element. The event handler function receives the event object as its event parameter:

	const handleNoteChange = (event) => {
	  console.log(event.target.value)
	  setNewNote(event.target.value)
	}

The target property of the event object now corresponds to the controlled input element and `event.target.value` refers to the input value of that element.

Note that we did not need to call the event.preventDefault() method like we did in the onSubmit event handler. This is because there is no default action that occurs on an input change, unlike on a form submission.

Now the App component's newNote state reflects the current value of the input, which means that we can complete the addNote function for creating new notes:

	const addNote = (event) => {
	  event.preventDefault()
	  const noteObject = {
		content: newNote,
		date: new Date().toISOString(),
		important: Math.random() < 0.5,
		id: notes.length + 1,
	  }

	  setNotes(notes.concat(noteObject))
	  setNewNote('')
	}

## Getting data from server

### The browser as a runtime environment

JavaScript engines, or runtime environments, follow the asynchronous model. In principle, this requires all IO-operations (with some exceptions) to be executed as non-blocking. This means that the code execution continues immediately after calling an IO function, without waiting for it to return.

When an asynchronous operation is completed, or more specifically, at some point after its completion, the JavaScript engine calls the event handlers registered to the operation.

Currently, JavaScript engines are single-threaded, which means that they cannot execute code in parallel. As a result, it is a requirement in practise to use a non-blocking model for executing IO operations. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.

Another consequence of this single threaded nature of Javascript engines is that if some code execution takes up a lot of time, the browser will get stuck for the duration of the execution.

For the browser to remain responsive, i.e. to be able to continuously react to user operations with sufficient speed, the code logic needs to be such that no single computation can take too long.

In today's browsers, it is possible to run parallelized code with the help of so-called web workers. The event loop of an individual browser window is, however, still only handled by a single thread.

### axios and promises

Axios' method get returns a promise. The documentation on Mozilla's site states the following about promises:

> A Promise is an object representing the eventual completion or failure of an asynchronous operation.

In other words, a promise is an object that represents an asynchronous operation. A promise can have three distinct states:

* The promise is pending: It means that the final value (one of the following two) is not available yet.
* The promise is fulfilled: It means that the operation has completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.
* The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

If, and when, we want to access the result of the operation represented by the promise, we must register an event handler to the promise. This is achieved using the method `then`:

	const promise = axios.get('http://localhost:3001/notes')

	promise.then(response => {
	  console.log(response)
	})

Storing the promise object in a variable is generally unnecessary, and it's instead common to chain the then method call to the axios method call:

	axios
	  .get('http://localhost:3001/notes')
	  .then(response => {
		const notes = response.data
		console.log(notes)
	  })

The data returned by the server is plain text, basically just one long string. The axios library is still able to parse the data into a Javascript array, since the server has specified that the data format is application/json; charset=utf-8 using the content-type header.

We can finally begin using the data fetched from the server.

### Effect-hooks

We have already used state hooks which provide state to React components defined as functions. Version 16.8.0 also introduces the effect hooks as a new feature. In the words of the docs:

> The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

As such, effect hooks are precisely the right tool to use when fetching data from a server.

	const App = () => {
	  const [notes, setNotes] = useState([])

	  useEffect(() => {
		axios
		  .get('http://localhost:3001/notes')
		  .then(response => {
			setNotes(response.data)
		  })
	  }, [])

The effect is executed immediately after rendering. The execution of the function results in effect being printed to the console, and the command axios.get initiates the fetching of data from the server as well as registers a function as an event handler for the operation.

When data arrives from the server, the JavaScript runtime calls the function registered as the event handler, which stores the notes received from the server into the state using the function `setNotes(response.data)`.

As always, a call to a state-updating function triggers the re-rendering of the component. As a result, the notes fetched from the server are rendered to the screen.

`useEffect` actually takes two parameters. The first is a function, the effect itself. According to the documentation:

> By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

So by default the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render.

The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

## Altering data in server

## Adding styles to React app

