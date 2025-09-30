'use client'

import { useState } from 'react'

interface AccordionProps {
  type:
    | 'vaccination'
    | 'anthelmintic'
    | 'medical'
    | 'other-treatments'
    | 'food-journal'
    | 'walk'
    | 'other-jurnals'
  title: string
}

export default function Accordion({ type, title }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(prop => !prop)
  }

  const selectTypeIcon = () => {
    switch (type) {
      case 'vaccination':
        return 'vaccination-icon'
      case 'anthelmintic':
        return 'anthelmintic-icon'
      case 'medical':
        return 'medical-icon'
      case 'other-treatments':
        return 'other-treatments-icon'
      case 'food-journal':
        return 'food-journal-icon'
      case 'walk':
        return 'walk-icon'
      case 'other-jurnals':
        return 'other-jurnals-icon'
    }
  }

  console.log(isOpen)
  return (
    <section className="accordion-box flex max-w-160 flex-col rounded-2xl border-2 border-gray-300 active:border-amber-300">
      <button
        onClick={handleClick}
        aria-label={isOpen ? '열림 전환' : '닫힘 전환'}
        className="m-0 flex grow cursor-pointer items-center gap-5 p-5 text-left"
      >
        <img
          src={`/components/accordion/${selectTypeIcon()}.svg`}
          alt={selectTypeIcon()}
        />
        <p className="grow text-lg font-bold">{title}</p>
        <span className="relative flex h-[24px] w-[24px] items-center justify-center">
          <img
            src="/components/accordion/plus-button-icon.svg"
            alt="plus"
            className={`absolute transition-all duration-300 ${isOpen ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
          />
          <img
            src="/components/accordion/subtraction-buttons-icon.svg"
            alt="minus"
            className={`absolute transition-all duration-300 ${isOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
          />
        </span>
      </button>
      <div className="accordion-item">
        <AccordionItemBox isOpen={isOpen}></AccordionItemBox>
      </div>
    </section>
  )
}

interface AccordionItemProps {
  isOpen: boolean
}

export function AccordionItemBox({ isOpen }: AccordionItemProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${
        isOpen ? 'max-h-[500px]' : 'max-h-0'
      }`}
    >
      <h3>2025</h3>
      <AccordionListItem title="Nobivac KV"></AccordionListItem>
      <h3>2024</h3>
      <h3>2024</h3>
      <h3>2024</h3>
      <h3>2024</h3>
      <h3>2024</h3>
    </div>
  )
}

interface AccordionListItemProps {
  title: string
}

export function AccordionListItem({ title }: AccordionListItemProps) {
  return (
    <div className="p- rounded-2xl border border-gray-300">
      <h1>{title}</h1>
    </div>
  )
}
