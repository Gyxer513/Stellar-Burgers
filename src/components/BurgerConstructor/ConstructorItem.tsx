/* cSpell:disable; */
import styles from "./burgerConstructor.module.css";
import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { deleteIngredient } from "../../services/reducers/ingredients";
import { useAppSelector, AppDispatch } from "../../services/store";
import { Iingredient } from "../../services/types/ingredients";
import { IConstructorItem } from "../../services/types/types";

const ConstructorItem: FC<IConstructorItem> = ({
  data,
  id,
  moveIngredient,
  index,
}) => {
  const { image, name, price } = data;
  const { chosenIngredients } = useAppSelector(
    (state) => state.ingredientsReducer
  );
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [, drag] = useDrag({
    type: "chosen-ingredients",
    item: () => {
      return { id, index };
    },
  });

  const [, drop] = useDrop({
    accept: "chosen-ingredients",
    drop(item: { id: string; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      console.log(item);

      const dragIndex = item?.index;
      let hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      hoverIndex = item.index;
    },
  });

  drag(drop(ref));

  const handleDeleteIngredient = (item: Iingredient | unknown) => () => {
    const arrayClone = chosenIngredients.slice();
    // @ts-ignore
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
