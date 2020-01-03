import React from 'react'
import {
  Link,
} from "react-router-dom";

export default function () {
  return (
    <>
      <div>home</div>
      <Link to="edit-and-read">edit-and-read</Link>
      <Link to="and">two permissions (and)</Link>
      <Link to="or">two permissions (ors)</Link>
      <Link to="feature-flags">default not viewable</Link>
    </>
  )
}
