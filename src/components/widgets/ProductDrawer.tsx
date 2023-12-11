import { useRef, useState } from 'react'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'

export type ProductID = 'enlil3' | 'noiseGPT' | 'botifAI.app' | 'myAnalyst' | 'aiDULT'

export default function ProductDrawer({ id }: { id: ProductID }) {
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowDrawer((prev) => !prev)}
        className="flex border border-primary rounded-full w-6 h-6 items-center justify-center text-2xl hover:cursor-pointer"
      >
        +
      </button>
      <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} id={id} />
    </>
  )
}

function Drawer({ isOpen, onClose, id }: { isOpen: boolean; onClose: () => void; id: ProductID }) {
  const ref = useRef(null)
  useOnClickOutside(ref, onClose)

  return (
    <>
      <div
        className={`fixed left-0 bottom-0 w-full h-full transition-all ${isOpen ? 'z-50 backdrop-blur-sm' : '-z-50'}`}
      ></div>
      <div
        ref={ref}
        className={`fixed left-0 bottom-0 w-full h-96 z-50 transition-transform duration-300 ${
          isOpen ? '' : 'translate-y-96'
        }`}
      >
        <div className="relative flex flex-col h-full mx-10 overflow-hidden rounded-t-lg shadow-sm">
          <div
            className="absolute flex justify-center items-center right-0 m-5 bg-white w-12 h-12 rounded-full text-2xl font-medium hover:cursor-pointer"
            onClick={onClose}
          >
            x
          </div>
          <div className="flex flex-row p-10 h-full bg-black">
            <h1 className="text-white text-4xl font-medium max-w-[400px]">A Layer 3 specifically for uncensored AI</h1>
          </div>
        </div>
      </div>
    </>
  )
}
