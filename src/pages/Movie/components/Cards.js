import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
const IMG_API = "https://image.tmdb.org/t/p/w500/";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div classNameName="modal-card">
      <div classNameName="modal-content-1">
        <div classNameName="header-1">
          <strong>{title}</strong>
        </div>
        <span classNameName="close" onClick={onClose}>
          &times;
        </span>
        {children}
        <button classNameName="button-ok" onClick={onClose}>
          okay
        </button>
      </div>
    </div>
  );
};

const Cards = ({ title, overview, vote_average, poster_path, popularity }) => {
  const { loading, error } = useSelector((s) => s.movies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="card-movie">
      <div className="card-details">
        <img src={IMG_API + poster_path} className="img-card" />
        <div className="textss">
          <p className="text-title">{title}</p>
          <p>{vote_average}</p>
        </div>
      </div>
      <button className="card-button" onClick={openModal}>
        More info
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <p>{overview}</p>
      </Modal>
    </div>
  );
};

export default Cards;
