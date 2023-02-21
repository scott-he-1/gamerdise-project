import {
  faHouse,
  faSackDollar,
  faShoppingCart,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MiniCartItem } from "../components/MiniCartItem/MiniCartItem";
import { NotificationItem } from "../components/Notifications/Notifications";
import { useGamerdise } from "../providers/GamerdiseProvider";
import "./Layout.css";

export const Layout = () => {
  const [notificationBoard, setNotificationBoard] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const {
    marketItems,
    userCartItems,
    removeCartItem,
    loggedIn,
    currentAccountID,
    userNotifications,
    removeNotification,
  } = useGamerdise();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("loggedInAs");
    navigate("/");
    window.location.reload();
  };

  const currentCartItems = userCartItems.filter(
    (cartItem) => Number(cartItem.inCartForUser) === Number(currentAccountID)
  );

  const currentUserNotifications = userNotifications.filter(
    (notification) => notification.notificationForUser === currentAccountID
  );

  const routeOptions = [
    { id: 0, label: <FontAwesomeIcon icon={faHouse} />, linkTo: "/" },
    {
      id: 1,
      label: <FontAwesomeIcon icon={faSackDollar} />,
      linkTo: loggedIn ? "/sellAnItem" : "/login",
    },
    {
      id: 2,
      label: <FontAwesomeIcon icon={faShoppingCart} />,
      linkTo: "/checkout",
      requiresLogin: true,
      showHover: () => setShowMiniCart(true),
      removeHover: () => setShowMiniCart(false),
      hoverElement: showMiniCart && (
        <div
          className="hoverTray"
          onMouseEnter={() => setShowMiniCart(true)}
          onMouseLeave={() => setShowMiniCart(false)}
        >
          {currentCartItems.length > 0 ? (
            currentCartItems.map((cartItem) => {
              const itemToMap = marketItems.find(
                (marketItem) => Number(marketItem.id) === Number(cartItem.marketplaceID)
              );
              return (
                <MiniCartItem
                  key={itemToMap.id}
                  name={itemToMap.name}
                  id={cartItem.id}
                  image={itemToMap.image}
                  price={itemToMap.price}
                  removeCartItem={removeCartItem}
                />
              );
            })
          ) : (
            <div>No Items in Cart</div>
          )}
        </div>
      ),
    },
    {
      id: 3,
      label: <FontAwesomeIcon icon={faBell} />,
      linkTo: "/",
      disabledLink: true,
      requiresLogin: true,
      accessoryElement: currentUserNotifications.length ? (
        <div className="notificationCounter">
          {currentUserNotifications.length}
        </div>
      ) : null,
      showHover: () => setNotificationBoard(true),
      removeHover: () => setNotificationBoard(false),
      hoverElement: notificationBoard && (
        <div
          className="hoverTray"
          onMouseEnter={() => setNotificationBoard(true)}
          onMouseLeave={() => setNotificationBoard(false)}
        >
          {currentUserNotifications.length > 0 ? (
            currentUserNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                message={notification.message}
                removeNotification={removeNotification}
              />
            ))
          ) : (
            <div>Nothing to show</div>
          )}
        </div>
      ),
    },
    loggedIn
      ? {
          id: 4,
          label: <FontAwesomeIcon icon={faUser} />,
          linkTo: "/",
          disabledLink: true,
          requiresLogin: true,
          showHover: () => setShowAccountOptions(true),
          removeHover: () => setShowAccountOptions(false),
          hoverElement: showAccountOptions && (
            <div
              className="hoverElement"
              onMouseEnter={() => setShowAccountOptions(true)}
              onMouseLeave={() => setShowAccountOptions(false)}
            >
              <button onClick={logout}>Logout</button>
            </div>
          ),
        }
      : { id: 5, label: "Login", linkTo: "/login" },
  ];

  return (
    <>
      <div className="menu">
        <div className="menuTitle pusher">
          <Link to={"/"}>Gamerdise</Link>
        </div>
        <nav className="navbar">
          <ul>
            {routeOptions.map((option) => {
              if (option.requiresLogin && !loggedIn) {
                return;
              } else {
                return (
                  <div key={option.id} className="menuIcon">
                    <li
                      className="navOption"
                      onMouseEnter={
                        option.showHover ? option.showHover : () => {}
                      }
                      onMouseLeave={
                        option.removeHover ? option.removeHover : () => {}
                      }
                    >
                      <Link
                        to={option.linkTo}
                        className={option.disabledLink ? "disabledLink" : ""}
                      >
                        {option.label}
                      </Link>
                    </li>
                    {option.hoverElement && option.hoverElement}
                    {option.accessoryElement && option.accessoryElement}
                  </div>
                );
              }
            })}
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
