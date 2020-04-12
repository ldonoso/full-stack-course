import React from 'react'
import Course from './Course'

const Courses = ({courses}) => {
    const items = courses.map(course =>
        <Course key={course.id} course={course}/>
    )

    return items;
}

export default Courses