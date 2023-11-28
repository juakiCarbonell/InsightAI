import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { MAX_FREE_COUNTS } from '@/costants'

export const increaseApiLimit = async () => {
  const { userId } = auth()
  
  if (!userId) return

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })
  console.log('userId', userApiLimit)
  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    })
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    })
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth()

  if (!userId) return false
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true
  return false
}
