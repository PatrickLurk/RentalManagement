import { useContext } from 'react';

import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = false;

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  function handleReservation() {
    console.log("handleReservation");
    cartCtx.addItem(meal);
    userProgressCtx.showReservation();
  }

  return (
    <li className="meal-item">
      <article>
        {/* <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} onClick={handleReservation}/> */}
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
