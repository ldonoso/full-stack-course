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

### REST

In REST terminology, we refer to individual data objects, such as the notes in our application, as resources. Every resource has a unique address associated with it - its URL. According to a general convention used by json-server, we would be able to locate an individual note at the resource URL `notes/3`, where 3 is the id of the resource. The notes url, on the other hand, would point to a resource collection containing all the notes.

Creating a new resource for storing a note is done by making an HTTP POST request to the notes URL according to the REST convention that the json-server adheres to. The data for the new note resource is sent in the body of the request.

### Sending data to the server

    const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
    }

    axios
        .post('http://localhost:3001/notes', noteObject)
        .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
        })

We create a new object for the note but omit the id property, since it's better to let the server generate ids for our resources!

Since the data we sent in the POST request was a JavaScript object, axios automatically knew to set the appropriate application/json value for the Content-Type header.

The newly created note resource is stored in the value of the data property of the response object.

Once the data returned by the server starts to have an effect on the behavior of our web applications, we are immediately faced with a whole new set of challenges arising from, for instance, the asynchronicity of communication. This necessitates new debugging strategies, console logging and other means of debugging become increasingly more important, and we must also develop a sufficient understanding of the principles of both the JavaScript runtime and React components. Guessing won't be enough.

### Changing the importance of notes

Individual notes stored in the json-server backend can be modified in two different ways by making HTTP requests to the note's unique URL.

* We can either replace the entire note with an HTTP PUT request,
* or only change some of the note's properties with an HTTP PATCH request.

	const toggleImportanceOf = id => {
		const url = `http://localhost:3001/notes/${id}`
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		axios.put(url, changedNote).then(response => {
		  setNotes(notes.map(note => note.id !== id ? note : response.data))
		})
	}

This we create a new object that is an exact copy of the old note, apart from the `important` property.  Why did we make a copy of the note object we wanted to modify? The variable note is a reference to an item in the notes array in the component's state, and as we recall we must never mutate state directly in React.

### Extracting communication with the backend into a separate module

In the spirit of the single responsibility principle, we deem it wise to extract this communication into its own module.

	import axios from 'axios'
	const baseUrl = 'http://localhost:3001/notes'

	const getAll = () => {
	  return axios.get(baseUrl)
	}

	const create = newObject => {
	  return axios.post(baseUrl, newObject)
	}

	const update = (id, newObject) => {
	  return axios.put(`${baseUrl}/${id}`, newObject)
	}

	export default {
	  getAll: getAll,
	  create: create,
	  update: update
	}

The module returns an object that has three functions as its properties that deal with notes. The functions directly return the promises returned by the axios methods.

Since the names of the keys and the assigned variables are the same, we can write the object definition with more compact syntax:

	export default { getAll, create, update }

### Promises and errors

The rejection of a promise is handled by providing the `then` method with a second callback function, which is called in the situation where the promise is rejected.

The more common way of adding a handler for rejected promises is to use the `catch` method.

	axios
	  .get('http://example.com/probably_will_fail')
	  .then(response => {
		console.log('success!')
	  })
	  .catch(error => {
		console.log('fail')
	  })

The catch method is often utilized by placing it deeper within the promise chain.

## Adding styles to React app

Let's add a new *index.css* file under the *src* directory and then add it to the application by importing it in the *index.js* file:

    import './index.css'

Let's add the following CSS rule to the *index.css* file:

    h1 {
      color: green;
    }

CSS rules comprise of *selectors* and *declarations*. The selector defines which elements the rule should be applied to. The selector above is *h1*, which will match all of the *h1* header tags in our application.

