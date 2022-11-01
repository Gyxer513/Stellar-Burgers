/* cSpell:disable */
import styles from "./ingredientDetails.module.css";
import PropTypes from "prop-types";

function IngredientDetails({ title, ingredientData }) {
  const { image_large, name, calories, carbohydrates, fat, proteins } =
    ingredientData;

  return (
    <div className={`pl-10 pr-10 ${styles.ingredient}`}>
      <div className={`mt-10 ${styles.ingredient__top}`}>
        <h2 className="text text_type_main-large">{title}</h2>
      </div>
      <img className="mt-15 mb-15" src={image_large} alt="Ингредиент" />
      <p
        className={`text text_type_main-medium mt-4 mb-8 ${styles.ingredient__name}`}
      >
        {name}
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
          <p className={`${styles.ingredient__specifications}`}>{calories}</p>
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
            {carbohydrates}
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
          <p className={`${styles.ingredient__specifications}`}>{fat}</p>
        </li>
        <li
          className={`text text_type_main-default ${styles.ingredient__element}`}
        >
          <p
            className={`text text_type_main-default ${styles.ingredient__itemText}`}
          >
            Углеводы, г
          </p>
          <p className={`${styles.ingredient__specifications}`}>{proteins}</p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  ingredientData: PropTypes.any.isRequired,
};

export default IngredientDetails;
