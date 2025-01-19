'use client'

import { useState } from 'react'
import { User, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UserButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Button variant="ghost" onClick={() => setIsLoggedIn(!isLoggedIn)}>
      {isLoggedIn ? (
        <User className="h-5 w-5" />
      ) : (
        <>
          <LogIn className="h-5 w-5 mr-2" />
          ログイン
        </>
      )}
    </Button>
  )
}

