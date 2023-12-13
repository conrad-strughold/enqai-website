import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import Checkmark from '~/assets/images/checkmark.svg'

export default function ProductDrawer({
  hero,
  color,
  title,
  subtitle,
  features,
}: {
  hero: string
  color: 'light' | 'dark' | 'gray'
  title: string
  subtitle: string
  features: string[]
}) {
  const [showDrawer, setShowDrawer] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setShowDrawer(false))

  useEffect(() => {
    if (showDrawer) document.body.style.overflow = 'hidden'
    if (!showDrawer) document.body.style.overflow = 'unset'
  }, [showDrawer])

  return (
    <>
      <button
        onClick={() => setShowDrawer((prev) => !prev)}
        className="flex border border-primary rounded-full w-6 h-6 items-center justify-center text-2xl hover:cursor-pointer"
      >
        +
      </button>
      <div
        className={`fixed left-0 top-0 w-full h-full transition-all ${showDrawer ? 'z-50 backdrop-blur-sm' : '-z-50'}`}
      ></div>
      <div
        ref={ref}
        className={`fixed left-0 top-full h-full right-0 max-w-[1400px] py-10 md:px-10 pb-0 mx-auto self-center z-50 transition-transform duration-1000 ${
          showDrawer ? '-translate-y-full' : 'translate-y-full'
        }`}
      >
        <div className="relative flex flex-col h-full w-full mx-auto overflow-y-scroll overscroll-contain no-scrollbar rounded-t-2xl shadow-2xl">
          <div
            className="fixed right-0 flex justify-center items-center z-20 my-5 mr-5 md:mr-14 bg-white w-12 h-12 rounded-full text-2xl font-medium hover:cursor-pointer"
            onClick={() => setShowDrawer(false)}
          >
            x
          </div>
          <div className="relative flex h-[350px] w-full">
            <img className="absolute h-full w-full object-cover z-0" src={hero}></img>
            <div className="flex flex-row py-16 px-8 md:p-24 z-10">
              <h1 className="text-white text-[40px] font-medium max-w-[420px] leading-10">{title}</h1>
            </div>
          </div>
          <div
            className={`flex flex-col justify-start items-center w-full h-fit pb-14 md:pb-28 ${
              color === 'light'
                ? 'bg-[#FFFFFF] text-dark'
                : color === 'dark'
                  ? 'bg-[#010101] text-white'
                  : 'bg-[#EEEEF1] text-dark'
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-medium leading-10 text-center py-8 md:py-16 whitespace-pre-line">
              {subtitle}
            </h1>
            <div className="grid grid-cols-2 gap-2 md:gap-5 mx-5 md:mx-40">
              {features.map((text, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center gap-2 shadow-xl h-48 rounded-xl border ${
                    color === 'dark' ? 'bg-[#131313] border-secondary' : 'bg-[white] border-primary'
                  }`}
                >
                  <img src={Checkmark.src} className="w-5 h-5 mx-auto" />
                  <h1 className="text-sm md:text-lg font-normal text-center mx-auto w-2/3">{text}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
