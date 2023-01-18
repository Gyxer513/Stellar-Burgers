/* cSpell:disable; */
import styles from "./burgerConstructor.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { deleteIngredient } from "../../services/reducers/ingredients";


const ConstructorItem = ({ data, id, moveIngredient, index }) => {
  const { image, name, price } = data;
  const {chosenIngredients } = useSelector(
    (state) => state.ingredientsReducer
  );
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: "chosen-ingredients",
    item: () => {
      return { id, index };
    },
  });

  const [, drop] = useDrop({
    accept: "chosen-ingredients",
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleDeleteIngredient = (item) => () => {
    const arrayClone = chosenIngredients.slice();
    arrayClone.splice(chosenIngredients.indexOf(item), 1);
    dispatch(deleteIngredient(arrayClone));
  };

  return (
    <li ref={ref} className={styles.burgerConstructor__elementBox}>
      <DragIcon type="primary" />
      <div className="m-5"></div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleDeleteIngredient(data)}
      />
    </li>
  );
};


export default ConstructorItem;
