import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  );
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
}

const Content = (props) => {
  const es = props.parts.map(p => 
      <Part key={p.id} part={p.name} exercises={p.exercises} />
  );

  return (
    <>
      {es}
    </>
  );
}

const Total = ({total}) =>
    <div>
        <b>Total of {total} exercises</b>
    </div>

const Course = ({course}) => {
    const total = course.parts.reduce((a, p) => p.exercises + a, 0)
    return (
        <>
            <Header course={course.name} />
            <Content
                parts={course.parts}
            />
            <Total total={total} />
        </>
    )
} 

export default Course