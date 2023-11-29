import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/costants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/useProModal'

interface FreeCounterProps {
  apiLimitCount: number
}

export const FreeCounter = ({ apiLimitCount }: FreeCounterProps) => {
  const proModal = useProModal()
  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button className='w-full' variant='premium' onClick={proModal.onOpen}>
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
