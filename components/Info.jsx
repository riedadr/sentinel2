import React from 'react'
import { useInfo } from '../contexts/info'

export default function Info() {
    const {ipAddr} = useInfo();
  return (
    <div>Info {ipAddr}</div>
  )
}
