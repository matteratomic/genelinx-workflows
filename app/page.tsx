'use client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page(props: {}) {
  useEffect(() => {
    redirect('/dashboard/home')
  }, [])
  return (
    <div></div>

  )
}


