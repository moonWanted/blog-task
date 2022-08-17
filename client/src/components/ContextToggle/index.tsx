import React, { useContext } from 'react'
import { AccordionContext } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Button from 'react-bootstrap/Button'

interface ToggleProps {
  children: React.ReactNode;
  eventKey: string;
  size?: 'sm' | 'lg';
  callback?: (eventKey: string) => void;
}

function ContextToggle(props: ToggleProps): JSX.Element {
  const { children, eventKey, callback, size = 'sm' } = props
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => activeEventKey !== eventKey && callback && callback(eventKey),
  )


  return (
    <Button
      type="button"
      className="ms-auto"
      variant="secondary"
      size={size}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  )
}

export default ContextToggle