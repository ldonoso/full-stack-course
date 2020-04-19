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
