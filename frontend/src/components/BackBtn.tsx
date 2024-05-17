
function BackBtn() {
  const handleClick = () => {
    window.history.back();
    window.scrollTo(0, 0); // Scroll to top of page
  }
  return (
    <button onClick={handleClick}>Back</button>
  );
}

export default BackBtn;

// An backbutton that goes back to the previous page for the user. Excluded for login, signup and app view.
