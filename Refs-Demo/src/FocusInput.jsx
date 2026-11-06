import { useRef } from "react"
const FocusInput = () => {

    const inputRef = useRef(null);

    const handleInputFocus = () => {
        inputRef.current.focus();
    }

  return (
    <div>
        <input ref={inputRef} type="text" placeholder="Enter you name" />
        <button onClick={handleInputFocus}>Focus Input</button>
    </div>
  )
}

export default FocusInput
