import {useRef, useEffect} from 'react'
import classes from '../styles/components/Modal.module.css'

const Modal = ({children, isOpen, close}) => {
    const dialog = useRef()
    
    useEffect(() => {
        if (isOpen) {
            dialog.current.showModal()
        } else {
            dialog.current.close()
        }
    }, [isOpen])

    const checkWhereClicked = ({target, currentTarget}) => {
        if (target === currentTarget) { close() }
    }

    return (
        <>
            <dialog ref={dialog} onClick={checkWhereClicked}>
                <div className={classes.modalWrapper}>{children}</div>
            </dialog>
        </>
    )
}

export default Modal