import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setOpenEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setOpenAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setOpenEditAvatar] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getProfile()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        console.log(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        setOpenAddPlace(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      const newLike = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newLike);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((cardItem) => {
      setCards((arr) => arr.filter((c) => c._id !== card._id && cardItem));
    });
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        setOpenEditProfile(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    console.log(data.avatar);
    api
      .updateAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        setOpenEditAvatar(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImageOpen(true);
  }

  function handleEditAvatarClick() {
    setOpenEditAvatar(true);
  }

  function handleEditProfileClick() {
    setOpenEditProfile(true);
  }

  function handleAddPlaceClick() {
    setOpenAddPlace(true);
  }

  function closeAllPopups() {
    setOpenEditAvatar(false);
    setOpenEditProfile(false);
    setOpenAddPlace(false);
    setImageOpen(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImageOpen}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
