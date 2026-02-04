import {useRef} from 'react';
import Button from './Button';

export default function AboutDialog() {
  let dialog  = useRef(null);

  function openDialog() {dialog.current.showModal()}
  function closeDialog() {dialog.current.close()}

  // would love to use `command` and `commandfor` instead of JS
  // but adoption is still low. Maybe should get a polyfill...
  return (
    <>
    <Button 
      id="open-about-dialog-button" 
      onClick={openDialog}
      title="Open About Dialog"
      text="?" />


    <dialog id="about-dialog" ref={dialog} closedby="any">
      <div id="about-dialog-header">
        <Button 
          id="about-dialog-close-button" 
          autoFocus 
          title="Close Dialog"
          onClick={closeDialog}
          >
          &times;
        </Button>
      </div>
      <p>
        Welcome! <br/><br/>

        This app was created by Anne Bischof as an excercise in
        React and inspired by running out of Kismet score cards.<br/><br/>

        Kismet is basically Yatzee, but not.
      </p>
    </dialog>
    </>
  )
}