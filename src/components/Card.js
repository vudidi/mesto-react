function Card(props) {

  function handleClick () {
    props.onImageClick(props.card);
  }

  return (
    <li className="card">
      <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>      
      <div className="card__panel">
        <h3 className="card__title">{props.card.name}</h3>
        <button className="card__delete" type="button"></button>
        <div className="card__like">
          <button className="card__like-icon" type="button"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
