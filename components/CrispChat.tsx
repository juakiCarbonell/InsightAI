'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('9720aea2-79ab-42c8-aafd-63fbdb00c201')
  }, [])
  return null
}
