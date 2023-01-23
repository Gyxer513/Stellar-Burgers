/* cSpell:disable */
import styles from "./ingredientDetails.module.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAppSelector } from "../../services/store";
import { Iingredient } from "../../services/types/ingredients";

function IngredientDetails() {
  const { id } = useParams<any>();
  const { ingredients } = useAppSelector((state) => state?.ingredientsReducer);
  
  let selectedIngredient = null;

  if (ingredients.length < 1) {
    return <Loader />;
  }

  if (ingredients.length > 0) {
    selectedIngredient = ingredients?.find(
      (ingredient: Iingredient) => ingredient._id.toString() === id
    );
  }

  return (
    <div className={`pl-10 pr-10 ${styles.ingredient}`}>
      <div className={`mt-10 ${styles.ingredient__top}`}>
        <h2 className="text text_type_main-large">{"Детали ингридиента"}</h2>
      </div>
      <img className="mt-15 mb-15" src={selectedIngredient?.image_large} alt="Ингредиент" />
      <p
        className={`text text_type_main-medium mt-4 mb-8 ${styles.ingredient__name}`}
      >
        {selectedIngredient?.name}
      </p>
      <ul
        className={`text text_type_main-default mb-15 ${styles.ingredient__listBox}`}
      >
        <li
          className={`text text_type_main-default ${styles.ingredient__element}`}
        >
          <p
            className={`text text_type_main-default ${styles.ingredient__itemText}`}
          >
            Калории,ккал
          </p>
          <p className={`${styles.ingredient__specifications}`}>{selectedIngredient?.calories}</p>
        </li>
        <li
          className={`text text_type_main-default ${styles.ingredient__element}`}
        >
          <p
            className={`text text_type_main-default ${styles.ingredient__itemText}`}
          >
            Белки, г
          </p>
          <p className={`${styles.ingredient__specifications}`}>
            {selectedIngredient?.carbohydrates}
          </p>
        </li>
        <li
          className={`text text_type_main-default ${styles.ingredient__element}`}
        >
          <p
            className={`text text_type_main-default ${styles.ingredient__itemText}`}
          >
            Жиры, г
          </p>
          <p className={`${styles.ingredient__specifications}`}>{selectedIngredient?.fat}</p>
        </li>
        <li
          className={`text text_type_main-default ${styles.ingredient__element}`}
        >
          <p
            className={`text text_type_main-default ${styles.ingredient__itemText}`}
          >
            Углеводы, г
          </p>
          <p className={`${styles.ingredient__specifications}`}>{selectedIngredient?.proteins}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
