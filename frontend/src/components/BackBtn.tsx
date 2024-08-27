import "../assets/BackBtn.css"

function BackBtn() {
  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <input type="button" onClick={handleClick} className="backBtn" value="Back to Top"/>
  );
}

export default BackBtn;