There are many ways of matching elements by using [different types of CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

Using element types for defining CSS rules is slightly problematic. If our application contained other *li* tags, the same style rule would also be applied to them.

If we want to apply our style specifically to notes, then it is better to use [class selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors).

In regular HTML, classes are defined as the value of the *class* attribute:

    <li class="note">some text...</li>

In React we have to use the [className](https://reactjs.org/docs/dom-elements.html#classname) attribute instead of the class attribute. With this in mind, let's make the following changes to our *Note* component:

      return (
        <li className='note'>      {note.content}
          <button onClick={toggleImportance}>{label}</button>
        </li>
      )

Class selectors are defined with the *.classname* syntax:

    .note {
      color: grey;
      padding-top: 5px;
      font-size: 15px;
    }

If you now add other *li* elements to the application, they will not be affected by the style rule above.

### Inline styles

React also makes it possible to write styles directly in the code as so-called [inline styles](https://react-cn.github.io/react/tips/inline-styles.html).

Any React component or element can be provided with a set of CSS properties as a JavaScript object through the [style](https://reactjs.org/docs/dom-elements.html#style) attribute.

CSS rules are defined slightly differently in JavaScript than in normal CSS files. Let's say that we wanted to give some element the color green and italic font that's 16 pixels in size. In CSS, it would look like this:

    {
      color: green;
      font-style: italic;
      font-size: 16px;
    }

But as a React inline style object it would look like this:

```
 {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16
}
```

Every CSS property is defined as a separate property of the JavaScript object. Numeric values for pixels can be simply defined as integers. One of the major differences compared to regular CSS, is that hyphenated (kebab case) CSS properties are written in camelCase.

Next, we could add a "bottom block" to our application by creating a *Footer* component and define the following inline styles for it:

    const Footer = () => {
      const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
      }

      return (
        <div style={footerStyle}>
          <br />
          <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div>
      )
    }

Inline styles and some of the other ways of adding styles to React components go completely against the grain of old conventions. Traditionally, it has been considered the best practice to entirely separate CSS from the content (HTML) and functionality (JavaScript). According to this older school of thought, the goal was to write CSS, HTML, and JavaScript into their separate files.

The philosophy of React is, in fact, the polar opposite of this. Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.

The structural units that make up the application's functional entities are React components. A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place. This is to create individual components that are as independent and reusable as possible.

# Part 3: Programming a server with NodeJS and Express

## Node.js and Express

We will be building our backend on top of [NodeJS](https://nodejs.org/en/), which is a JavaScript runtime based on Google's [Chrome V8](https://developers.google.com/v8/) JavaScript engine.

Let's navigate to an appropriate directory, and create a new template for our application with the *npm init* command. We will answer the questions presented by the utility, and the result will be an automatically generated *package.json* file at the root of the project, that contains information about the project.

    {
      "name": "backend",
      "version": "0.0.1",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "Matti Luukkainen",
      "license": "MIT"
    }

The file defines, for instance, that the entry point of the application is the *index.js* file.

Let's make a small change to the *scripts* object:

    {
      // ...
      "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ...
    }

Next, let's create the first version of our application by adding an *index.js* file to the root of the project with the following code:

    console.log('hello world')

We can run the program directly with Node from the command line:

    node index.js

Or we can run it as an [npm script](https://docs.npmjs.com/misc/scripts):

    npm start

### Simple web server

Let's change the application into a web server:

    const http = require('http')

    const app = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Hello World')
    })

    const port = 3001
    app.listen(port)
    console.log(`Server running on port ${port}`)

We can open our humble application in the browser by visiting the address <http://localhost:3001>.

Let's take a closer look at the first line of the code:

    const http = require('http')

In the first row, the application imports Node's built-in [web server](https://nodejs.org/docs/latest-v8.x/api/http.html) module. This is practically what we have already been doing in our browser-side code, but with a slightly different syntax:

    import http from 'http'

These days, code that runs in the browser uses ES6 modules. Modules are defined with an [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) and taken into use with an [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

However, Node.js uses so-called [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification. At the time of writing this material, Node does not support ES6 modules, but support for them [is coming](https://nodejs.org/api/esm.html) somewhere down the road.

CommonJS modules function almost exactly like ES6 modules, at least as far as our needs in this course are concerned.

The primary purpose of the backend server in this course is to offer raw data in the JSON format to the frontend. For this reason, let's immediately change our server to return a hardcoded list of notes in the JSON format:

    const http = require('http')

    let notes = [{
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    }, {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    }, {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }]

    const app = http.createServer((request, response) => {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify(notes))
    })
    const port = 3001
    app.listen(port)
    console.log(`Server running on port ${port}`)

### Express

Implementing our server code directly with Node's built-in http web server is possible. However, it is cumbersome, especially once the application grows in size.

Many libraries have been developed to ease server side development with Node, by offering a more pleasing interface to work with than the built-in http module. By far the most popular library intended for this purpose is [express](http://expressjs.com).

Let's take express into use by defining it as a project dependency with the command:

    npm install express --save

What does the caret in front of the version number in *package.json* mean?

    "express": "^4.17.1"

The caret in the front of *^4.17.1* means, that if and when the dependencies of a project are updated, the version of express that is installed will be at least *4.17.1*. However, the installed version of express can also be one that has a larger *patch* number (the last number), or a larger *minor* number (the middle number). The major version of the library indicated by the first *major* number must be the same.

We can update the dependencies of the project with the command:

    npm update

Likewise, if we start working on the project on another computer, we can install all up-to-date dependencies of the project defined in *package.json* with the command:

    npm install

### Web and express

Let's get back to our application and make the following changes:

    const express = require('express')
    const app = express()

    let notes = [
      ...
    ]

    app.get('/', (req, res) => {
      res.send('<h1>Hello World!</h1>')
    })

    app.get('/api/notes', (req, res) => {
      res.json(notes)
    })

    const PORT = 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

Right at the beginning of our code we're importing *express*, which this time is a *function* that is used to create an express application stored in the *app* variable.

Next, we define two *routes* to the application. The first one defines an event handler, that is used to handle HTTP GET requests made to the application's root:

    app.get('/', (request, response) => {
      response.send('<h1>Hello World!</h1>')
    })

The event handler function accepts two parameters. The first [request](http://expressjs.com/en/4x/api.html#req) parameter contains all of the information of the HTTP request, and the second [response](http://expressjs.com/en/4x/api.html#res) parameter is used to define how the request is responded to.

In our code, the request is answered by using the [send](http://expressjs.com/en/4x/api.html#res.send) method of the *response* object. Calling the method makes the server respond to the HTTP request by sending a response containing the string `<h1>Hello World!</h1>`, that was passed to the *send* method. Since the parameter is a string, express automatically sets the value of the *Content-Type* header to be *text/html*. The status code of the response defaults to 200.

We can verify this from the *Network* tab in developer tools.

The second route defines an event handler, that handles HTTP GET requests made to the *notes* path of the application:

    app.get('/api/notes', (request, response) => {
      response.json(notes)
    })

The request is responded to with the [json](http://expressjs.com/en/4x/api.html#res.json) method of the *response* object. Calling the method will send the **notes** array that was passed to it as a JSON formatted string. Express automatically sets the *Content-Type* header with the appropriate value of *application/json*.

You can start the interactive node-repl by typing in *node* in the command line. The repl is particularly useful for testing how commands work while you're writing application code. I highly recommend this\!

### nodemon

If we make changes to the application's code we have to restart the application in order to see the changes. Compared to the convenient workflow in React where the browser automatically reloaded after changes were made, this feels slightly cumbersome.

The solution to this problem is [nodemon](https://github.com/remy/nodemon):

> nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Let's install nodemon by defining it as a *development dependency* with the command:

    npm install --save-dev nodemon

We can start our application with *nodemon* like this:

    node_modules/.bin/nodemon index.js

It's worth noting, that even though the backend server restarts automatically, the browser still has to be manually refreshed. This is because unlike when working in React, we could not even have the [hot reload](https://gaearon.github.io/react-hot-loader/getstarted/) functionality needed to automatically reload the browser.

The command is long and quite unpleasant, so let's define a dedicated *npm script* for it in the *package.json* file:

    {
      // ..
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ..
    }

In the script there is no need to specify the `node_modules/.bin/nodemon` path to nodemon, because *npm* automatically knows to search for the file from that directory.

We can now start the server in the development mode with the command:

    npm run dev

Unlike with the *start* and *test* scripts, we also have to add *run* to the command.

### REST

Let's expand our application so that it provides the RESTful HTTP API as [json-server](https://github.com/typicode/json-server#routes).

Representational State Transfer, aka. REST was introduced in 2000 in Roy Fielding's [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). REST is an architectural style meant for building scalable web applications.

We are not going to dig into Fielding's definition of REST or spend time pondering about what is and isn't RESTful. Instead, we take a more [narrow view](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_Web_services) by only concerning ourselves with how RESTful API's are typically understood in web applications. The original definition of REST is in fact not even limited to web applications.

We mentioned in the [previous part](/en/part2/altering_data_in_server#rest) that singular things, like notes in the case of our application, are called *resources* in RESTful thinking. Every resource has an associated URL which is the resource's unique address.

One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier.

Let's assume that the root URL of our service is *www.example.com/api*.

If we define the resource type of notes to be *note*, then the address of a note resource with the identifier 10, has the unique address *www.example.com/api/notes/10*.

The URL for the entire collection of all note resources is *www.example.com/api/notes*.

We can execute different operations on resources. The operation to be executed is defined by the HTTP *verb*:

| URL      | verb   | functionality                                                    |
| -------- | ------ | ---------------------------------------------------------------- |
| notes/10 | GET    | fetches a single resource                                        |
| notes    | GET    | fetches all resources in the collection                          |
| notes    | POST   | creates a new resource based on the request data                 |
| notes/10 | DELETE | removes the identified resource                                  |
| notes/10 | PUT    | replaces the entire identified resource with the request data    |
| notes/10 | PATCH  | replaces a part of the identified resource with the request data |
|          |        |                                                                  |

This is how we manage to roughly define what REST refers to as a [uniform interface](https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints), which means a consistent way of defining interfaces that makes it possible for systems to co-operate.

This way of interpreting REST falls under the [second level of RESTful maturity](https://martinfowler.com/articles/richardsonMaturityModel.html) in the Richardson Maturity Model. According to the definition provided by Roy Fielding, we have not actually defined a [REST API](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven). In fact, a large majority of the world's purported "REST" API's do not meet Fielding's original criteria outlined in his dissertation.

In some places (see e.g. [Richardson, Ruby: RESTful Web Services](http://shop.oreilly.com/product/9780596529260.do)) you will see our model for a straightforward [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) API, being referred to as an example of [resource oriented architecture](https://en.wikipedia.org/wiki/Resource-oriented_architecture) instead of REST. We will avoid getting stuck arguing semantics and instead return to working on our application.

### Fetching a single resource

Let's expand our application so that it offers a REST interface for operating on individual notes. First let's create a [route](http://expressjs.com/en/guide/routing.html) for fetching a single resource.

The unique address we will use for an individual note is of the form *notes/10*.

We can define [parameters](http://expressjs.com/en/guide/routing.html#route-parameters) for routes in express by using the colon syntax:

    app.get('/api/notes/:id', (request, response) => {
      const id = request.params.id
      const note = notes.find(note => note.id === id)
      response.json(note)
    })

Now `app.get('/api/notes/:id', ...)` will handle all HTTP GET requests, that are of the form */api/notes/SOMETHING*, where *SOMETHING* is an arbitrary string.

When we test our application by going to <http://localhost:3001/api/notes/1> in our browser, we notice that it does not appear to work, as the browser displays an empty page. It's time to debug.

    app.get('/api/notes/:id', (request, response) => {
      const id = request.params.id
      console.log(id)
      const note = notes.find(note => note.id === id)
      console.log(note)
      response.json(note)
    })

When we visit <http://localhost:3001/api/notes/1> again in the browser, the console which is the terminal in this case, will display the following:

    Server running on port 3001
    string
    undefined

To further our investigation, we also add a console log inside the comparison function passed to the *find* method.

    app.get('/api/notes/:id', (request, response) => {
      const id = request.params.id
      const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
      })
      console.log(note)
      response.json(note)
    })

When we visit the URL again in the browser, each call to the comparison function prints a few different things to the console. The console output is the following:

```

1 'number' '1' 'string' false
2 'number' '1' 'string' false
3 'number' '1' 'string' false
```

!!The `id` variable contains a string '1', whereas the id's of notes are integers. In JavaScript, the "triple equals" comparison === considers all values of different types to not be equal by default.

Let's fix the issue by changing the id parameter from a string into a [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number):

    app.get('/api/notes/:id', (request, response) => {
      const id = Number(request.params.id)
      const note = notes.find(note => note.id === id)
      response.json(note)
    })

However, there's another problem with our application.

If we search for a note with an id that does not exist, the server responds with a status code 200, which means that the response succeeded. There is no data sent back with the response, since the value of the *content-length* header is 0, and the same can be verified from the browser.

The reason for this behavior is that the *note* variable is set to *undefined* if no matching note is found. The situation needs to be handled on the server in a better way. If no note is found, the server should respond with the status code [404 not found](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) instead of 200.

Let's make the following change to our code:

    app.get('/api/notes/:id', (request, response) => {
        const id = Number(request.params.id)
        const note = notes.find(note => note.id === id)

        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })

Since no data is attached to the response, we use the [status](http://expressjs.com/en/4x/api.html#res.status) method for setting the status, and the [end](http://expressjs.com/en/4x/api.html#res.end) method for responding to the request without sending any data.

The if-condition leverages the fact that all JavaScript objects are [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), meaning that they evaluate to true in a comparison operation. However, *undefined* is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) meaning that it will evaluate to false.

Our application works and sends the error status code if no note is found. However, the application doesn't return anything to show to the user, like web applications normally do when we visit a page that does not exist. We do not actually need to display anything in the browser because REST API's are interfaces that are intended for programmatic use, and the error status code is all that is needed.

### Deleting resources

Next let's implement a route for deleting resources.

    app.delete('/api/notes/:id', (request, response) => {
      const id = Number(request.params.id)
      notes = notes.filter(note => note.id !== id)

      response.status(204).end()
    })

If deleting the resource is successful, meaning that the note exists and it is removed, we respond to the request with the status code [204 no content](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.5) and return no data with the response.

There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. Really, the only two options are 204 and 404. For the sake of simplicity our application will respond with 204 in both cases.

### Postman

So how do we test the delete operation? We could write some JavaScript for testing deletion, but writing test code is not always the best solution in every situation.

Many tools exist for making the testing of backends easier. One of these is the command line program [curl](https://curl.haxx.se) that was mentioned briefly in the previous part of the material.

Instead of curl, we will take a look at using [Postman](https://www.getpostman.com/) for testing the application.

Using Postman is quite easy in this situation. It's enough to define the url and then select the correct request type (DELETE).

The backend server appears to respond correctly. By making an HTTP GET request to <http://localhost:3001/api/notes> we see that the note with the id 2 is no longer in the list, which indicates that the deletion was successful.

### The Visual Studio Code REST client

If you use Visual Studio Code, you can use the VS Code [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin instead of Postman.

Once the plugin is installed, using it is very simple. We make a directory at the root of application named *requests*. We save all the REST client requests in the directory as files that end with the *.rest* extension.

Let's create a new `get_all__notes.rest` file and define the request that fetches all notes.

By clicking the *Send Request* text, the REST client will execute the HTTP request and response from the server is opened in the editor.

### Receiving data

Next, let's make it possible to add new notes to the server. Adding a note happens by making an HTTP POST request to the address <http://localhost:3001/api/notes>, and by sending all the information for the new note in the request [body](https://www.w3.org/Protocols/rfc2616/rfc2616-sec7.html#sec7) in the JSON format.

In order to access the data easily, we need the help of the express [json-parser](https://expressjs.com/en/api.html), that is taken to use with command `app.use(express.json())`.

Let's activate the json-parser and implement an initial handler for dealing with the HTTP POST requests:

    const express = require('express')
    const app = express()

    app.use(express.json())

    //...

    app.post('/api/notes', (request, response) => {
      const note = request.body
      console.log(note)

      response.json(note)
    })

The event handler function can access the data from the *body* property of the *request* object.

Without the json-parser, the *body* property would be undefined. The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the *body* property of the *request* object before the route handler is called.

Before we implement the rest of the application logic, let's verify with Postman that the data is actually received by the server. In addition to defining the URL and request type in Postman, we also have to define the data sent in the *body*.

**NB** *Keep the terminal running the application visible at all times* when you are working on the backend. Thanks to Nodemon any changes we make to the code will restart the application. If you pay attention to the console, you will immediately be able to pick up on errors that occur in the application.

Similarly, it is useful to check the console for making sure that the backend behaves like we expect it to in different situations, like when we send data with an HTTP POST request. Naturally, it's a good idea to add lots of *console.log* commands to the code while the application is still being developed.

A potential cause for issues is an incorrectly set *Content-Type* header in requests. This can happen with Postman if the type of body is not defined correctly.

The *Content-Type* header is set to *text/plain*.

The server appears to only receive an empty object:

    {}

The server will not be able to parse the data correctly without the correct value in the header. It won't even try to guess the format of the data, since there's a [massive amount](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of potential *Content-Types*.

If you are using VS Code, then you should install the REST client from the previous chapter *now, if you haven't already*. The POST request can be sent with the REST client like this:

    POST http://localhost:3001/api/notes
    Content-type: application/json

    {
        "content": "VS Code REST client",
        "important": false
    }

One benefit that the REST client has over Postman is that the requests are handily available at the root of the project repository, and they can be distributed to everyone in the development team. Postman also allows users to save requests, but the situation can get quite chaotic especially when you're working on multiple unrelated projects.

> **Important sidenote**
>
> Sometimes when you're debugging, you may want to find out what headers have been set in the HTTP request. One way of accomplishing this is through the [get](http://expressjs.com/en/4x/api.html#req.get) method of the *request* object, that can be used for getting the value of a single header. The *request* object also has the *headers* property, that contains all of the headers of a specific request.

> Problems can occur with the VS REST client if you accidentally add an empty line between the top row and the row specifying the HTTP headers. In this situation, the REST client interprets this to mean that all headers are left empty, which leads to the backend server not knowing that the data it has received is in the JSON format.

You will be able to spot this missing *Content-Type* header if at some point in your code you print all of the request headers with the *console.log(request.headers)* command.

Let's return to the application. Once we know that the application receives data correctly, it's time to finalize the handling of the request:

    app.post('/api/notes', (request, response) => {
      const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

      const note = request.body
      note.id = maxId + 1

      notes = notes.concat(note)

      response.json(note)
    })

We need a unique id for the note. First, we find out the largest id number in the current list and assign it to the *maxId* variable. The id of the new note is then defined as *maxId + 1*. This method is in fact not recommended, but we will live with it for now as we will replace it soon enough.

The current version still has the problem that the HTTP POST request can be used to add objects with arbitrary properties. Let's improve the application by defining that the *content* property may not be empty. The *important* and *date* properties will be given default values. All other properties are discarded:

    const generateId = () => {
      const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
      return maxId + 1
    }

    app.post('/api/notes', (request, response) => {
      const body = request.body

      if (!body.content) {
        return response.status(400).json({
          error: 'content missing'
        })
      }

      const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
      }

      notes = notes.concat(note)

      response.json(note)
    })

If the received data is missing a value for the *content* property, the server will respond to the request with the status code [400 bad request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1).

As mentioned previously, it is better to generate timestamps on the server than in the browser, since we can't trust that host machine running the browser has its clock set correctly. The generation of the *date* property is now done by the server.

The function for generating IDs looks currently like this:

    const generateId = () => {
      const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
      return maxId + 1
    }

The function body contains a row that looks a bit intriguing:

    Math.max(...notes.map(n => n.id))

What exactly is happening in that line of code? It creates a new array that contains all the id's of the notes. [Math.max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) returns the maximum value of the numbers that are passed to it. However, *notes.map(n =\> n.id)* is an *array* so it can't directly be given as a parameter to *Math.max*. The array can be transformed into individual numbers by using the "three dot" [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax *...*.

### About HTTP request types

[The HTTP standard](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) talks about two properties related to request types, **safety** and **idempotence**.

The HTTP GET request should be *safe*:

> In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".

Safety means that the executing request must not cause any *side effects* in the server. By side-effects we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

Nothing can ever guarantee that a GET request is actually *safe*, this is in fact just a recommendation that is defined in the HTTP standard. By adhering to RESTful principles in our API, GET requests are in fact always used in a way that they are *safe*.

The HTTP standard also defines the request type [HEAD](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.4), that ought to be safe. In practice HEAD should work exactly like GET but it does not return anything but the status code and response headers. The response body will not be returned when you make a HEAD request.

All HTTP requests except POST should be *idempotent*:

> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N \> 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

This means that if a request has side-effects, then the result should be same regardless of how many times the request is sent.

If we make an HTTP PUT request to the url */api/notes/10* and with the request we send the data *{ content: "no side effects\!", important: true }*, the result is the same regardless of many times the request is sent.

Like *safety* for the GET request, *idempotence* is also just a recommendation in the HTTP standard and not something that can be guaranteed simply based on the request type. However, when our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in such a way that they are idempotent.

POST is the only HTTP request type that is neither *safe* nor *idempotent*. If we send 5 different HTTP POST requests to */api/notes* with a body of *{content: "many same", important: true}*, the resulting 5 notes on the server will all have the same content.

### Middleware

The express [json-parser](https://expressjs.com/en/api.html) we took into use earlier is a so-called [middleware](http://expressjs.com/en/guide/using-middleware.html).

Middleware are functions that can be used for handling *request* and *response* objects.

The json-parser we used earlier takes the raw data from the requests that's stored in the *request* object, parses it into a JavaScript object and assigns it to the *request* object as a new property *body*.

In practice, you can use several middleware at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.

Let's implement our own middleware that prints information about every request that is sent to the server.

Middleware is a function that receives three parameters:

    const requestLogger = (request, response, next) => {
      console.log('Method:', request.method)
      console.log('Path:  ', request.path)
      console.log('Body:  ', request.body)
      console.log('---')
      next()
    }

At the end of the function body the *next* function that was passed as a parameter is called. The *next* function yields control to the next middleware.

Middleware are taken into use like this:

    app.use(requestLogger)

Middleware functions are called in the order that they're taken into use with the express server object's *use* method. Notice that json-parser is taken into use before the *requestLogger* middleware, because otherwise *request.body* will not be initialized when the logger is executed\!

Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called. There are also situations where we want to define middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request.

Let's add the following middleware after our routes, that is used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    app.use(unknownEndpoint)

## Deploying app to internet

Next let's connect the frontend we made in [part 2](/en/part2) to our own backend.

In the previous part, the frontend could ask for the list of notes from the json-server we had as a backend at from the address <http://localhost:3001/notes>. Our backend has a bit different url structure, and the notes can be found from http//localhost:3001/api/notes. Let's change the attribute **baseUrl** in the *src/services/notes.js* like so:

    import axios from 'axios'
    const baseUrl = 'http://localhost:3001/api/notes'
    const getAll = () => {
      const request = axios.get(baseUrl)
      return request.then(response => response.data)
    }

    // ...

    export default { getAll, create, update }

Now frontend's GET request to <http://localhost:3001/api/notes> does not work for some reason:

> Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ...

What's going on here? We can access the backend from a browser and from postman without any problems.

### Same origin policy and CORS

The issue lies with a thing called CORS, or Cross-Origin Resource Sharing.

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

In our context the problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same [origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). Because our server is in localhost port 3001, and our frontend in localhost port 3000, they do not have the same origin.

We can allow requests from other *origins* by using Node's [cors](https://github.com/expressjs/cors) middleware. Install *cors* with the command

    npm install cors --save

take the middleware to use and allow for requests from all origins:

    const cors = require('cors')

    app.use(cors())

And the frontend works\! However, the functionality for changing the importance of notes has not yet been implemented to the backend.

You can read more about CORS from [Mozillas page](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

### Application to the Internet

Now that the whole stack is ready, let's move our application to the internet. We'll use good old [Heroku](https://www.heroku.com) for this.

> If you have never used Heroku before, you can find instructions from [Heroku documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs) or by Googling.

Add a file called *Procfile* to the project's root to tell Heroku how to start the application.

    web: node index.js

Change the definition of the port our application uses at the bottom of the *index.js* file like so:

    const PORT = process.env.PORT || 3001

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

Now we are using the port defined in environment variable *PORT*. Heroku configures application port based on the environment variable.

Create a Git repository in the project directory, and add *.gitignore* with the following contents

    node_modules

Create a Heroku application with the command *heroku create*, create a Git repository in the application directory, commit the code and move it to Heroku with command *git push heroku master*.

If everything went well, the application works. If not, the issue can be found by reading heroku logs with command *heroku logs*.

> **NB** At least in the beginning it's good to keep an eye on the heroku logs at all times. The best way to do this is with command *heroku logs -t* which prints the logs to console whenever something happens on the server.

The frontend also works with the backend on Heroku. You can check this by changing the backend's address on the frontend to be the backend's address in Heroku instead of `<http://localhost:3001>`.

The next question is, how do we deploy the frontend to the Internet? We have multiple options. Let's go through one of them next.

### Frontend production build

So far we have been running React code in *development mode*. In development mode the application is configured to give clear error messages, immediately render code changes to the browser, and so on.

When the application is deployed, we must create a [production build](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) or a version of the application which is optimized for production.

A production build of applications created with *create-react-app* can be created with command [npm run build](https://github.com/facebookincubator/create-react-app#npm-run-build-or-yarn-build).

Let's run this command from the *root of the frontend project*.

This creates a directory called *build* (which contains the only HTML file of our application, *index.html* ) which contains the directory *static*. [Minified](https://en.wikipedia.org/wiki/Minification_\(programming\)) version of our application's JavaScript code will be generated to the *static* directory. Even though the application code is in multiple files, all of the JavaScript will be minified into one file. Actually all of the code from all of the application's dependencies will also be minified into this single file.

The minified code is not very readable. The beginning of the code looks like this:

    !function(e){function r(r){for(var n,f,i=r[0],l=r[1],a=r[2],c=0,s=[];c<i.length;c++)f=i[c],o[f]&&s.push(o[f][0]),o[f]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(p&&p(r);s.length;)s.shift()();return u.push.apply(u,a||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,i=1;i<t.length;i++){var l=t[i];0!==o[l]&&(n=!1)}n&&(u.splice(r--,1),e=f(f.s=t[0]))}return e}var n={},o={2:0},u=[];function f(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,f),t.l=!0,t.exports}f.m=e,f.c=n,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})

### Serving static files from the backend

One option for deploying the frontend is to copy the production build (the *build* directory) to the root of the backend repository and configure the backend to show the frontend's *main page* (the file *build/index.html*) as its main page.

We begin by copying the production build of the frontend to the root of the backend. With my computer the copying can be done from the frontend directory with the command

    cp -r build ../../../osa3/notes-backend

To make express show *static content*, the page *index.html* and the JavaScript etc. it fetches, we need a built-in middleware from express called [static](http://expressjs.com/en/starter/static-files.html).

When we add the following amidst the declarations of middlewares

    app.use(express.static('build'))

whenever express gets an HTTP GET request it will first check if the *build* directory contains a file corresponding to the request's address. If a correct file is found, express will return it.

Now HTTP GET requests to the address *www.serversaddress.com/index.html* or *www.serversaddress.com* will show the React frontend. GET requests to the address *www.serversaddress.com/notes* will be handled by the backend's code.

Because on our situation, both the frontend and the backend are at the same address, we can declare *baseUrl* as a [relative](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2) URL. This means we can leave out the part declaring the server.

    import axios from 'axios'
    const baseUrl = '/api/notes'
    const getAll = () => {
      const request = axios.get(baseUrl)
      return request.then(response => response.data)
    }

    // ...

After the change, we have to create a new production build and copy it to the root of the backend repository.

The application can now be used from the *backend* address <http://localhost:3001>.

When we use a browser to go to the address <http://localhost:3001>, the server returns the *index.html* file from the *build* repository. Summarized contents of the file are as follows:

    <head>
      <meta charset="utf-8"/>
      <title>React App</title>
      <link href="/static/css/main.f9a47af2.chunk.css" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
      <script src="/static/js/1.578f4ea1.chunk.js"></script>
      <script src="/static/js/main.104ca08d.chunk.js"></script>
    </body>
    </html>

The file contains instructions to fetch a CSS stylesheet defining the styles of the application, and two *script* tags which instruct the browser to fetch the JavaScript code of the application - the actual React application.

The React code fetches notes from the server address <http://localhost:3001/api/notes> and renders them to the screen. The communications between the server and the browser can be seen in the *Network* tab of the developer console.

After ensuring that the production version of the application works locally, commit the production build of the frontend to the backend repository, and push the code to Heroku again.

### Streamlining deploying of the frontend

To create a new production build of the frontend without extra manual work, let's add some npm-scripts to the *package.json* of the backend repository:

    {
      "scripts": {
        //...
        "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
        "deploy": "git push heroku master",
        "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",
        "logs:prod": "heroku logs --tail"
      }
    }

The script *npm run build:ui* builds the frontend and copies the production version under the backend repository. *npm run deploy* releases the current backend to heroku.

*npm run deploy:full* combines these two and contains the necessary *git* commands to update the backend repository.

There is also a script *npm run logs:prod* to show the heroku logs.

### Proxy

Changes on the frontend have caused it to no longer work in development mode (when started with command *npm start*), as the connection to the backend does not work.

![fullstack content](/static/19026b5379d1feef11ecc20ca2f669a9/14be6/32ea.png)

This is due to changing the backend address to a relative URL:

    const baseUrl = '/api/notes'

Because in development mode the frontend is at the address *localhost:3000*, the requests to the backend go to the wrong address *localhost:3000/api/notes*. The backend is at *localhost:3001*.

If the project was created with create-react-app, this problem is easy to solve. It is enough to add the following declaration to the *package.json* file of the frontend repository.

    {
      "dependencies": {
        // ...
      },
      "scripts": {
        // ...
      },
      "proxy": "http://localhost:3001"
    }

After a restart, the React development environment will work as a [proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/). If the React code does an HTTP request to a server address at *<http://localhost:3000>* not managed by the React application itself (i.e when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at *<http://localhost:3001>*.

A negative aspect of our approach is how complicated it is to deploy the frontend. Deploying a new version requires generating new production build of the frontend and copying it to the backend repository. This makes creating an automated [deployment pipeline](https://martinfowler.com/bliki/DeploymentPipeline.html) more difficult. Deployment pipeline means an automated and controlled way to move the code from the computer of the developer through different tests and quality checks to the production environment.

There are multiple ways to achieve this (for example placing both backend and frontend code [to the same repository](https://github.com/mars/heroku-cra-node)).

In some situations it may be sensible to deploy the frontend code as it's own application. With apps created with create-react-app it is [straightforward](https://github.com/mars/create-react-app-buildpack).

## Saving data to MongoDB

### Debugging Node applications

Debugging Node applications is slightly more difficult than debugging JavaScript running in your browser. Printing to the console is a tried and true method, and it's always worth doing.

#### Chrome dev tools

Debugging is also possible with the Chrome developer console by starting your application with the command:

    node --inspect index.js

You can access the debugger by clicking the green icon that appears in the Chrome developer console.

The debugging view works the same way as it did with React applications. The *Sources* tab can be used for setting breakpoints where the execution of the code will be paused.

All of the application's console.log messages will appear in the *Console* tab of the debugger. You can also inspect values of variables and execute your own JavaScript code.

#### Question everything

The key is to be systematic. Since the problem can exist anywhere, *you must question everything*, and eliminate all possibilities one by one. Logging to the console, Postman, debuggers, and experience will help.

When bugs occur, *the worst of all possible strategies* is to continue writing code. It will guarantee that your code will soon have ten more bugs, and debugging them will be even more difficult. The [stop and fix](http://gettingtolean.com/toyota-principle-5-build-culture-stopping-fix/#.Wjv9axP1WCQ) principle from Toyota Production Systems is very effective in this situation as well.

### MongoDB

fullstack:Lithos521

Naturally, you can install and run MongoDB on your own computer. However, the internet is also full of Mongo database services that you can use. Our preferred MongoDB provider in this course will be [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

Once you've created and logged into your account, Atlas will recommend creating a cluster. Let's choose *AWS* and *Frankfurt* and create a cluster.

We could use the database directly from our JavaScript code with the [official MongoDb Node.js driver](https://mongodb.github.io/node-mongodb-native/) library, but it is quite cumbersome to use. We will instead use the [Mongoose](http://mongoosejs.com/index.html) library that offers a higher level API.

Mongoose could be described as an *object document mapper* (ODM), and saving JavaScript objects as Mongo documents is straightforward with the library.

Let's install Mongoose:

    npm install mongoose --save

Let's not add any code dealing with Mongo to our backend just yet. Instead, let's make a practice application into the file *mongo.js*:

    const mongoose = require('mongoose')

    if ( process.argv.length<3 ) {
      console.log('give password as argument')
      process.exit(1)
    }

    const password = process.argv[2]

    const url =
      `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const noteSchema = new mongoose.Schema({
      content: String,
      date: Date,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

    note.save().then(response => {
      console.log('note saved!')
      mongoose.connection.close()
    })

When the code is run with the command `node mongo.js password`, Mongo will add a new document to the database.

Let's destroy the *test* database. Let's change the name of database to *note-app* instead, by modifying the URI:

    mongodb+srv://fullstack:<PASSWORD>@cluster0-ostce.mongodb.net/note-app?retryWrites=true

Let's run our code again. The data is now stored in the right database. The view also offers the *create database* functionality, that can be used to create new databases from the website. Creating the database like this is not necessary, since MongoDB Atlas automatically creates a new database when an application tries to connect to a database that does not exist yet.

### Schema

After establishing the connection to the database, we define the [schema](http://mongoosejs.com/docs/guide.html) for a note and the matching [model](http://mongoosejs.com/docs/models.html):

    const noteSchema = new mongoose.Schema({
      content: String,
      date: Date,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

First we define the [schema](http://mongoosejs.com/docs/guide.html) of a note that is stored in the *noteSchema* variable. The schema tells Mongoose how the note objects are to be stored in the database.

In the *Note* model definition, the first *"Note"* parameter is the singular name of the model. The name of the collection will be the lowercased plural *notes*, because the [Mongoose convention](http://mongoosejs.com/docs/models.html) is to automatically name collections as the plural (e.g. *notes*) when the schema refers to them in the singular (e.g. *Note*).

Document databases like Mongo are *schemaless*, meaning that the database itself does not care about the structure of the data that is stored in the database. It is possible to store documents with completely different fields in the same collection.

The idea behind Mongoose is that the data stored in the database is given a *schema at the level of the application* that defines the shape of the documents stored in any given collection.

### Creating and saving objects

Next, the application creates a new note object with the help of the *Note* [model](http://mongoosejs.com/docs/models.html):

    const note = new Note({
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: false,
    })

Models are so-called *constructor functions* that create new JavaScript objects based on the provided parameters. Since the objects are created with the model's constructor function, they have all the properties of the model, which include methods for saving the object to the database.

Saving the object to the database happens with the appropriately named *save* method, that can be provided with an event handler with the *then* method:

    note.save().then(result => {
      console.log('note saved!')
      mongoose.connection.close()
    })

The event handler closes the database connection with the command `mongoose.connection.close()`. If the connection is not closed, the program will never finish its execution.

Let's also save a few more notes by modifying the data in the code and by executing the program again.

**NB** unfortunately the Mongoose documentation uses callbacks in its examples, so it is not recommended to copy paste code directly from there. Mixing promises with old-school callbacks in the same code is not recommended.

### Fetching objects from the database

Let's comment out the code for generating new notes and replace it with the following:

    Note.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    })

The objects are retrieved from the database with the [find](https://mongoosejs.com/docs/api.html#model_Model.find) method of the *Note* model. The parameter of the method is an object expressing search conditions. Since the parameter is an empty object`{}`, we get all of the notes stored in the *notes* collection.

The search conditions adhere to the Mongo search query [syntax](https://docs.mongodb.com/manual/reference/operator/).

We could restrict our search to only include important notes like this:

    Note.find({ important: true }).then(result => {
      // ...
    })

### Backend connected to a database

Now we have enough knowledge to start using Mongo in our application.

Let's get a quick start by copy pasting the Mongoose definitions to the *index.js* file:

    const mongoose = require('mongoose')

    // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
    const url =
      'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const noteSchema = new mongoose.Schema({
      content: String,
      date: Date,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

Let's change the handler for fetching all notes into the following form:

    app.get('/api/notes', (request, response) => {
      Note.find({}).then(notes => {
        response.json(notes)
      })
    })

The application works almost perfectly. The frontend assumes that every object has a unique id in the `id` field. We also don't want to return the mongo versioning field `__v` to the frontend.

One way to format the objects returned by Mongoose is to [modify](https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id) the *toJSON* method of the objects. Modifying the method happens like this:

    noteSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })

Even though the `_id` property of Mongoose objects looks like a string, it is in fact an object. The `toJSON` method we defined transforms it into a string just to be safe. If we didn't make this change, it would cause more harm for us in the future once we start writing tests.

Let's respond to the HTTP request with a list of objects formatted with the `toJSON` method:

    app.get('/api/notes', (request, response) => {
      Note.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
      });
    });

### Database configuration into its own module

Before we refactor the rest of the backend to use the database, let's extract the Mongoose specific code into its own module.

Let's create a new directory for the module called *models*, and add a file called *note.js*:

    const mongoose = require('mongoose')

    const url = process.env.MONGODB_URI
    console.log('connecting to', url)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(result => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })
    const noteSchema = new mongoose.Schema({
      content: String,
      date: Date,
      important: Boolean,
    })

    noteSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })

    module.exports = mongoose.model('Note', noteSchema)

Defining Node [modules](https://nodejs.org/docs/latest-v8.x/api/modules.html) differs slightly from the way of defining [ES6 modules](/en/part2/rendering_a_collection_modules#refactoring-modules) in part 2.

The public interface of the module is defined by setting a value to the `module.exports` variable. We will set the value to be the `Note` model. The other things defined inside of the module, like the variables *mongoose* and *url* will not be accessible or visible to users of the module.

Importing the module happens by adding the following line to *index.js*:

    const Note = require('./models/note')

This way the *Note* variable will be assigned to the same object that the module defines.

There are many ways to define the value of an environment variable. One way would be to define it when the application is started:

    MONGODB_URI=<address_here> npm run watch

A more sophisticated way is to use the [dotenv](https://github.com/motdotla/dotenv#readme) library. You can install the library with the command:

    npm install dotenv --save

To use the library, we create a *.env* file at the root of the project. The environment variables are defined inside of the file, and it can look like this:

    MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
    PORT=3001

**The *.env* file should be gitignored right away, since we do not want to publish any confidential information publicly online\!**

The environment variables defined in the dotenv file can be taken into use with the command `require('dotenv').config()` and you can reference them in your code just like you would reference normal environment variables, with the familiar *process.env.MONGODB\_URI* syntax.

Let's change the *index.js* file in the following way:

    require('dotenv').config()
    const express = require('express')
    const app = express()
    const Note = require('./models/note')
    // ..

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

It's important that *dotenv* gets imported before the *note* model is imported. This ensures that the environment variables from the *.env* file are available globally before the code from the other modules are imported.

### Using database in route handlers

Next, let's change the rest of the backend functionality to use the database.

Creating a new note is accomplished like this:

    app.post('/api/notes', (request, response) => {
      const body = request.body

      if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
      }

      const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
      })

      note.save().then(savedNote => {
        response.json(savedNote.toJSON())
      })
    })

The note objects are created with the *Note* constructor function. The response for the request is sent inside of the callback function for the *save* operation. This ensures that the response is sent only if the operation succeeded. We will discuss error handling a little bit later.

Fetching an individual note gets changed into the following:

    app.get('/api/notes/:id', (request, response) => {
      Note.findById(request.params.id).then(note => {
        response.json(note.toJSON())
      })
    })

### Verifying frontend and backend integration

Only once everything has been verified to work in the backend, is it a good idea to test that the frontend works with the backend. It is highly inefficient to test things exclusively through the frontend.

It's probably a good idea to integrate the frontend and backend one functionality at a time. First, we could implement fetching all of the notes from the database and test it through the backend endpoint in the browser. After this, we could verify that the frontend works with the new backend. Once everything seems to work, we would move onto the next feature.

Once we introduce a database into the mix, it is useful to inspect the state persisted in the database, e.g. from the control panel in MongoDB Atlas. Quite often little Node helper programs like the *mongo.js* program we wrote earlier can be very helpful during development.

### Error handling

If we try to visit the URL of a note with an id that does not actually exist e.g. <http://localhost:3001/api/notes/5c41c90e84d891c15dfa3431> where *5c41c90e84d891c15dfa3431* is not an id stored in the database, then the browser will simply get "stuck" since the server never responds to the request.

We can see the following error message appear in the logs for the backend:

> (node:13596) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)

The request has failed and the associated Promise has been *rejected*. Since we don't handle the rejection of the promise, the request never gets a response. In part 2, we already acquainted ourselves with [handling errors in promises](/en/part2/altering_data_in_server#promises-and-errors).

Let's add a simple error handler:

    app.get('/api/notes/:id', (request, response) => {
      Note.findById(request.params.id)
        .then(note => {
          response.json(note.toJSON())
        })
        .catch(error => {
          console.log(error);
          response.status(404).end()
        })
    })

There's actually two different types of error situations. In one of those situations, we are trying to fetch a note with a wrong kind of *id*, meaning an *id* that doesn't match the mongo identifier format.

If we make the following request, we will get the error message shown below:

```

Method: GET
Path:   /api/notes/5a3b7c3c31d61cb9f8a0343
Body:   {}
---
{ CastError: Cast to ObjectId failed for value "5a3b7c3c31d61cb9f8a0343" at path "_id"
    at CastError (/Users/mluukkai/opetus/_fullstack/osa3-muisiinpanot/node_modules/mongoose/lib/error/cast.js:27:11)
    at ObjectId.cast (/Users/mluukkai/opetus/_fullstack/osa3-muisiinpanot/node_modules/mongoose/lib/schema/objectid.js:158:13)
    ...
```

The other error situation happens when the id is in the correct format, but no note is found in the database for that id.

```

Method: GET
Path:   /api/notes/5a3b7c3c31d61cbd9f8a0343
Body:   {}
---
TypeError: Cannot read property 'toJSON' of null
    at Note.findById.then.note (/Users/mluukkai/opetus/_2019fullstack-koodit/osa3/notes-backend/index.js:27:24)
    at process._tickCallback (internal/process/next_tick.js:178:7)
```

We should distinguish between these two different types of error situations. The latter is in fact an error caused by our own code.

Let's change the code in the following way:

    app.get('/api/notes/:id', (request, response) => {
      Note.findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(note.toJSON())
            } else {
            response.status(404).end()
            }
            })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'malformatted id' })    })
    })

If no matching object is found in the database, the value of *note* will be undefined and the *else* block is executed. This results in a response with the status code *404 not found*.

If the format of the id is incorrect, then we will end up in the error handler defined in the *catch* block. The appropriate status code for the situation is [400 bad request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1), because the situation fits the description perfectly:

> *The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.*

When dealing with Promises, it's almost always a good idea to add error and exception handling, because otherwise you will find yourself dealing with strange bugs.

It's never a bad idea to print the object that caused the exception to the console in the error handler:

    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })

The reason the error handler gets called might be something completely different than what you had anticipated. If you log the error to the console, you may save yourself from long and frustrating debugging sessions.

Every time you're working on a project with a backend, *it is critical to keep an eye on the console output of the backend*. If you are working on a small screen, it is enough to just see a tiny slice of the output in the background. Any error messages will catch your attention even when the console is far back in the background.

### Moving error handling into middleware

We have written the code for the error handler among the rest of our code. This can be a reasonable solution at times, but there are cases where it is better to implement all error handling in a single place. This can be particularly useful if we later on want to report data related to errors to an external error tracking system like [Sentry](https://sentry.io/welcome/).

Let's change the handler for the */api/notes/:id* route, so that it passes the error forward with the *next* function. The next function is passed to the handler as the third parameter:

    app.get('/api/notes/:id', (request, response, next) => {
        Note.findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(note.toJSON())
          } else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
    })

The error that is passed forwards is given to the *next* function as a parameter. If *next* was called without a parameter, then the execution would simply move onto the next route or middleware. If the *next* function is called with a parameter, then the execution will continue to the *error handler middleware*.

Express [error handlers](https://expressjs.com/en/guide/error-handling.html) are middleware that are defined with a function that accepts *four parameters*. Our error handler looks like this:

    const errorHandler = (error, request, response, next) => {
      console.error(error.message)

      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      }

      next(error)
    }

    app.use(errorHandler)

The error handler checks if the error is a *CastError* exception, in which case we know that the error was caused by an invalid object id for Mongo. In this situation the error handler will send a response to the browser with the response object passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.

### The order of middleware loading

The execution order of middleware is the same as the order that they are loaded into express with the *app.use* function. For this reason it is important to be careful when defining middleware.

The correct order is the following:

    app.use(express.static('build'))
    app.use(express.json())
    app.use(logger)

    app.post('/api/notes', (request, response) => {
      const body = request.body
      // ...
    })

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    // handler of requests with unknown endpoint
    app.use(unknownEndpoint)

    const errorHandler = (error, request, response, next) => {
      // ...
    }

    // handler of requests with result to errors
    app.use(errorHandler)

The json-parser middleware should be among the very first middleware loaded into Express. If the order was the following:

    app.use(logger) // request.body is empty!

    app.post('/api/notes', (request, response) => {
      // request.body is empty!
      const body = request.body
      // ...
    })

    app.use(express.json())

Then the JSON data sent with the HTTP requests would not be available for the logger middleware or the POST route handler, since the *request.body* would be an empty object.

It's also important that the middleware for handling unsupported routes is next to the last middleware that is loaded into Express, just before the error handler.

For example, the following loading order would cause an issue:

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    // handler of requests with unknown endpoint
    app.use(unknownEndpoint)

    app.get('/api/notes', (request, response) => {
      // ...
    })

Now the handling of unknown endpoints is ordered *before the HTTP request handler*. Since the unknown endpoint handler responds to all requests with *404 unknown endpoint*, no routes or middleware will be called after the response has been sent by unknown endpoint middleware. The only exception to this is the error handler which needs to come at the very end, after the unknown endpoints handler.

### Other operations

The easiest way to delete a note from the database is with the [findByIdAndRemove](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove) method:

    app.delete('/api/notes/:id', (request, response, next) => {
      Note.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => next(error))
    })

In both of the "successful" cases of deleting a resource, the backend responds with the status code *204 no content*. The two different cases are deleting a note that exists, and deleting a note that does not exist in the database. The *result* callback parameter could be used for checking if a resource actually was deleted, and we could use that information for returning different status codes for the two cases if we deemed it necessary. Any exception that occurs is passed onto the error handler.

The toggling of the importance of a note can be easily accomplished with the [findByIdAndUpdate](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) method.

    app.put('/api/notes/:id', (request, response, next) => {
      const body = request.body

      const note = {
        content: body.content,
        important: body.important,
      }

      Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
          response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
    })

In the code above, we also allow the content of the note to be edited. However, we will not support changing the creation date for obvious reasons.

Notice that the *findByIdAndUpdate* method receives a regular JavaScript object as its parameter, and not a new note object created with the *Note* constructor function.

By default, the *updatedNote* parameter of the event handler receives the original document [without the modifications](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate). We added the optional `{ new: true }` parameter, which will cause our event handler to be called with the new modified document instead of the original.

After testing the backend directly with Postman and the VS Code REST client, we can verify that it seems to work. The frontend also appears to work with the backend using the database.

When we toggle the importance of a note, we see the following worrisome error message in the console:

![fullstack content](/static/33dc22598d76bd2f99a715761f13607f/14be6/48.png)

Googling the error message will lead to [instructions](https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate) for fixing the problem. Following [the suggestion in the Mongoose documentation](https://mongoosejs.com/docs/deprecations.html), we add the following line to the *note.js* file:

    const mongoose = require('mongoose')

    mongoose.set('useFindAndModify', false)
    // ...

    module.exports = mongoose.model('Note', noteSchema)

## Validation and ESLint

There are usually constraints that we want to apply to the data that is stored in our application's database. Our application shouldn't accept notes that have a missing or empty *content* property. The validity of the note is checked in the route handler:

    app.post('/api/notes', (request, response) => {
        const body = request.body
        if (body.content === undefined) {
            return response.status(400).json({
                error: 'content missing'
            })
        }
        // ...
    })

One smarter way of validating the format of the data before it is stored in the database, is to use the [validation](https://mongoosejs.com/docs/validation.html) functionality available in Mongoose.

We can define specific validation rules for each field in the schema:

    const noteSchema = new mongoose.Schema({
        content: {
            type: String,
            minlength: 5,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        important: Boolean
    })

The minimum length constraint by default requires the field to not be missing.

The *minlength* and *required* validators are [built-in](https://mongoosejs.com/docs/validation.html#built-in-validators) and provided by Mongoose. The Mongoose [custom validator](https://mongoosejs.com/docs/validation.html#custom-validators) functionality allows us to create new validators, if none of the built-in ones cover our needs.

If we try to store an object in the database that breaks one of the constraints, the operation will throw an exception. Let's change our handler for creating a new note so that it passes any potential exceptions to the error handler middleware:

    app.post('/api/notes', (request, response, next) => {
        const body = request.body

        const note = new Note({
            content: body.content,
            important: body.important || false,
            date: new Date(),
        })

        note.save()
            .then(savedNote => {
                response.json(savedNote.toJSON())
            })
            .catch(error => next(error))
    })

Let's expand the error handler to deal with these validation errors:

    const errorHandler = (error, request, response, next) => {
        console.error(error.message)

        if (error.name === 'CastError') {
            return response.status(400).send({
                error: 'malformatted id'
            })
        } else if (error.name === 'ValidationError') {
            return response.status(400).json({
                error: error.message
            })
        }

        next(error)
    }

When validating an object fails, we return the following default error message from Mongoose:

    {
      "error": "Note validation failed: content: Path `content` (`VS 3`) is shorter than the minimum allowed length (5)."
    }

### Promise chaining

Many of the route handlers changed the response data into the right format by calling the *toJSON* method. When we created a new note, the *toJSON* method was called for the object passed as a parameter to *then*:

    app.post('/api/notes', (request, response, next) => {
      // ...

      note.save()
        .then(savedNote => {
          response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
    })

We can accomplish the same functionality in a much cleaner way with [promise chaining](https://javascript.info/promise-chaining):

    app.post('/api/notes', (request, response, next) => {
        // ...

        note
            .save()
            .then(savedNote => {
                return savedNote.toJSON()
            }).then(savedAndFormattedNote => {
                response.json(savedAndFormattedNote)
            }).catch(error => next(error))
    })

The *then* method of a promise also returns a promise. This means that when we return *savedNote.toJSON()* from the callback function, we are actually creating a promise that receives the formatted note as its value. We can access the formatted note by registering a new callback function with the *then* method.

We can clean up our code even more by using the more compact syntax for arrow functions:

    app.post('/api/notes', (request, response, next) => {
        // ...

        note
            .save()
            .then(savedNote => savedNote.toJSON()).then(savedAndFormattedNote => {
                response.json(savedAndFormattedNote)
            })
            .catch(error => next(error))
    })

In this example, Promise chaining does not provide much of a benefit. The situation would change if there were many asynchronous operations that had to be done in sequence. In the next part of the course we will learn about the *async/await* syntax in JavaScript, that will make writing subsequent asynchronous operations a lot easier.

### Deploying the database backend to production

The application should work almost as-is in Heroku. We do have to generate a new production build of the frontend due to the changes that we have made to our frontend.

The environment variables defined in dotenv will only be used when the backend is not in *production mode*, i.e. Heroku.

We defined the environment variables for development in file *.env*, but the environment variable that defines the database URL in production should be set to Heroku with the *heroku config:set* command.

    heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true

**NB:** if the command causes an error, give the value of `MONGODB_URI` in apostrophes:

    heroku config:set MONGODB_URI='mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true'

The application should now work. Sometimes things don't go according to plan. If there are problems, *heroku logs* will be there to help.

### Lint

In the JavaScript universe, the current leading tool for static analysis aka. "linting" is [ESlint](https://eslint.org/).

Let's install ESlint as a development dependency to the backend project with the command:

    npm install eslint --save-dev

After this we can initialize a default ESlint configuration with the command:

    node_modules/.bin/eslint --init

The configuration will be saved in the *.eslintrc.js* file:

    module.exports = {
        'env': {
            'commonjs': true,
            'es6': true,
            'node': true
        },
        'extends': 'eslint:recommended',
        'globals': {
            'Atomics': 'readonly',
            'SharedArrayBuffer': 'readonly'
        },
        'parserOptions': {
            'ecmaVersion': 2018
        },
        'rules': {
            'indent': [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'never'
            ]
        }
    }

Inspecting and validating a file like *index.js* can be done with the following command:

    node_modules/.bin/eslint index.js

It is recommended to create a separate *npm script* for linting:

    {
      // ...
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        // ...
        "lint": "eslint ."
      },
      // ...
    }

Now the *npm run lint* command will check every file in the project. Also the files in the *build* directory get checked when the command is run. We do not want this to happen, and we can accomplish this by creating an [.eslintignore](https://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories) file in the project's root with the following contents:

    build

This causes the entire *build* directory to not be checked by ESlint.

A better alternative to executing the linter from the command line is to configure a *eslint-plugin* to the editor, that runs the linter continuously. By using the plugin you will see errors in your code immediately. You can find more information about the Visual Studio ESLint plugin [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

ESlint has a vast array of [rules](https://eslint.org/docs/rules/) that are easy to take into use by editing the *.eslintrc.js* file.

Let's add the [eqeqeq](https://eslint.org/docs/rules/eqeqeq) rule that warns us, if equality is checked with anything but the triple equals operator. The rule is added under the *rules* field in the configuration file.

    {
      // ...
      'rules': {
        // ...
       'eqeqeq': 'error',
      },
    }

Let's prevent unnecessary [trailing spaces](https://eslint.org/docs/rules/no-trailing-spaces) at the ends of lines, let's require that [there is always a space before and after curly braces](https://eslint.org/docs/rules/object-curly-spacing), and let's also demand a consistent use of whitespaces in the function parameters of arrow functions.

    {
      // ...
      'rules': {
        // ...
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ]
      },
    }

Our default configuration takes a bunch of predetermined rules into use from *eslint:recommended*:

    'extends': 'eslint:recommended',

This includes a rule that warns about *console.log* commands. [Disabling](https://eslint.org/docs/user-guide/configuring#configuring-rules) a rule can be accomplished by defining its "value" as 0 in the configuration file. Let's do this for the *no-console* rule in the meantime.

    {
        // ...
        'rules': {
            // ...
            'no-console': 0
        },
    }

**NB** when you make changes to the *.eslintrc.js* file, it is recommended to run the linter from the command line. This will verify that the configuration file is correctly formatted. If there is something wrong in your configuration file, the lint plugin can behave quite erratically.

It is not recommended to keep reinventing the wheel over and over again, and it can be a good idea to adopt a ready-made configuration from someone else's project into yours. Recently many projects have adopted the Airbnb [Javascript style guide](https://github.com/airbnb/javascript) by taking Airbnb's [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration into use.

# Part 4: Testing Express servers, user administration

## Structure of backend application, introduction to testing

### Project structure

Before we move into the topic of testing, we will modify the structure of our project to adhere to Node.js best practices.

After making the changes to the directory structure of our project, we end up with the following structure:

```
├── index.js
├── app.js
├── build
│   ├── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```

So far we have been using *console.log* and *console.error* to print different information from the code. However, this is not a very good way to do things. Let's separate all printing to the console to it's own module *utils/logger.js*:

    const info = (...params) => {
      console.log(...params)
    }

    const error = (...params) => {
      console.error(...params)
    }

    module.exports = {
      info, error
    }

Extracting logging into its own module is a good idea in more ways than one. If we wanted to start writing logs to a file or send them to an external logging service like [graylog](https://www.graylog.org/) or [papertrail](https://papertrailapp.com) we would only have to make changes in one place.

The contents of the *index.js* file used for starting the application gets simplified as follows:

    const app = require('./app') // the actual Express application
    const http = require('http')
    const config = require('./utils/config')
    const logger = require('./utils/logger')

    const server = http.createServer(app)

    server.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })

The *index.js* file only imports the actual application from the *app.js* file and then starts the application. The function *info* of the logger-module is used for the console printout telling that the application is running.

The handling of environment variables is extracted into a separate *utils/config.js* file:

    require('dotenv').config()

    let PORT = process.env.PORT
    let MONGODB_URI = process.env.MONGODB_URI

    module.exports = {
      MONGODB_URI,
      PORT
    }

The route handlers have also been moved into a dedicated module. The event handlers of routes are commonly referred to as *controllers*, and for this reason we have created a new *controllers* directory. All of the routes related to notes are now in the *notes.js* module under the *controllers* directory.

The contents of the *notes.js* module are the following:

    const notesRouter = require('express').Router()
    const Note = require('../models/note')

    notesRouter.get('/', (request, response) => {
      Note.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
      })
    })

    notesRouter.get('/:id', (request, response, next) => {
      Note.findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(note.toJSON())
          } else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
    })

    notesRouter.post('/', (request, response, next) => {
      const body = request.body

      const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
      })

      note.save()
        .then(savedNote => {
          response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
    })

    notesRouter.delete('/:id', (request, response, next) => {
      Note.findByIdAndRemove(request.params.id)
        .then(() => {
          response.status(204).end()
        })
        .catch(error => next(error))
    })

    notesRouter.put('/:id', (request, response, next) => {
      const body = request.body

      const note = {
        content: body.content,
        important: body.important,
      }

      Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
          response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
    })

    module.exports = notesRouter

This is almost an exact copy-paste of our previous *index.js* file.

However, there are a few significant changes. At the very beginning of the file we create a new [router](http://expressjs.com/en/api.html#router) object:

    const notesRouter = require('express').Router()

    //...

    module.exports = notesRouter

The module exports the router to be available for all consumers of the module.

All routes are now defined for the router object, in a similar fashion to what we had previously done with the object representing the entire application.

It's worth noting that the paths in the route handlers have shortened. In the previous version, we had:

    app.delete('/api/notes/:id', (request, response) => {

And in the current version, we have:

    notesRouter.delete('/:id', (request, response) => {

So what are these router objects exactly? The Express manual provides the following explanation:

> *A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.*

The router is in fact a *middleware*, that can be used for defining "related routes" in a single place, that is typically placed in its own module.

The *app.js* file that creates the actual application, takes the router into use as shown below:

    const notesRouter = require('./controllers/notes')
    app.use('/api/notes', notesRouter)

The router we defined earlier is used *if* the URL of the request starts with */api/notes*. For this reason, the notesRouter object must only define the relative parts of the routes, i.e. the empty path */* or just the parameter */:id*.

After making these changes, our *app.js* file looks like this:

    const config = require('./utils/config')
    const express = require('express')
    const app = express()
    const cors = require('cors')
    const notesRouter = require('./controllers/notes')
    const middleware = require('./utils/middleware')
    const logger = require('./utils/logger')
    const mongoose = require('mongoose')

    logger.info('connecting to', config.MONGODB_URI)

    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
      })

    app.use(cors())
    app.use(express.static('build'))
    app.use(express.json())
    app.use(middleware.requestLogger)

    app.use('/api/notes', notesRouter)

    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

    module.exports = app

The file takes different middleware into use, and one of these is the *notesRouter* that is attached to the */api/notes* route.

Our custom middleware has been moved to a new *utils/middleware.js* module:

    const logger = require('./logger')

    const requestLogger = (request, response, next) => {
      logger.info('Method:', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
      next()
    }

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }

    const errorHandler = (error, request, response, next) => {
      logger.error(error.message)

      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }

      next(error)
    }

    module.exports = {
      requestLogger,
      unknownEndpoint,
      errorHandler
    }

The responsibility of establishing the connection to the database has been given to the *app.js* module. The *note.js* file under the *models* directory only defines the Mongoose schema for notes.

    const mongoose = require('mongoose')

    mongoose.set('useFindAndModify', false)

    const noteSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
        minlength: 5
      },
      date: {
        type: Date,
        required: true,
      },
      important: Boolean,
    })

    noteSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })

    module.exports = mongoose.model('Note', noteSchema)

Once the application starts to grow in size, you are going to have to establish some kind of structure, and separate the different responsibilities of the application into separate modules.

There is no strict directory structure or file naming convention that is required for Express applications. To contrast this, Ruby on Rails does require a specific structure.

### Testing Node applications

The logic of our application is so simple, that there is not much that makes sense to test with unit tests. Let's create a new file *utils/for\_testing.js* and write a couple of simple functions that we can use for test writing practice:

    const palindrome = (string) => {
      return string
        .split('')
        .reverse()
        .join('')
    }

    const average = (array) => {
      const reducer = (sum, item) => {
        return sum + item
      }

      return array.reduce(reducer, 0) / array.length
    }

    module.exports = {
      palindrome,
      average,
    }

There are many different testing libraries or *test runners* available for JavaScript. In this course we will be using a testing library developed and used internally by Facebook called [jest](https://jestjs.io/), that resembles the previous king of JavaScript testing libraries [Mocha](https://mochajs.org/). Other alternatives do exist, like [ava](https://github.com/avajs/ava) that has gained popularity in some circles.

Jest is a natural choice for this course, as it works well for testing backends, and it shines when it comes to testing React applications.

Since tests are only executed during the development of our application, we will install *jest* as a development dependency with the command:

    npm install --save-dev jest

Let's define the `npm script test` to execute tests with Jest and to report about the test execution with the *verbose* style:

    {
      //...
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
        "deploy": "git push heroku master",
        "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
        "logs:prod": "heroku logs --tail",
        "lint": "eslint .",
        "test": "jest --verbose"  },
      //...
    }

Jest requires one to specify that the execution environment is Node. This can be done by adding the following to the end of *package.json*:

    {
     //...
     "jest": {
       "testEnvironment": "node"
     }
    }

Alternatively, Jest can look for a configuration file with the default name *jest.config.js*, where we can define the execution environment like this:

    module.exports = {
      testEnvironment: 'node',
    };

Let's create a separate directory for our tests called *tests* and create a new file called *palindrome.test.js* with the following contents:

    const palindrome = require('../utils/for_testing').palindrome

    test('palindrome of a', () => {
      const result = palindrome('a')

      expect(result).toBe('a')
    })

    test('palindrome of react', () => {
      const result = palindrome('react')

      expect(result).toBe('tcaer')
    })

    test('palindrome of releveler', () => {
      const result = palindrome('releveler')

      expect(result).toBe('releveler')
    })

The ESLint configuration we added to the project in the previous part complains about the *test* and *expect* commands in our test file, since the configuration does not allow *globals*. Let's get rid of the complaints by adding *"jest": true* to the *env* property in the *.eslintrc.js* file.

    module.exports = {
      "env": {
        "commonjs": true
        "es6": true,
        "node": true,
        "jest": true,  },
      "extends": "eslint:recommended",
      "rules": {
        // ...
      },
    };

Individual test cases are defined with the *test* function.

We verify the results with the [expect](https://facebook.github.io/jest/docs/en/expect.html#content) function. Expect wraps the resulting value into an object that offers a collection of *matcher* functions, that can be used for verifying the correctness of the result. Since in this test case we are comparing two strings, we can use the [toBe](https://facebook.github.io/jest/docs/en/expect.html#tobevalue) matcher.

Jest expects by default that the names of test files contain `.test`.

We defined a *describe* block around the tests that was given the name *average*:

    describe('average', () => {
      // tests
    })

Describe blocks can be used for grouping tests into logical collections. `describe` blocks are necessary when we want to run some shared setup or teardown operations for a group of tests.

Another thing to notice is that we wrote the tests in quite a compact way, without assigning the output of the function being tested to a variable:

    test('of empty array is zero', () => {
      expect(average([])).toBe(0)
    })

## Testing the backend

In some situations, it can be beneficial to implement some of the backend tests by mocking the database instead of using a real database. One library that could be used for this is [mongo-mock](https://github.com/williamkapke/mongo-mock).

Since our application's backend is still relatively simple, we will make the decision to test the entire application through its REST API, so that the database is also included. This kind of testing where multiple components of the system are being tested as a group, is called [integration testing](https://en.wikipedia.org/wiki/Integration_testing).

### Test environment

In one of the previous chapters of the course material, we mentioned that when your backend server is running in Heroku, it is in *production* mode.

The convention in Node is to define the execution mode of the application with the `NODE_ENV` environment variable. In our current application, we only load the environment variables defined in the `.env` file if the application is *not* in production mode.

It is common practice to define separate modes for development and testing.

Next, let's change the scripts in our *package.json* so that when tests are run, `NODE_ENV` gets the value *test*:

    {
      // ...
      "scripts": {
          "start": "NODE_ENV=production node index.js",
          "dev": "NODE_ENV=development nodemon index.js",
          "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
          "deploy": "git push heroku master",
          "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
          "logs:prod": "heroku logs --tail",
          "lint": "eslint .",
          "test": "NODE_ENV=test jest --verbose --runInBand"
      },
      // ...
    }

We also added the [runInBand](https://jestjs.io/docs/en/cli.html#--runinband) option to the npm script that executes the tests. This option will prevent Jest from running tests in parallel; we will discuss its significance once our tests start using the database.

There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the [cross-env](https://www.npmjs.com/package/cross-env) package with the command:

    npm install cross-env

We can then achieve cross-platform compatibility by using the cross-env library in our npm scripts defined in *package.json*:

    {
      // ...
      "scripts": {
        "start": "cross-env NODE_ENV=production node index.js",
        "dev": "cross-env NODE_ENV=development nodemon index.js",
        // ...
        "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
      },
      // ...
    }

Now we can modify the way that our application runs in different modes. As an example of this, we could define the application to use a separate test database when it is running tests.

We can create our separate test database in Mongo DB Atlas. This is not an optimal solution in situations where there are many people developing the same application. Test execution in particular typically requires that a single database instance is not used by tests that are running concurrently.

It would be better to run our tests using a database that is installed and running in the developer's local machine. The optimal solution would be to have every test execution use its own separate database. This is "relatively simple" to achieve by [running Mongo in-memory](https://docs.mongodb.com/manual/core/inmemory/) or by using [Docker](https://www.docker.com) containers. We will not complicate things and will instead continue to use the MongoDB Atlas database.

Let's make some changes to the module that defines the application's configuration:

    require('dotenv').config()

    let PORT = process.env.PORT
    let MONGODB_URI = process.env.MONGODB_URI

    if (process.env.NODE_ENV === 'test') {
        MONGODB_URI = process.env.TEST_MONGODB_URI
    }

    module.exports = {
        MONGODB_URI,
        PORT
    }

The *.env* file has *separate variables* for the database addresses of the development and test databases:

    MONGODB_URI=mongodb+srv://fullstack:secred@cluster0-ostce.mongodb.net/note-app?retryWrites=true
    PORT=3001

    TEST_MONGODB_URI=mongodb+srv://fullstack:secret@cluster0-ostce.mongodb.net/note-app-test?retryWrites=true

The *config* module that we have implemented slightly resembles the [node-config](https://github.com/lorenwest/node-config) package. Writing our own implementation is justified since our application is simple, and also because it teaches us valuable lessons.

### supertest

Let's use the [supertest](https://github.com/visionmedia/supertest) package to help us write our tests for testing the API.

We will install the package as a development dependency:

    npm install --save-dev supertest

Let's write our first test in the *tests/note\_api.test.js* file:

    const mongoose = require('mongoose')
    const supertest = require('supertest')
    const app = require('../app')

    const api = supertest(app)

    test('notes are returned as json', async () => {
      await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    afterAll(() => {
      mongoose.connection.close()
    })

The test imports the Express application from the *app.js* module and wraps it with the *supertest* function into a so-called [superagent](https://github.com/visionmedia/superagent) object. This object is assigned to the *api* variable and tests can use it for making HTTP requests to the backend.

Once all the tests have finished running we have to close the database connection used by Mongoose. This can be easily achieved with the [afterAll](https://facebook.github.io/jest/docs/en/api.html#afterallfn-timeout) method:

    afterAll(() => {
      mongoose.connection.close()
    })

One tiny but important detail: at the beginning of this part we extracted the Express application into the *app.js* file, and the role of the *index.js* file was changed to launch the application at the specified port with Node's built-in *http* object:

    const app = require('./app') // the actual Express app
    const http = require('http')
    const config = require('./utils/config')
    const logger = require('./utils/logger')

    const server = http.createServer(app)

    server.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })

The tests only use the express application defined in the *app.js* file:

    const mongoose = require('mongoose')
    const supertest = require('supertest')
    const app = require('../app')
    const api = supertest(app)
    // ...

The documentation for supertest says the following:

> *if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.*

In other words, supertest takes care that the application being tested is started at the port that it uses internally.

Let's write a few more tests:

    test('there are two notes', async () => {
      const response = await api.get('/api/notes')

      expect(response.body).toHaveLength(2)
    })

    test('the first note is about HTTP methods', async () => {
      const response = await api.get('/api/notes')

      expect(response.body[0].content).toBe('HTML is easy')
    })

Both tests store the response of the request to the *response* variable, and unlike the previous test that used the methods provided by *supertest* for verifying the status code and headers, this time we are inspecting the response data stored in *response.body* property. Our tests verify the format and content of the response data with the [expect](https://facebook.github.io/jest/docs/en/expect.html#content) method of Jest.

The middleware that outputs information about the HTTP requests is obstructing the test execution output. Let us modify the logger so that it does not print to console in test mode:

    const info = (...params) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(...params)
        }
    }

    const error = (...params) => {
        console.error(...params)
    }

    module.exports = {
        info,
        error
    }

### Initializing the database before tests

However, our tests are bad as they are dependent on the state of the database. In order to make our tests more robust, we have to reset the database and generate the needed test data in a controlled manner before we run the tests.

Our tests are already using the [afterAll](https://facebook.github.io/jest/docs/en/api.html#afterallfn-timeout) function of Jest to close the connection to the database after the tests are finished executing. Jest offers many other [functions](https://facebook.github.io/jest/docs/en/setup-teardown.html#content) that can be used for executing operations once before any test is run, or every time before a test is run.

Let's initialize the database *before every test* with the [beforeEach](https://jestjs.io/docs/en/api.html#aftereachfn-timeout) function:

    const mongoose = require('mongoose')
    const supertest = require('supertest')
    const app = require('../app')
    const api = supertest(app)
    const Note = require('../models/note')

    const initialNotes = [
      {
        content: 'HTML is easy',
        important: false,
      },
      {
        content: 'Browser can execute only Javascript',
        important: true,
      },
    ]

    beforeEach(async () => {
      await Note.deleteMany({})

      let noteObject = new Note(initialNotes[0])
      await noteObject.save()

      noteObject = new Note(initialNotes[1])
      await noteObject.save()
    })

Let's also make the following changes to the last two tests:

    test('all notes are returned', async () => {
      const response = await api.get('/api/notes')

      expect(response.body).toHaveLength(initialNotes.length)})

    test('a specific note is within the returned notes', async () => {
      const response = await api.get('/api/notes')

      const contents = response.body.map(r => r.content)
      expect(contents).toContain(
        'Browser can execute only Javascript'  )
    })

### Running tests one by one

The *npm test* command executes all of the tests of the application. When we are writing tests, it is usually wise to only execute one or two tests. Jest offers a few different ways of accomplishing this, one of which is the [only](https://jestjs.io/docs/en/api#testonlyname-fn-timeout) method. If tests are written across many files, this method is not great.

A better option is to specify the tests that need to be run as parameter of the *npm test* command.

The following command only runs the tests found in the *tests/note\_api.test.js* file:

    npm test -- tests/note_api.test.js

The *-t* option can be used for running tests with a specific name:

    npm test -- -t 'a specific note is within the returned notes'

The provided parameter can refer to the name of the test or the describe block. The parameter can also contain just a part of the name. The following command will run all of the tests that contain *notes* in their name:

    npm test -- -t 'notes'

**NB**: When running a single test, the mongoose connection might stay open if no tests using the connection are run. The problem might be due to the fact that supertest primes the connection, but jest does not run the afterAll portion of the code.

### async/await

As an example, the fetching of notes from the database with promises looks like this:

    Note.find({}).then(notes => {
      console.log('operation returned the following notes', notes)
    })

All of the code we want to execute once the operation finishes is written in the callback function. If we wanted to make several asynchronous function calls in sequence, the situation would soon become painful. The asynchronous calls would have to be made in the callback. This would likely lead to complicated code and could potentially give birth to a so-called [callback hell](http://callbackhell.com/).

By [chaining promises](https://javascript.info/promise-chaining) we could keep the situation somewhat under control, and avoid callback hell by creating a fairly clean chain of *then* method calls.

    Note.find({})
      .then(notes => {
        return notes[0].remove()
      })
      .then(response => {
        console.log('the first note is removed')
        // more code here
      })

The then-chain is alright, but we can do better. The [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) introduced in ES6 provided a [clever way](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch4.md#iterating-generators-asynchronously) of writing asynchronous code in a way that "looks synchronous". The syntax is a bit clunky and not widely used.

The *async* and *await* keywords introduced in ES7 bring the same functionality as the generators, but in an understandable and syntactically cleaner way to the hands of all citizens of the JavaScript world.

There are a few important details to pay attention to when using async/await syntax. In order to use the await operator with asynchronous operations, they have to return a promise. This is not a problem as such, as regular asynchronous functions using callbacks are easy to wrap around promises.

### More tests and refactoring the backend

When code gets refactored, there is always the risk of [regression](https://en.wikipedia.org/wiki/Regression_testing), meaning that existing functionality may break. Let's refactor the remaining operations by first writing a test for each route of the API.

Let's start with the operation for adding a new note. Let's write a test that adds a new note and verifies that the amount of notes returned by the API increases, and that the newly added note is in the list.

    test('a valid note can be added', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/notes')

      const contents = response.body.map(r => r.content)

      expect(response.body).toHaveLength(initialNotes.length + 1)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

Let's also write a test that verifies that a note without content will not be saved into the database.

    test('note without content is not added', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const response = await api.get('/api/notes')

      expect(response.body).toHaveLength(initialNotes.length)
    })

The same verification steps will repeat in other tests later on, and it is a good idea to extract these steps into helper functions. Let's add the function into a new file called *tests/test\_helper.js* that is in the same directory as the test file.

    const Note = require('../models/note')

    const initialNotes = [
      {
        content: 'HTML is easy',
        date: new Date(),
        important: false
      },
      {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true
      }
    ]

    const nonExistingId = async () => {
      const note = new Note({ content: 'willremovethissoon' })
      await note.save()
      await note.remove()

      return note._id.toString()
    }

    const notesInDb = async () => {
      const notes = await Note.find({})
      return notes.map(note => note.toJSON())
    }

    module.exports = {
      initialNotes, nonExistingId, notesInDb
    }

### Error handling and async/await

With async/await the recommended way of dealing with exceptions is the old and familiar *try/catch* mechanism:

    notesRouter.post('/', async (request, response, next) => {
        const body = request.body

        const note = new Note({
            content: body.content,
            important: body.important === undefined ? false : body.important,
            date: new Date(),
        })
        try {
            const savedNote = await note.save()
            response.json(savedNote.toJSON())
        } catch (exception) {
            next(exception)
        }
    })

After making the change, all of our tests will pass once again.

The tests pass and we can safely refactor the tested routes to use async/await:

    notesRouter.get('/:id', async (request, response, next) => {
      try{
        const note = await Note.findById(request.params.id)
        if (note) {
          response.json(note.toJSON())
        } else {
          response.status(404).end()
        }
      } catch(exception) {
        next(exception)
      }
    })

    notesRouter.delete('/:id', async (request, response, next) => {
      try {
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch (exception) {
        next(exception)
      }
    })

### Eliminating the try-catch

Async/await unclutters the code a bit, but the 'price' is the *try/catch* structure required for catching exceptions. All of the route handlers follow the same structure

    try {
      // do the async operations here
    } catch(exception) {
      next(exception)
    }

One starts to wonder, if it would be possible to refactor the code to eliminate the *catch* from the methods?

The [express-async-errors](https://github.com/davidbanham/express-async-errors) library has a solution for this.

Let's install the library

    npm install express-async-errors --save

Using the library is *very* easy. You introduce the library in *src/app.js*:

    const config = require('./utils/config')
    const express = require('express')
    require('express-async-errors')
    const app = express()
    const cors = require('cors')
    const notesRouter = require('./controllers/notes')
    const middleware = require('./utils/middleware')
    const logger = require('./utils/logger')
    const mongoose = require('mongoose')

    // ...

    module.exports = app

The 'magic' of the library allows us to eliminate the try-catch blocks completely. For example the route for deleting a note

    notesRouter.delete('/:id', async (request, response, next) => {
      try {
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch (exception) {
        next(exception)
      }
    })

becomes

    notesRouter.delete('/:id', async (request, response) => {
      await Note.findByIdAndRemove(request.params.id)
      response.status(204).end()
    })

Because of the library, we do not need the *next(exception)* call anymore. The library handles everything under the hood. If an exception occurs in a *async* route, the execution is automatically passed to the error handling middleware.

The other routes become:

    notesRouter.post('/', async (request, response) => {
      const body = request.body

      const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        date: new Date(),
      })

      const savedNote = await note.save()
      response.json(savedNote.toJSON())
    })

    notesRouter.get('/:id', async (request, response) => {
      const note = await Note.findById(request.params.id)
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })

### Optimizing the beforeEach function

Let's return to writing our tests and take a closer look at the *beforeEach* function that sets up the tests:

    beforeEach(async () => {
      await Note.deleteMany({})

      let noteObject = new Note(helper.initialNotes[0])
      await noteObject.save()

      noteObject = new Note(helper.initialNotes[1])
      await noteObject.save()
    })

There's a better way of saving multiple objects to the database:

    beforeEach(async () => {
      await Note.deleteMany({})
      console.log('cleared')

      helper.initialNotes.forEach(async (note) => {
        let noteObject = new Note(note)
        await noteObject.save()
        console.log('saved')
      })
      console.log('done')
    })

The tests don't quite seem to work however, so we have added some console logs to help us find the problem. The console displays the following output:

```
cleared
done
entered test
saved
saved
```

The problem is that every iteration of the forEach loop generates its own asynchronous operation, and *beforeEach* won't wait for them to finish executing. In other words, the *await* commands defined inside of the *forEach* loop are not in the *beforeEach* function, but in separate functions that *beforeEach* will not wait for.

One way of fixing this is to wait for all of the asynchronous operations to finish executing with the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method:

    beforeEach(async () => {
      await Note.deleteMany({})

      const noteObjects = helper.initialNotes
        .map(note => new Note(note))
      const promiseArray = noteObjects.map(note => note.save())
      await Promise.all(promiseArray)
    })

The returned values of each promise in the array can still be accessed when using the Promise.all method. If we wait for the promises to be resolved with the `await` syntax `const results = await Promise.all(promiseArray)`, the operation will return an array that contains the resolved values for each promise in the `promiseArray`, and they appear in the same order as the promises in the array.

Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) block, that guarantees a specific execution order.

    beforeEach(async () => {
      await Note.deleteMany({})

      for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
      }
    })

The asynchronous nature of JavaScript can lead to surprising behavior, and for this reason, it is important to pay careful attention when using the async/await syntax. Even though the syntax makes it easier to deal with promises, it is still necessary to understand how promises work!

### Refactoring tests

This way of testing the API, by making HTTP requests and inspecting the database with Mongoose, is by no means the only nor the best way of conducting API-level integration tests for server applications. There is no universal best way of writing tests, as it all depends on the application being tested and available resources.

## User administration

We want to add user authentication and authorization to our application. Users should be stored in the database and every note should be linked to the user who created it. Deleting and editing a note should only be allowed for the user who created it.

Let's start by adding information about users to the database. There is a one-to-many relationship between the user (*User*) and notes (*Note*). When working with document databases, there are many different ways of modeling the situation.

The existing solution saves every note in the *notes collection* in the database. If we do not want to change this existing collection, then the natural choice is to save users in their own collection, *users* for example.

Like with all document databases, we can use object id's in Mongo to reference documents in other collections. This is similar to using foreign keys in relational databases.

Traditionally document databases like Mongo do not support *join queries* that are available in relational databases, used for aggregating data from multiple tables. However starting from version 3.2. Mongo has supported [lookup aggregation queries](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/).

If we need a functionality similar to join queries, we will implement it in our application code by making multiple queries. In certain situations Mongoose can take care of joining and aggregating data, which gives the appearance of a join query. However, even in these situations Mongoose makes multiple queries to the database in the background.

### References across collections

Let's assume that the *users* collection contains two users:

    [
      {
        username: 'mluukkai',
        _id: 123456,
      },
      {
        username: 'hellas',
        _id: 141414,
      },
    ];

The *notes* collection contains three notes that all have a *user* field that references a user in the *users* collection:

    [
      {
        content: 'HTML is easy',
        important: false,
        _id: 221212,
        user: 123456,
      },
      {
        content: 'The most important operations of HTTP protocol are GET and POST',
        important: true,
        _id: 221255,
        user: 123456,
      },
      {
        content: 'A proper dinosaur codes with Java',
        important: false,
        _id: 221244,
        user: 141414,
      },
    ]

Document databases do not demand the foreign key to be stored in the note resources, it could *also* be stored in the users collection, or even both:

    [
      {
        username: 'mluukkai',
        _id: 123456,
        notes: [221212, 221255],
      },
      {
        username: 'hellas',
        _id: 141414,
        notes: [221244],
      },
    ]

Document databases also offer a radically different way of organizing the data: In some situations it might be beneficial to nest the entire notes array as a part of the documents in the users collection:

    [
      {
        username: 'mluukkai',
        _id: 123456,
        notes: [
          {
            content: 'HTML is easy',
            important: false,
          },
          {
            content: 'The most important operations of HTTP protocol are GET and POST',
            important: true,
          },
        ],
      },
      {
        username: 'hellas',
        _id: 141414,
        notes: [
          {
            content:
              'A proper dinosaur codes with Java',
            important: false,
          },
        ],
      },
    ]

The structure and schema of the database is not as self-evident as it was with relational databases. The chosen schema must be one which supports the use cases of the application the best. This is not a simple design decision to make, as all use cases of the applications are not known when the design decision is made.

Paradoxically, schema-less databases like Mongo require developers to make far more radical design decisions about data organization at the beginning of the project than relational databases with schemas. On average, relational databases offer a more-or-less suitable way of organizing data for many applications.

### Mongoose schema for users

In this case, we make the decision to store the ids of the notes created by the user in the user document. Let's define the model for representing a user in the *models/user.js* file:

    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
      username: String,
      name: String,
      passwordHash: String,
      notes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Note'
        }
      ],
    })

    userSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
      }
    })

    const User = mongoose.model('User', userSchema)

    module.exports = User

The type of the field is *ObjectId* that references *note*-style documents. Mongo does not inherently know that this is a field that references notes, the syntax is purely related to and defined by Mongoose.

Let's expand the schema of the note defined in the *model/note.js* file so that the note contains information about the user who created it:

    const noteSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true,
            minlength: 5
        },
        date: Date,
        important: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })

In stark contrast to the conventions of relational databases, *references are now stored in both documents*: the note references the user who created it, and the user has an array of references to all of the notes created by them.

### Creating users

The password hash is the output of a one-way hash function applied to the user's password. It is never wise to store unencrypted plaintext passwords in the database\!

Let's install the bcrypt package for generating the password hashes:

    npm install bcrypt --save

Creating new users happens in compliance with the RESTful conventions discussed in [part 3](/en/part3/node_js_and_express#rest), by making an HTTP POST request to the *users* path.

Let's define a separate *router* for dealing with users in a new *controllers/users.js* file. Let's take the router into use in our application in the *app.js* file, so that it handles requests made to the */api/users* url:

    const usersRouter = require('./controllers/users')

    // ...

    app.use('/api/users', usersRouter)

The contents of the file that defines the router are as follows:

    const bcrypt = require('bcrypt')
    const usersRouter = require('express').Router()
    const User = require('../models/user')

    usersRouter.post('/', async (request, response) => {
      const body = request.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    })

    module.exports = usersRouter

We can write a new test that verifies that a new user with the same username can not be created:

    describe('when there is initially one user in db', () => {
      // ...

      test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    })

The test case obviously will not pass at this point. We are essentially practicing test-driven development, where tests for new functionality are written before the functionality is implemented.

Let's validate the uniqueness of the username with the help of Mongoose validators. Mongoose does not have a built-in validator for checking the uniqueness of a field. We can find a ready-made solution for this from the [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) npm package. Let's install it:

    npm install --save mongoose-unique-validator

We must make the following changes to the schema defined in the *models/user.js* file:

    const mongoose = require('mongoose')
    const uniqueValidator = require('mongoose-unique-validator')

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        name: String,
        passwordHash: String,
        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }],
    })

    userSchema.plugin(uniqueValidator)
    // ...

### Populate

We would like our API to work in such a way, that when an HTTP GET request is made to the */api/users* route, the user objects would also contain the contents of the user's notes, and not just their id. In a relational database, this functionality would be implemented with a *join query*.

As previously mentioned, document databases do not properly support join queries between collections, but the Mongoose library can do some of these joins for us. Mongoose accomplishes the join by doing multiple queries, which is different from join queries in relational databases which are *transactional*, meaning that the state of the database does not change during the time that the query is made. With join queries in Mongoose, nothing can guarantee that the state between the collections being joined is consistent, meaning that if we make a query that joins the user and notes collections, the state of the collections may change during the query.

The Mongoose join is done with the [populate](http://mongoosejs.com/docs/populate.html) method. Let's update the route that returns all users first:

    usersRouter.get('/', async (request, response) => {
      const users = await User
        .find({}).populate('notes')
      response.json(users.map(u => u.toJSON()))
    })

The [populate](http://mongoosejs.com/docs/populate.html) method is chained after the *find* method making the initial query. The parameter given to the populate method defines that the *ids* referencing *note* objects in the *notes* field of the *user* document will be replaced by the referenced *note* documents.

We can use the populate parameter for choosing the fields we want to include from the documents. The selection of fields is done with the Mongo [syntax](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#return-the-specified-fields-and-the-id-field-only):

    usersRouter.get('/', async (request, response) => {
      const users = await User
        .find({}).populate('notes', { content: 1, date: 1 })

      response.json(users.map(u => u.toJSON()))
    });

It's important to understand that the database does not actually know that the ids stored in the *user* field of notes reference documents in the user collection.

The functionality of the *populate* method of Mongoose is based on the fact that we have defined "types" to the references in the Mongoose schema with the *ref* option:

    const noteSchema = new mongoose.Schema({
      ...
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    })

## Token authentication

We will now implement support for [token based authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication#toc-how-token-based-works) to the backend.

The principles of token based authentication are depicted in the following sequence:

- User starts by logging in using a login form implemented with React

- This causes the React code to send the username and the password to the server address */api/login* as a HTTP POST request.

- If the username and the password are correct, the server generates a *token* which somehow identifies the logged in user.

  - The token is signed digitally, making it impossible to falsify 

- The backend responds with a status code indicating the operation was successful, and returns the token with the response.

- The browser saves the token, for example to the state of a React application.

- When the user creates a new note (or does some other operation requiring identification), the React code sends the token to the server with the request.

- The server uses the token to identify the user

Let's first implement the functionality for logging in. Install the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library, which allows us to generate [JSON web tokens](https://jwt.io/).

    npm install jsonwebtoken --save

The code for login functionality goes to the file controllers/login.js.

    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const loginRouter = require('express').Router()
    const User = require('../models/user')

    loginRouter.post('/', async (request, response) => {
      const body = request.body

      const user = await User.findOne({ username: body.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      response
        .status(200)
        .send({ token, username: user.username, name: user.name })
    })

    module.exports = loginRouter

If the password is correct, a token is created with the method *jwt.sign*. The token contains the username and the user id in a digitally signed form.

The token has been digitally signed using a string from the environment variable *SECRET* as the *secret*. The digital signature ensures that only parties who know the secret can generate a valid token. The value for the environment variable must be set in the *.env* file.

Now the code for login just has to be added to the application by adding the new router to *app.js*.

    const loginRouter = require('./controllers/login')

    //...

    app.use('/api/login', loginRouter)

### Limiting creating new notes to logged in users

Let's change creating new notes so that it is only possible if the post request has a valid token attached. The note is then saved to the notes list of the user identified by the token.

There are several ways of sending the token from the browser to the server. We will use the [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header. The header also tells which [authentication schema](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes) is used. This can be necessary if the server offers multiple ways to authenticate. Identifying the schema tells the server how the attached credentials should be interpreted.

The *Bearer* schema is suitable to our needs.

In practice, this means that if the token is for example, the string *eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW*, the Authorization header will have the value:

    Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

Creating new notes will change like so:

    const jwt = require('jsonwebtoken')

    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7)
        }
        return null
    }

    notesRouter.post('/', async (request, response) => {
        const body = request.body
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({
                error: 'token missing or invalid'
            })
        }
        const user = await User.findById(decodedToken.id)
        const note = new Note({
            content: body.content,
            important: body.important === undefined ? false : body.important,
            date: new Date(),
            user: user._id
        })

        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        response.json(savedNote.toJSON())
    })

A new note can now be created if the *authorization* header is given the correct value:

    POST http://localhost:3001/api/notes
    Content-type: application/json
    Authorization: bearer eyJh...

    {
       "content": "Note 55",
       "important": false
    }

### Error handling

Token verification can also cause a *JsonWebTokenError*. If we for example remove a few characters from the token and try creating a new note, this happens:

    JsonWebTokenError: invalid signature
        at /Users/mluukkai/opetus/_2019fullstack-koodit/osa3/notes-backend/node_modules/jsonwebtoken/verify.js:126:19
        at getSecret (/Users/mluukkai/opetus/_2019fullstack-koodit/osa3/notes-backend/node_modules/jsonwebtoken/verify.js:80:14)
        at Object.module.exports [as verify] (/Users/mluukkai/opetus/_2019fullstack-koodit/osa3/notes-backend/node_modules/jsonwebtoken/verify.js:84:10)
        at notesRouter.post (/Users/mluukkai/opetus/_2019fullstack-koodit/osa3/notes-backend/controllers/notes.js:40:30)

There are many possible reasons for a decoding error. The token can be faulty (like in our example), falsified, or expired. Let's extend our errorHandler middleware to take into account the different decoding errors.

    const unknownEndpoint = (request, response) => {
        response.status(404).send({
            error: 'unknown endpoint'
        })
    }

    const errorHandler = (error, request, response, next) => {
        if (error.name === 'CastError') {
            return response.status(400).send({
                error: 'malformatted id'
            })
        } else if (error.name === 'ValidationError') {
            return response.status(400).json({
                error: error.message
            })
        } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({
                error: 'invalid token'
            })
        }

        logger.error(error.message)

        next(error)
    }

If the application has multiple interfaces requiring identification, JWT's validation should be separated into its own middleware. Some existing library like [express-jwt](https://www.npmjs.com/package/express-jwt) could also be used.

### End notes

There have been many changes to the code which have caused a typical problem for a fast-paced software project: most of the tests have broken. Because this part of the course is already jammed with new information, we will leave fixing the tests to a non compulsory exercise.

Usernames, passwords and applications using token authentication must always be used over [HTTPS](https://en.wikipedia.org/wiki/HTTPS). We could use a Node [HTTPS](https://nodejs.org/api/https.html) server in our application instead of the [HTTP](https://nodejs.org/docs/latest-v8.x/api/http.html) server (it requires more configuration). On the other hand, the production version of our application is in Heroku, so our applications stays secure: Heroku routes all traffic between a browser and the Heroku server over HTTPS.

### Exercises 4.15.-4.22.

In the next exercises, basics of user management will be implemented for the Bloglist application. The safest way is to follow the story from part 4 chapter [User administration](/en/part4/user_administration) to the chapter [Token-based authentication](/en/part4/token_authentication). You can of course also use your creativity.

**One more warning:** If you notice you are mixing async/await and *then* calls, it is 99% certain you are doing something wrong. Use either or, never both.

#### 4.15: bloglist expansion, step3

Implement a way to create new users by doing a HTTP POST-request to address *api/users*. Users have *username , password and name*.

Do not save passwords to the database as clear text, but use the *bcrypt* library like we did in part 4 chapter [Creating new users](/en/part4/user_administration#creating-users).

**NB** Some Windows users have had problems with *bcrypt*. If you run into problems, remove the library with command

    npm uninstall bcrypt --save

and install [bcryptjs](https://www.npmjs.com/package/bcryptjs) instead.

Implement a way to see the details of all users by doing a suitable HTTP request.

List of users can for example, look as follows:

![fullstack content](/static/b59bda1bd7e5987a5c805332d509e516/14be6/22.png)

#### 4.16\*: bloglist expansion, step4

Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.

The operation must respond with a suitable status code and some kind of an error message if invalid user is created.

**NB** Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller like we did in [part 3](/en/part3/validation_and_es_lint) before using Mongoose validation.

Also, implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.

#### 4.17: bloglist expansion, step5

Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, *any* user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter [populate](/en/part4/user_administration#populate). Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19.

Modify listing all blogs so that the creator's user information is displayed with the blog:

![fullstack content](/static/199682ad74f50747c90997a967856ffa/14be6/23e.png)

and listing all users also displays the blogs created by each user:

![fullstack content](/static/ac9967c89785b33440e9b1b4e87c17e5/14be6/24e.png)

#### 4.18: bloglist expansion, step6

Implement token-based authentication according to part 4 chapter [Token authentication](/en/part4/token_authentication).

#### 4.19: bloglist expansion, step7

Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.

#### 4.20\*: bloglist expansion, step8

[This example](/en/part4/token_authentication) from part 4 shows taking the token from the header with the *getTokenFrom* helper function.

If you used the same solution, refactor taking the token to a [middleware](/en/part3/node_js_and_express#middleware). The middleware should take the token from the *Authorization* header and place it to the *token* field of the *request* object.

In other words, if you register this middleware in the *app.js* file before all routes

    app.use(middleware.tokenExtractor)

routes can access the token with *request.token*:

    blogsRouter.post('/', async (request, response) => {
      // ..
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      // ..
    })

Remember that a normal [middleware](/en/part3/node_js_and_express#middleware) is a function with three parameters, that at the end calls the last parameter *next* in order to move the control to next middleware:

    const tokenExtractor = (request, response, next) => {
      // code that extracts the token

      next()
    }

#### 4.21\*: bloglist expansion, step9

Change the delete blog operation so that a blog can be deleted only by the user who added the blog. Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.

If deleting a blog is attempted without a token or by a wrong user, the operation should return a suitable status code.

Note that if you fetch a blog from the database,

    const blog = await Blog.findById(...)

the field *blog.user* does not contain a string, but an Object. So if you want to compare the id of the object fetched from the database and a string id, normal comparison operation does not work. The id fetched from the database must be parsed into a string first.

    if ( blog.user.toString() === userid.toString() ) ...

#### 4.22\*: bloglist expansion, step10

After adding token based authentication the tests for adding a new blog broke down. Fix now the tests. Write also a new test that ensures that adding a blog fails with proper status code *401 Unauthorized* if token is not provided.

[This](https://github.com/visionmedia/supertest/issues/398) is most likely useful when doing the fix.

This is the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the [exercise submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).

# Part 9: Typescript

This part is all about TypeScript: and open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this part we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part you should be able to understand, develop and configure projects using TypeScript.

## Background and introduction

TypeScript is a programming language designed for large-scale JavaScript development created by Microsoft. For example Microsoft's *Azure Management Portal* (1,2 million lines of code) and the *Visual Studio Code* (300 000 lines of code) have both been written in TypeScript. To support building large-scale JavaScript applications, TypeScript offers e.g. better development-time tooling, static code analysis, compile-time type checking and code level documentation.

### Main principle

Programmer is even able to decide the version of the generated code, as long as it's ECMAScript 3 or newer. Typescript being a superset of JavaScript means that it includes all the features of JavaScript and its own additional features as well. In fact, all existing JavaScript code is actually valid TypeScript.

TypeScript consists of three separate, but mutually fulfilling parts:

  - The language
  - The compiler
  - The language Service

*The compiler* is responsible for type information erasure (i.e. removing the typing information) and the code transformations. The code transformations enable TypeScript code to be transpiled into executable JavaScript. Everything related to the types is removed at compile-time, so TypeScript isn't actually genuine statically typed code.

Traditionally *compiling* means that code is transformed from a human readable format to a machine readable format. In TypeScript human readable source code is transformed into another human readable source code, so the correct term would actually be *transpiling*. However compiling has been the most commonly used term in this context, so we will continue to use it.

The compiler also performs a static code analysis. It can emit warnings or errors if it finds a reason to do so, and it can be set to perform additional tasks such as combining the generated code into a single file.

*The language service* collects type information from the source code. Development tools can use the type information for providing intellisense, type hints and possible refactoring alternatives.

### TypeScript key language features

#### Type annotations

Type annotations in TypeScript are a lightweight way to record the intended *contract* of a function or a variable. In the example below we have defined a function *birthdayGreeter* which accepts two arguments, one of type string and one of type number. The function will return a string.

    const birthdayGreeter = (name: string, age: number): string => {
      return `Happy birthday ${name}, you are now ${age} years old!`;
    };
    
    const birthdayHero = "Jane User";
    const age = 22;
    
    console.log(birthdayGreeter(birthdayHero, 22));

#### Structural typing

TypeScript is a structurally typed language. In structural typing two elements are considered to be compatible with one another if for each feature within the type of the first element a corresponding and identical feature exists within the type of the second element. Two types are considered to be identical if they are compatible with each other.

#### Type inference

The TypeScript compiler can attempt to infer the type information if no type has been specified. Variable's type can be inferred based on its assigned value and its usage. The type inference take place when initializing variables and members, setting parameter default values, and determining function return types.

For example consider the function *add*

    const add = (a: number, b: number) => {
      /* The return value is used to determine
         the return type of the function */
      return a + b;
    }

The function's return value is inferred by retracing the code back to the return expression. The return expression performs an addition of the parameters a and b. We can see that a and b are numbers based on their types. Thus, we can infer the return value to be of type *number*.

As a more complex example let's consider the code below. If you have not used TypeScript before, this example might be a bit complex. But do not worry, you can safely skip this example for now.

    type CallsFunction = (callback: (result: string) => any) => void;
    
    const func: CallsFunction = (cb) => {
      cb('done');
      cb(1);
    }
    
    func((result) => {
      return result;
    });

First we have a declaration of a [type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) called *CallsFunction*. CallsFunction is a function type with one parameter *callback*. The parameter *callback* is of type function which takes a string parameters and returns [any](http://www.typescriptlang.org/docs/handbook/basic-types.html#any) value. As we will learn later in this part *any* is a kind of "wildcard" type that can represent any type.

Next we define the function *func* of type *CallsFunction*. From the function's type we can infer that its parameter function cb will only accept a string argument. To demonstrate this, there is also an example where the parameter function is called with a numeric value, which will cause an error in TypeScript.

Lastly we call *func* giving it the following function as a parameter

    (result) => {
      return result;
    }

Despite the types of the parameter function not being defined, we can infer from the calling context that the argument *result* is of the type string.

#### Type erasure

TypeScript removes all type system constructs during compilation.

Input:

    let x: SomeType;

Output:

    let x;

This means that no type information remains at runtime - nothing says that some variable x was declared as being of type *SomeType*.

The lack of runtime type information can be surprising for programmers who are used to extensively using reflection or other metadata systems.

### Why should one use TypeScript?

On different forums you may stumble upon a lot of different arguments either for or against TypeScript. The truth is probably as vague as: it depends on your needs and use of the functions that TypeScript offers. Anyway, here are explained some of our reasoning behind why we think that the use of TypeScript may have some advantages.

First of all, TypeScript offers *type checking and static code analysis*. We can require values to be of a certain type, and have the compiler warn about using them wrong. This can reduce runtime errors and you might even be able to reduce the amount of required unit tests in a project, at least concerning pure type tests. The static code analysis doesn't only warn about wrongful type usage, but also other mistakes such as misspelling a variable or function name or trying to use a variable beyond its scope.

The second advantage of TypeScript is that the type annotations in the code can function as a type of *code level documentation*. It's easy to check from a function signature what kind of arguments the function can consume and what type of data it will return. This type of type annotation bound documentation will always be up to date and it makes it easier for new programmers to start working on an existing project. It is also helpful when returning to an old project.

Types can be reused all around the code base, and a change to a type definition will automatically reflect everywhere the type is used. One might argue that you can achieve similar code level documentation with e.g. [JSDoc](https://jsdoc.app/about-getting-started.html), but it is not connected to the code as tightly as TypeScript's types, and may thus get out of sync more easily and is also more verbose.

The third advantage of TypeScript is, that IDEs can provide more *specific and smarter intellisense* when they know exactly what types of data you are processing.

All of these features are extremely helpful when you need to refactor your code. The static code analysis warns you about any errors in your code, and the intellisense can give you hints about available properties and even possible refactoring options. The code level documentation helps you understand the existing code. With the help of TypeScript it is also very easy to start using the newest JavaScript language features at an early stage just by altering its configuration.

### What does TypeScript not fix?

As mentioned above, TypeScript type annotations and type checking exist only at compile time and no longer at runtime. Even if the compiler does not throw any errors, runtime errors are still possible. These runtime errors are especially common when handling external input, such as data received from a network request.

Lastly, below we list some issues many have with TypeScript, which might be good to be aware of:

#### Incomplete, invalid or missing types in external libraries

When using external libraries you may find that some libraries have either missing or in some way invalid type declarations. Most often this is due to the library not being written in TypeScript, and the person adding the type declarations manually not doing such a good job with it. In these cases you might need to define the type declarations yourself. However, there is a good chance someone has already added typings for the package you are using. Always check [DefinitelyTyped](https://definitelytyped.org/) or [their GitHub pages](https://github.com/DefinitelyTyped/DefinitelyTyped) first. They are probably the most popular sources for type declaration files. Otherwise you might want to start off by getting acquainted with TypeScript's own [documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) regarding type declarations.

#### Sometimes type inference needs assistance

The type inference in TypeScript is pretty good but not quite perfect. Sometimes you may feel like you have declared your types perfectly, but the compiler still tells you that the property does not exist or that this kind of usage is not allowed. In these cases you might need to help the compiler out by doing something like an "extra" type check, but be careful with type casting and type guards. Using type casting or type guards you are basically giving your word to the compiler that the value really is of the type that you declare. You might want to check out TypeScript's documentation regarding [Type Assertions](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) and [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).

#### Mysterious type errors

The errors given by the type system may sometimes be quite hard to understand, especially if you use complex types. As a rule of thumb, the TypeScript error messages have the most useful information at the end of the message. When running into long confusing messages, start reading them from the end.

## First steps with Typescript

After the brief introduction to the main principles of TypeScript, we are now ready to start our journey towards becoming FullStack TypeScript developers. Rather than giving you a thorough introduction to all aspects of TypeScript, in this part we will focus on the most common issues that arise when developing express backends or React frontends with TypeScript. In addition to language features we will also have a strong emphasis in tooling.

### Setting things up

Install TypeScript support to your editor of choice. For [Visual Studio Code](https://code.visualstudio.com/) you need the [typescript hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero) extension.

In a production environment the need for compilation often means that you have to setup a "build step". During the build step all TypeScript code is compiled into JavaScript in a separate folder, and the production enviroment then runs the code from that folder. In a development environment it is often more handy to make use of real-time compilation and auto-reloading in order to be able to see the resulting changes faster.

Let's start writing our first TypeScript-app. To keep things simple, let's start by using the npm package [ts-node](https://github.com/TypeStrong/ts-node). It compiles and executes the specified TypeScript file immediately, so that there is no need for a separate compilation step.

You can install both *ts-node* and the official *typescript* package globally by running *npm install -g ts-node typescript*.

If you can't or don't want to install global packages, you can create an npm project which has the required dependencies and run your scripts in it. We will also take this approach.

As we remember from [part 3](/en/part3) an npm project is set by running the command *npm init* in an empty directory. Then we can install the dependencies by running

    npm install --save-dev ts-node typescript

and set up *scripts* within the package.json:

    {
      // ..
      "scripts": {
        "ts-node": "ts-node"  },
      // ..
    }

Now within this directory you can use *ts-node* by running *npm run ts-node*. Note that if you are using ts-node through package.json, all command line arguments for the script need to be prefixed with *--*. So if you want to run file.ts with *ts-node*, the whole command is: --\>

    npm run ts-node -- file.ts

It is worth mentioning that TypeScript also provides an online playground, where you can quickly try out TypeScript code and instantly see the resulting JavaScript and possible compilation errors. You can access TypeScript's official playground [here](https://www.typescriptlang.org/play/index.html).

**NB:** The playground might contain different tsconfig rules (which will be introduced later) than your local environment, which is why you might see different warnings there compared to your local environment. The playground's tsconfig is modifiable through the config dropdown menu.

#### A note about the coding style

JavaScript on itself is quite relaxed language, and things can often be done in multiple different ways. For example we have named vs anonymous functions, using const and let or var and the use of *semicolons*. This part of the course differs from the rest by using semicolons. It is not a TypeScript specific pattern but a general coding style decision when creating any kind of JavaScript. Whether to use them or not is usually in the hands of the programmer, but since it is expected to adapt ones coding habits to the existing codebase, in the exercises of this part it is expected to use semicolons and to adjust to the coding style of the part. This part has some other coding style differences compared to the rest of the course as well, e.g. in the directory naming.

Let's start by creating a simple Multiplier. It looks exactly as it would in JavaScript.

    const multiplicator = (a, b, printText) => {
      console.log(printText,  a * b);
    }
    
    multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');

As you can see, this is still ordinary basic JavaScript with no additional TS features. It compiles and runs nicely with *npm run ts-node -- multiplier.ts*, as it would with Node. But what happens if we end up passing wrong *types* of arguments to the multiplicator function?

Let's try it out\!

    const multiplicator = (a, b, printText) => {
      console.log(printText,  a * b);
    }
    
    multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');

Now when we run the code, the output is: *Multiplied a string and 4, the result is: NaN*.

TypeScript natively supports multiple types including *number*, *string* and *Array*. See the comprehensive list [here](https://www.typescriptlang.org/docs/handbook/basic-types.html).

    const multiplicator = (a: number, b: number, printText: string) => {
      console.log(printText,  a * b);
    }
    
    multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');

Now the code is no longer valid JavaScript, but in fact TypeScript. When we try to run the code, we notice that it does not compile.

### Creating your first own types

Let's expand our multiplicator into a bit more versatile calculator that also supports addition and division. The calculator should accept three arguments: two numbers and the operation, either *multiply*, *add* or *divide*, which tells it what to do with the numbers

In JavaScript the code would require additional validation to make sure the last argument is indeed a string. TypeScript offers a way to define specific types for inputs, which describe exactly what type of input is acceptable. On top of that, TypeScript can also show the info of the accepted values already on editor level.

We can create a *type* using the TypeScript native keyword *type*. Let's describe our type *Operation*:

    type Operation = 'multiply' | 'add' | 'divide';

Now the `Operation` type accepts only three kinds of input; exactly the three strings we wanted. Using the OR operator `|` we can define a variable to accept multiple values by creating a [union type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types). In this case we used exact strings (that in technical terms are called [string literal types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types)) but with unions you could also make the compiler to accept for example both string and number: *string | number*.

The `type` keyword defines a new name for a type, [a type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases). Since the defined type is a union of three possible values, it is handy to give it an alias that has a representative name.

Let's look at our calculator now:

    type Operation = 'multiply' | 'add' | 'divide';
    
    const calculator = (a: number, b: number, op : Operation) => {
      if (op === 'multiply') {
        return a * b;
      } else if (op === 'add') {
        return a + b;
      } else if (op === 'divide') {
        if (b === 0) return 'can\'t divide by 0!';
        return a / b;
      }
    }

Now when we hover on top of the *Operation* type in the calculator function, we can immediately see suggestions on what to do with it.

This is already pretty nice, but one thing we haven't touched yet is typing the return value of a function. Usually you want to know what a function returns, and it would be nice to have a guarantee that it actually returns what it says it does. Let's add a return value *number* to the calculator function:

    type Operation = 'multiply' | 'add' | 'divide';
    
    const calculator = (a: number, b: number, op: Operation): number => {
    
      if (op === 'multiply') {
        return a * b;
      } else if (op === 'add') {
        return a + b;
      } else if (op === 'divide') {
        if (b === 0) return 'this cannot be done';
        return a / b;
      }
    }

The compiler complains straight away, because in one case the function returns a string. There are couple of ways to fix this: we could extend the return type to allow string values, like so

    const calculator = (a: number, b: number, op: Operation): number | string =>  {
      // ...
    }

or we could create a return type which includes both possible types, much like our Operation type

    type Result = string | number
    
    const calculator = (a: number, b: number, op: Operation): Result =>  {
      // ...
    }

But now the question is if it's *really* okay for the function to return a string?

When your code can end up in a situation where something is divided by 0, something has probably gone terribly wrong and an error should be thrown and handled where the function was called. When you are deciding to return values you weren't originally expecting, the warnings you see from TypeScript prevent you from making rushed decisions and help you to keep your code working as expected.

One more thing to consider is, that even though we have defined types for our parameters, the generated JavaScript used at runtime does not contain the type checks. So if for example the *operation*-parameter's value comes from an external interface, there is no definite guarantee that it will be one of the allowed values. Therefore it's still better to include error handling and be prepared for the unexpected to happen. In this case, when there are multiple possible accepted values and all unexpected ones should result in an error, the [switch...case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement suits better than if...else in our code.

The code of our calculator should actually look something like this:

    type Operation = 'multiply' | 'add' | 'divide';
    
    type Result = number;
    
    const calculator = (a: number, b: number, op : Operation) : Result => {
      switch(op) {
        case 'multiply':
          return a * b;
        case 'divide':
          if( b === 0) throw new Error('Can\'t divide by 0!');
          return a / b;
        case 'add':
          return a + b;
        default:
          throw new Error('Operation is not multiply, add or divide!');
      }
    }
    
    try {
      console.log(calculator(1, 5 , 'divide'))
    } catch (e) {
      console.log('Something went wrong, error message: ', e.message);
    }

The programs we have written are alright, but it sure would be better if we could use command line arguments instead of always having to change the code to calculate different things.  
Let's try it out, as we would in a regular Node application, by accessing *process.argv*. But something is not right:

![fullstack content](/static/07d7898a48d092c789aa57608097678f/5a190/5.png)

### @types/{npm_package}

Let's return to the basic idea of TypeScript. TypeScript expects all globally used code to be typed, as it does for your own code when your project has a reasonable configuration. The TypeScript library itself contains only typings for the code of the TypeScript package. It is possible to write your own typings for a library, but that is almost never needed - since the TypeScript community has done it for us\!

As with npm, the TypeScript world also celebrates open source code. The community is active and continuously reacting to updates and changes in commonly used npm-packages.  

You can almost always find the typings for npm-packages, so you don't have to create types for all of your thousands of dependencies alone.

Usually types for existing packages can be found from the *@types*-organization within npm, and you can add the relevant types to your project by installing an npm package with the name of your package with @types/ - prefix. For example: `npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose` and so on and so on. The *@types/\** are maintained by [Definitely typed](http://definitelytyped.org/), a community project with the goal to maintaining types of everything in one place.

Sometimes an npm package can also include its types within the code and in that case installing the corresponding *@types/\** is not necessary.

!!Since the typings are only used before compilation, the typings are not needed in the production build and they should *always* be in the devDependencies of the package.json.

Since the global variable *process* is defined by Node itself, we get its typings by installing the package *@types/node*:

    npm install --save-dev @types/node

After installing the types, our compiler does not complain about the variable *process* anymore. Note that there is no need to require the types to the code, the installation of the package is enough\!

### Improving the project

Next let's add npm scripts to run our two programs *multiplier* and *calculator*:

    {
      "name": "part1",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "ts-node": "ts-node",
        "multiply": "ts-node multiplier.ts",    "calculate": "ts-node calculator.ts"  },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "ts-node": "^8.6.2",
        "typescript": "^3.8.2"
      }
    }

We can get the multiplier to work with command line parameters with the following changes

    const multiplicator = (a: number, b: number, printText: string) => {
      console.log(printText,  a * b);
    }
    
    const a: number = Number(process.argv[2])
    const b: number = Number(process.argv[3])
    multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

and we can run it with

    npm run multiply 5 2

if the program is run with parameters that are not of the right type, e.g.

    npm run multiply 5 lol

it "works" but gives us the answer

    Multiplied 5 and NaN, the result is: NaN

The reason for this is, that *Number('lol')* returns *NaN*, which is actually type *number*, so TypeScript has no power to rescue us from this kind of situation.

In order to prevent this kind of behaviour, we have to validate the data given to us from the command line.

Improved version of the multiplicator looks like this:

    interface MultiplyValues {
      value1: number;
      value2: number;
    }
    
    const parseArguments = (args: Array<string>): MultiplyValues => {
      if (args.length < 4) throw new Error('Not enough arguments');
      if (args.length > 4) throw new Error('Too many arguments');
    
      if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          value1: Number(args[2]),
          value2: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
    }
    
    const multiplicator = (a: number, b: number, printText: string) => {
      console.log(printText,  a * b);
    }
    
    try {
      const { value1, value2 } = parseArguments(process.argv);
      multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
    } catch (e) {
      console.log('Error, something bad happened, message: ', e.message);
    }

When we now run the program

    npm run multiply 1 lol

we get a proper error message:

    Error, something bad happened, message:  Provided values were not numbers!

Definition of the function *parseArguments* has a couple of interesting things:

    const parseArguments = (args: Array<string>): MultiplyValues => {
      // ...
    }

Firstly, the parameter *args* is an [array](http://www.typescriptlang.org/docs/handbook/basic-types.html#array) of strings. The return value has the type *MultiplyValues*, which is defined as follows:

    interface MultiplyValues {
      value1: number;
      value2: number;
    }

The definition utilizes TypeScript's [Interface](http://www.typescriptlang.org/docs/handbook/interfaces.html) keyword, which is one way to define the "shape" an object should have. In our case it is quite obvious that the return value should be an object with two properties *value1* and *value2*, which should both be of type number.

### Exercises 9.1.-9.3.

#### setup

Exercises 9.1.-9.7. will be all made to the same node project. Create the project in an empty directory with *npm init* and install the ts-node and typescript packages. Create also the file *tsconfig.json* to the directory with the following content:

    {
      "compilerOptions": {
        "noImplicitAny": true,
      }
    }

The *tsconfig.json* file is used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore, and and [much much more](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). For now we will only use the compiler option [noImplicitAny](https://www.typescriptlang.org/v2/en/tsconfig#noImplicitAny), that makes it mandatory to have types for all variables used.

#### 9.1 Body mass index

Create the code of this exercise to file *bmiCalculator.ts*

Write a function *calculateBmi* that counts [BMI](https://en.wikipedia.org/wiki/Body_mass_index) based on given weight (in kilograms) and height (in centimeters) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

    console.log(calculateBmi(180, 74))

should print the following message

    Normal (healthy weight)

Create a npm script for running the program with command *npm run calculateBmi*

#### 9.2 Exercise calculator

Create the code of this exercise to file *exerciseCalculator.ts*

Write a function *calculateExercises* that calculates the average time of *daily exercise hours* and compares it to the *target amount* of daily hours and returns an object that includes the following values:

  - the number of days
  - the number of training days
  - the original target value
  - the calculated average time
  - boolean value describing if the target was reached
  - a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
  - a text value explaining the rating

The daily exercise hours are given to the function as an [array](https://www.typescriptlang.org/docs/handbook/basic-types.html#array) that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training at Monday, none at Tuesday, 2 hours at Wednesday, 4.5 hours at Thursday and so on would be represented by the following array:

    [3, 0, 2, 4.5, 0, 3, 1]

For the Result object you should create an [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).

If you would call the function with parameters *\[3, 0, 2, 4.5, 0, 3, 1\]* and *2* it could return

    { periodLength: 7,
      trainingDays: 5,
      success: false,
      rating: 2,
      ratingDescription: 'not too bad but could be better',
      target: 2,
      average: 1.9285714285714286 }

Create a npm script *npm run calculateExercises* for calling the function with hard coded values.

#### 9.3 Command line

Change the previous exercises so that you can give the parameters of *bmiCalculator* and *exerciseCalculator* as command line arguments.

Your program could work eg. as follows:

    $ npm run calculateBmi 180 91
    
    Overweight

and

    $ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
    
    { periodLength: 9,
      trainingDays: 6,
      success: false,
      rating: 2,
      ratingDescription: 'not too bad but could be better',
      target: 2,
      average: 1.7222222222222223 }

In the example the *first argument* is the target value.

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

### More about tsconfig

In the exercises we used only one tsconfig rule [noImplicitAny](https://www.typescriptlang.org/v2/en/tsconfig#noImplicitAny). It's a good place to start, but now it's time to look into the config file a little deeper.

The [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file contains all your core configurations on how you want TypeScript to work in your project. You can define how strictly you want the code to be inspected, what files to include and exclude (*node\_modules* is excluded by default), and where compiled files should be placed (more on this later).

Let's specify the following configurations in our *tsconfig.json* file:

    {
      "compilerOptions": {
        "target": "ES2020",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "esModuleInterop": true
      }
    }

Do not worry too much about the *compilerOptions*, they will be under closer inspection on part 2.

You can find explanations for each of the configurations from the TypeScript documentation, or the really handy [tsconfig page](https://www.typescriptlang.org/tsconfig), or from the tsconfig [schema definition](http://json.schemastore.org/tsconfig), which unfortunately is formatted a little worse than the first two options.

### Adding express to the mix

Right now we are at a pretty good place. Our project is set up and we have two executable calculators in it. However, since our aim is to learn FullStack development, it is time to start working with some HTTP-requests.

Let us start by installing express:

    npm install express

add then add the *start* script to package.json:

    {
      // ..
      "scripts": {
        "ts-node": "ts-node",
        "multiply": "ts-node multiplier.ts",
        "calculate": "ts-node calculator.ts",
        "start": "ts-node index.ts"  },
      // ..
    }

Now we can create the file *index.ts*, and write the HTTP GET *ping* endpoint to it:

    const express = require('express');
    const app = express();
    
    app.get('/ping', (req, res) => {
      res.send('pong');
    });
    
    const PORT = 3003;
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

Everything else seems to be working just fine, but as you'd expect the *req* and *res* parameters of *app.get* need typing. If you look carefully, VSCode is also complaining something about importing express. You can see a short yellow line of dots under the *require*.

The complaint is that the *'require' call may be converted to an import*. Let us follow the advice and write the import as follows

    import express from 'express';

**NB**: VSCode offers you a possibility to fix the issues automatically by clicking the *Quick fix...* button. Keep your eyes open for these helpers/quick fixes; listening to your editor usually makes your code better and easier to read. The automatic fixes for issues can be a major time saver as well.

Now we run into another problem - the compiler complains about the import statement. Once again the editor is our best friend when trying to find out what the issue is:

![fullstack content](/static/42c8ddc465ac50724204530330e17888/5a190/7.png)

We haven't installed types for *express*. Let's do what the suggestion says and run:

    npm install --save-dev @types/express

When we hover over the *require* statement, we can see the compiler interprets everything express related to be of type *any*.

![fullstack content](/static/1cd92a8bd9863c3ce7156427741c4e93/5a190/8a.png)

Whereas when we use *import*, the editor knows the actual types

![fullstack content](/static/d93e9d88496d703f0c4c1bdf83b246b2/5a190/9a.png)

Which import statement to use depends on the export method used in the imported package.

A good rule of thumb is to try importing a module using the *import* statement first. We will always use this method in the *frontend*. If *import* does not work, try a combined method: *import ... = require('...')*.

We strongly suggest you read more about TypeScript modules [here](https://www.typescriptlang.org/docs/handbook/modules.html).

There is one more problem with the code

![fullstack content](/static/b8b508be11f6f46ca98515ef7dcf11c0/5a190/9b.png)

This is because we banned unused parameters in our *tsconfig.json*

    {
      "compilerOptions": {
        "target": "ES2020",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,    "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "esModuleInterop": true
      }
    }

This configuration might create problems if you have library-wide predefined functions which require declaring a variable even if it's not used at all, as is the case here. Fortunately this issue has already been solved on configuration level. Once again hovering over the issue gives us a solution. This time we can just click the quick fix button:

![fullstack content](/static/1c9e9465bd26936e8e95df71cf69292f/5a190/14a.png)

If it absolutely impossible to get rid of an unused variable, you can prefix it with an underscore to inform the compiler you have thought about it and there is nothing you can do.

Let's rename the *req* variable to *\_req*.

Finally we are ready to start the application. It seems to work fine:

![fullstack content](/static/0ce223dcd8032134d6854a274d4b8ef9/5a190/11a.png)

To simplify the development we should enable *auto reloading* to improve our workflow. In this course you have already used *nodemon*, but ts-node has an alternative called *ts-node-dev*. It is meant to be used only with a development environment which takes care of recompilation on every change, so restarting the application won't be necessary.

Let's install *ts-node-dev* to our development dependencies

    npm install --save-dev ts-node-dev

add a script to *package.json*

    {
      // ...
      "scripts": {
          // ...
          "dev": "ts-node-dev index.ts",  },
      // ...
    }

And now by running *npm run dev* we have a working, auto-reloading development environment for our project\!

### Exercises 9.4.-9.5.

#### 9.4 Express

Add express to your dependencies and create a HTTP GET endpoint *hello* that answers 'Hello Full Stack\!'

The web app should be started with command *npm start* in production mode and *npm run dev* in development mode that should use *ts-node-dev* to run the app.

Replace also your existing *tsconfig.json* file with the following content:

    {
      "compilerOptions": {
        "noImplicitAny": true,
        "noImplicitReturns": true,
        "strictNullChecks": true,
        "strictPropertyInitialization": true,
        "strictBindCallApply": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitThis": true,
        "alwaysStrict": true,
        "esModuleInterop": true,
        "declaration": true,
      }
    }

make sure there are not any errors\!

#### 9.5 WebBMI

Add an endpoint for BMI-calculator that can be used by doing a HTTP GET request to endpoint *bmi* and specifying the input with [query string parameters](https://en.wikipedia.org/wiki/Query_string). For example to get bmi for a person having height 180 and weight 72, the url is <http://localhost:3002/bmi?height=180&weight=72>

The response is a json of the form

    {
      weight: 72,
      height: 180,
      bmi: "Normal (healthy weight)"
    }

See the [express documentation](http://expressjs.com/en/5x/api.html#req.query) for info how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, response with proper status code and error message are given

    {
      error: "malformatted parameters"
    }

Do not copy the calculator code to file *index.ts*, make it a [typescript module](https://www.typescriptlang.org/docs/handbook/modules.html) that can be imported in *index.ts*.

### The horrors of *any*

Now that we have our first endpoints completed, you might notice we have used barely any TypeScript in these small examples. When examining the code a bit closer, we can see a few dangers lurking there.

Let's add an HTTP GET endpoint *calculate* to our app:

    import { calculator } from './calculator'
    
    // ...
    
    app.get('/calculate', (req, res) => {
      const { value1, value2, op } = req.query
    
      const result = calculator(value1, value2, op)
      res.send(result);
    });

When you hover over the *calculate* function, you can see the typing of the *calculator* even though the code itself does not contain any typings:

![fullstack content](/static/9cad49a5955eb0dbdaea64417151983b/5a190/12a.png)

But if you hover over the values parsed from the request, an issue arises:

![fullstack content](/static/533645e072e442e23bf7576e3d022c01/5a190/13a.png)

All of the variables have type *any*. It is not all that surprising, as no one has given them a type yet. There are a couple of ways to fix this, but the first we have to consider why this is accepted and where did the type *any* come from?

In TypeScript every untyped variable which's type cannot be inferred, becomes implicitly [any](http://www.typescriptlang.org/docs/handbook/basic-types.html#any) type. Any is a kind of a "wild card" type which literally stands for *whatever type*. Things become implicitly any type quite often when one forgets to type functions.

We can also explicitly type things *any*. The only difference between implicit and explicit any type is how the code looks, the compiler does not care about the difference.

Programmers however see the code differently when *any* is explicitly enforced than when it implicitly inferred. Implicit *any* typings are usually considered problematic, since it is quite often due to the coder forgetting to assign types (or being too lazy to do it), and it also means that the full power of TypeScript is not properly exploited.

This is why the configuration rule [noImplicitAny](https://www.typescriptlang.org/v2/en/tsconfig#noImplicitAny) exists on compiler level, and it is highly recommended to keep it on at all times. In the rare occasions you seriously cannot know what the type of a variable is, you should explicitly state that in the code

    const a : any = /* no clue what the type will be! */.

We already have *noImplicitAny* configured in our example, so why does the compiler not complain about the implicit *any* types? The reason is, that the *query* field of an express [Request](https://expressjs.com/en/5x/api.html#req) object is explicitly typed *any*. Same is true for the *request.body* field we use to post data to an app.

What if we would like to prevent developers from using *any* type at all? Fortunately we have other methods than *tsconfig.json* to enforce coding style. What we can do is use *eslint* to manage our code. Let's install eslint and its typescript extensions:

    npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

We will configure eslint to [disallow explicit any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md). Write the following rules to *.eslintrc*:

    {
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        "@typescript-eslint/no-explicit-any": 2
      }
    }

Let us also set up a *lint* npm script to inspect the files with *.ts* extension by modifying the *package.json* file:

    {
      // ...
      "scripts": {
          "start": "ts-node index.ts",
          "dev": "ts-node-dev index.ts",
          "lint": "eslint --ext .ts ."      //  ...
      },
      // ...
    }

Now lint will complain if we try to define a variable of type *any*:

![fullstack content](/static/b507fd23131ab2c569e987469a3f2265/5a190/13b.png)

The [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) has a lot of TypeScript specific eslint rules, but you can also use all basic eslint rules in TypeScript projects. For now we should propably go with the recommended settings and modify the rules as we go along whenever we find something we want to behave differently.

On top of the recommended settings, we should try to get familiar with the coding style required in this part and *set the semicolon at the end of each line of code to required*.

So we will use the following *.eslintrc*

    {
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      "plugins": ["@typescript-eslint"],
      "env": {
        "node": true,
        "es6": true
      },
      "rules": {
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "no-case-declarations": 0
      },
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    }

There are quite a few semicolons missing, but those are easy to add.

And now let's fix everything that needs to be fixed\!

### Exercises 9.6.-9.7.

#### 9.6 Eslint

Configure your project to use the above eslint settings and fix all the warnings.

#### 9.7 WebExercises

Add an endpoint to your app for the exercise calculator. It should be used by doing a HTTP POST request to endpoint *exercises* with the input in the request body

    {
      "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
      "target": 2.5
    }

Response is a json of the following form

    {
        "periodLength": 7,
        "trainingDays": 4,
        "success": false,
        "rating": 1,
        "ratingDescription": "bad",
        "target": 2.5,
        "average": 1.2142857142857142
    }

If the body of the request is not of the right form, response with proper status code and error message is given. The error message is either

    {
      error: "parameters missing"
    }

or

    {
      error: "malformatted parameters"
    }

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertable to numbers.

In this exercise you might find it beneficial to use the *explicit any* type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

    // eslint-disable-next-line @typescript-eslint/no-explicit-any

Note that you need to have a correct setup in order to get hold to the request body, see [part 3](/en/part3/node_js_and_express#receiving-data).

[Propose changes to material](https://github.com/fullstack-hy2020/fullstack-hy2020.github.io/edit/source/src/content/9/en/part9b.md)

[](/en/part9/background_and_introduction)

Part 9a

**Previous part**

[](/en/part9/typing_the_express_app)

Part 9c

**Next part**

[](https://www.helsinki.fi/)

![Helsingin yliopiston logo](/static/uoh_centre-3689cf9983a2ebc8089c8f078a9c4769.svg)

[](https://www.houston-inc.com/)

![Houston inc. logo](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjQ3cHgiIGhlaWdodD0iODJweCIgdmlld0JveD0iMCAwIDI0NyA4MiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTMuMiAoNzI2NDMpIC0gaHR0cHM6Ly9za2V0Y2hhcHAuY29tIC0tPgogICAgPHRpdGxlPmxvZ28vaG91c3RvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMCAwLjAyNjcxOTI2NzMgMTM4LjIwODE2NyAwLjAyNjcxOTI2NzMgMTM4LjIwODE2NyAzNi40NjU0MzgxIDAgMzYuNDY1NDM4MSI+PC9wb2x5Z29uPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImxvZ28vaG91c3RvbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImhvdXN0b25fc2ltcGxlLmVwcy1jb3B5LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU0LjU4MTg5MywgMjMuMjYzMDQwKSI+CiAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgPGcgaWQ9IkNsaXAtMiI+PC9nPgogICAgICAgICAgICA8cGF0aCBkPSJNODIuODA1MTI5OCwxMy41MDY2NjAzIEw4Mi44MDUxMjk4LDI1LjUzNjU1MDkgTDg1Ljk5MzYyOSwyNS41MzY1NTA5IEw4NS45OTM2MjksMTMuNTA2NjYwMyBMOTAuNDA2NTQ5MywxMy41MDY2NjAzIEw5MC40MDY1NDkzLDEwLjQ0NTY3ODQgTDc4LjM3NTEwMzYsMTAuNDQ1Njc4NCBMNzguMzc1MTAzNiwxMy41MDY2NjAzIEw4Mi44MDUxMjk4LDEzLjUwNjY2MDMgWiBNOTYuNDkxMDQ5NSwxNy45NjM2ODg1IEM5Ni40OTEwNDk1LDIwLjU1OTU1NzIgOTguMzE3ODU1NywyMi43MDc5ODQyIDEwMC44ODYxNTcsMjIuNzA3OTg0MiBDMTAzLjQ1NDg4MiwyMi43MDc5ODQyIDEwNS4yNDcxOTQsMjAuNTk1NDY1NyAxMDUuMjQ3MTk0LDE4LjAxNzk3NTMgTDEwNS4yNDcxOTQsMTguMDAwMDIxMSBDMTA1LjI0NzE5NCwxNS40MDQyOTM3IDEwMy40MjA1MjksMTMuMjU1ODY2NyAxMDAuODUyMjI4LDEzLjI1NTg2NjcgQzk4LjI4MzUwMjMsMTMuMjU1ODY2NyA5Ni40OTEwNDk1LDE1LjM2ODM4NTMgOTYuNDkxMDQ5NSwxNy45NDU3MzQzIEw5Ni40OTEwNDk1LDE3Ljk2MzY4ODUgWiBNOTMuMTQ3MDQxMywxOC4wMTc5NzUzIEw5My4xNDcwNDEzLDE3Ljk4MjA2NjkgQzkzLjE0NzA0MTMsMTMuNjg1NDk1NiA5Ni40MDQ4MTI3LDEwLjE3NjkzMDYgMTAwLjg4NjE1NywxMC4xNzY5MzA2IEMxMDUuMzY3OTI1LDEwLjE3NjkzMDYgMTA4LjU5MTM0MywxMy42NDk3Mjg1IDEwOC41OTEzNDMsMTcuOTQ1NzM0MyBMMTA4LjU5MTM0MywxNy45NjM2ODg1IEMxMDguNTkxMzQzLDIyLjI2MDI1OTggMTA1LjMzMzU3MiwyNS43Njg4MjQ3IDEwMC44NTIyMjgsMjUuNzY4ODI0NyBDOTYuMzcwMzE4LDI1Ljc2ODgyNDcgOTMuMTQ3MDQxMywyMi4zMTQxMjI0IDkzLjE0NzA0MTMsMTguMDE3OTc1MyBMOTMuMTQ3MDQxMywxOC4wMTc5NzUzIFogTTcwLjQxMTkxMzcsMjIuNzk3MDQ4NSBDNjguNzU2ODc0MiwyMi43OTcwNDg1IDY3LjM3ODIxNjYsMjIuMDgxMjgzMSA2Ni4wNjg0MDcsMjAuOTcxNzk3NCBMNjQuMTcyMTg3MiwyMy4zMTY0NDg0IEM2NS45MTMxODA4LDI0LjkyNzk0NTQgNjguMTM2Njc2MiwyNS43MzMzNDA0IDcwLjM0MzA2NTYsMjUuNzMzMzQwNCBDNzMuNDgwMTA1NSwyNS43MzMzNDA0IDc1LjY2OTI0NzYsMjQuMDUwMTY4IDc1LjY2OTI0NzYsMjEuMDYxMDAzIEw3NS42NjkyNDc2LDIxLjAyNTA5NDUgQzc1LjcyMTEzMSwxOC4zOTM0NTg4IDc0LjA0ODU2MTUsMTcuMzAxNzg1OCA3MS4xMDExMDExLDE2LjQ5NTgyNTMgQzY4LjU4NDY4MzQsMTUuODMzOTIyNiA2Ny45NjM5MTk5LDE1LjUxMTMxMjIgNjcuOTYzOTE5OSwxNC41MDg5ODYyIEw2Ny45NjM5MTk5LDE0LjQ3MzA3NzggQzY3Ljk2MzkxOTksMTMuNzM4OTM0MSA2OC42MDIyMTM1LDEzLjE2NjY2MTEgNjkuODI1NjQ0OSwxMy4xNjY2NjExIEM3MS4wNDk2NDE4LDEzLjE2NjY2MTEgNzIuMzA3OTkyMSwxMy43MjA5Nzk5IDczLjYwMDgzNywxNC42NTIwNTQ1IEw3NS4yNTU1OTM4LDEyLjE0NTk1NjkgQzczLjc4OTk5MjUsMTAuOTEwNjUwMiA3MS45ODA3MTY0LDEwLjIzMDM2OTIgNjkuODYwNTYzNywxMC4yMzAzNjkyIEM2Ni44OTU3MTQ3LDEwLjIzMDM2OTIgNjQuNzc1NTYyLDEyLjAzODY1NTcgNjQuNzc1NTYyLDE0Ljc3NzU5MjYgTDY0Ljc3NTU2MiwxNC44MTMwNzY5IEM2NC43NzU1NjIsMTcuODAyNjY2MSA2Ni42NzEwNzQ5LDE4LjY0NDUzNSA2OS41ODQxODE5LDE5LjQzMjExNzMgQzcyLjAxNDY0NTYsMjAuMDc2NjMxMiA3Mi41MTQ2Nzc2LDIwLjUwNjI2MDEgNzIuNTE0Njc3NiwyMS4zNDc3MDQ5IEw3Mi41MTQ2Nzc2LDIxLjM4MzA0NzkgQzcyLjUxNDY3NzYsMjIuMjYwMjU5OCA3MS43MjIyODg4LDIyLjc5NzA0ODUgNzAuNDExOTEzNywyMi43OTcwNDg1IEw3MC40MTE5MTM3LDIyLjc5NzA0ODUgWiBNMzEuMzM2NDY5NywxNy45NjM2ODg1IEMzMS4zMzY0Njk3LDIwLjU1OTU1NzIgMzMuMTYzNywyMi43MDc5ODQyIDM1LjczMTg1OTksMjIuNzA3OTg0MiBDMzguMzAwMTYxMSwyMi43MDc5ODQyIDQwLjA5MjQ3MjYsMjAuNTk1NDY1NyA0MC4wOTI0NzI2LDE4LjAxNzk3NTMgTDQwLjA5MjQ3MjYsMTguMDAwMDIxMSBDNDAuMDkyNDcyNiwxNS40MDQyOTM3IDM4LjI2NTI0MjMsMTMuMjU1ODY2NyAzNS42OTY5NDEsMTMuMjU1ODY2NyBDMzMuMTI5MjA1MywxMy4yNTU4NjY3IDMxLjMzNjQ2OTcsMTUuMzY4Mzg1MyAzMS4zMzY0Njk3LDE3Ljk0NTczNDMgTDMxLjMzNjQ2OTcsMTcuOTYzNjg4NSBaIE0yOC4wMDk3MDg5LDE4LjAxNzk3NTMgTDI4LjAwOTcwODksMTcuOTgyMDY2OSBDMjguMDA5NzA4OSwxMy42ODU0OTU2IDMxLjI2NzQ4MDMsMTAuMTc2OTMwNiAzNS43NDg4MjQ1LDEwLjE3NjkzMDYgQzQwLjIzMDczNDIsMTAuMTc2OTMwNiA0My40MzYxOTgsMTMuNjQ5NzI4NSA0My40NTQwMTA5LDE3Ljk0NTczNDMgTDQzLjQ1NDAxMDksMTcuOTYzNjg4NSBDNDMuNDU0MDEwOSwyMi4yNjAyNTk4IDQwLjE5NjIzOTUsMjUuNzY4ODI0NyAzNS43MTQ4OTUzLDI1Ljc2ODgyNDcgQzMxLjIzMjU2MTUsMjUuNzY4ODI0NyAyOC4wMDk3MDg5LDIyLjMxNDEyMjQgMjguMDA5NzA4OSwxOC4wMTc5NzUzIEwyOC4wMDk3MDg5LDE4LjAxNzk3NTMgWiBNNTMuODMwNDE3MSwyNS43MzMzNDA0IEM1Ny43NDI4ODEyLDI1LjczMzM0MDQgNjAuMjA3ODM5NywyMy40OTU4NDkyIDYwLjIwNzgzOTcsMTguOTMwNjcxNSBMNjAuMjA3ODM5NywxMC40MjcxNTg3IEw1Ny4wMDE4MTAzLDEwLjQyNzE1ODcgTDU3LjAwMTgxMDMsMTkuMDczNzM5OCBDNTcuMDAxODEwMywyMS40NzI2Nzc2IDU1LjgxMjMwODEsMjIuNjkwMDMgNTMuODY0NzcwNCwyMi42OTAwMyBDNTEuOTE3Mzc0MSwyMi42OTAwMyA1MC43Mjc3MzA1LDIxLjQxODk1NjMgNTAuNzI3NzMwNSwxOC45NjY1OCBMNTAuNzI3NzMwNSwxMC40MjcxNTg3IEw0Ny41Mzg2NjU4LDEwLjQyNzE1ODcgTDQ3LjUzODY2NTgsMTkuMDM3ODMxMyBDNDcuNTM4NjY1OCwyMy40Nzc4OTUgNDkuOTE3OTUzLDI1LjczMzM0MDQgNTMuODMwNDE3MSwyNS43MzMzNDA0IEw1My44MzA0MTcxLDI1LjczMzM0MDQgWiBNMy4xNTQ1NywzMy4xOTgxOTQ4IEwxMzUuMDM2NjMyLDMzLjE5ODE5NDggTDEzNS4wMzY2MzIsMy4zMDI0NDQ4OCBMMy4xNTQ1NywzLjMwMjQ0NDg4IEwzLjE1NDU3LDMzLjE5ODE5NDggWiBNMCwzNi40NzM5MjA0IEwxMzguMjA4MTY3LDM2LjQ3MzkyMDQgTDEzOC4yMDgxNjcsMC4wMjY3MTkyNjczIEwwLDAuMDI2NzE5MjY3MyBMMCwzNi40NzM5MjA0IFogTTE0LjgyMzExNDMsMTkuNDg1NDE0NCBMMjAuNzE4NjAwNSwxOS40ODU0MTQ0IEwyMC43MTg2MDA1LDI1LjUzNjU1MDkgTDIzLjkwNzY2NTIsMjUuNTM2NTUwOSBMMjMuOTA3NjY1MiwxMC40NDU2Nzg0IEwyMC43MTg2MDA1LDEwLjQ0NTY3ODQgTDIwLjcxODYwMDUsMTYuNDA2MDU0MiBMMTQuODIzMTE0MywxNi40MDYwNTQyIEwxNC44MjMxMTQzLDEwLjQ0NTY3ODQgTDExLjYzNDc1NjUsMTAuNDQ1Njc4NCBMMTEuNjM0NzU2NSwyNS41MzY1NTA5IEwxNC44MjMxMTQzLDI1LjUzNjU1MDkgTDE0LjgyMzExNDMsMTkuNDg1NDE0NCBaIE0xMTUuODY0OTIyLDE1Ljk0MTUwNjUgTDEyMi44OTc2MDIsMjUuNTM2NTUwOSBMMTI1LjYyMDk4OCwyNS41MzY1NTA5IEwxMjUuNjIwOTg4LDEwLjQ0NTY3ODQgTDEyMi40NjY0MTgsMTAuNDQ1Njc4NCBMMTIyLjQ2NjQxOCwxOS43MzYyMDggTDExNS42NTgzNzcsMTAuNDQ1Njc4NCBMMTEyLjcxMDkxNywxMC40NDU2Nzg0IEwxMTIuNzEwOTE3LDI1LjUzNjU1MDkgTDExNS44NjQ5MjIsMjUuNTM2NTUwOSBMMTE1Ljg2NDkyMiwxNS45NDE1MDY1IEwxMTUuODY0OTIyLDE1Ljk0MTUwNjUgWiIgaWQ9IkZpbGwtMSIgZmlsbD0iIzAwMDEwNSIgbWFzaz0idXJsKCNtYXNrLTIpIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=)

[About course](/en/about)[Course contents](/en#course-contents)[FAQ](/en/faq)[Partners](/en/companies)[Challenge](/en/challenge)
