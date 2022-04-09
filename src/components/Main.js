import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const getCardsRequest = () => {
    api
      .getCards()
      .then((res) => {
        const data = res.map((item) => {
          return {
            name: item.name,
            link: item.link,
            likes: item.likes,
            id: item._id,
          };
        });
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getCardsRequest();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div
          onClick={props.onEditAvatar}
          className="profile__image"
          style={{
            backgroundImage: `url(${userAvatar})`,
          }}
        ></div>
        <div className="profile__text">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          onClick={props.onEditProfile}
          className="profile__button-edit"
          type="button"
        ></button>
        <button
          onClick={props.onAddPlace}
          className="profile__button-add"
          type="button"
        ></button>
      </section>

      <ul className="cards">
        {cards.map((item) => {
          return (
            <Card
              card={item}
              onImageClick={props.onCardClick}
              key={item.id}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
