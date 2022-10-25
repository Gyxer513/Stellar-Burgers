cSpell:disable
import PropTypes from "prop-types";
import styles from "./orderDetails.module.css";
import doneImg from "../../images/done.png";

function OrderDetails({ orderId }) {

  return (
    <div className={styles.order}>
      <div className="m-10"></div>
      <h2 className="text text_type_digits-large">{orderId}</h2>
      <div className="m-5"></div>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <img className="m-10" src={doneImg} alt="Ваш заказ принят" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p
        className={`text text_type_main-default m-5 ${styles.order__colorText}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
      <div className="m-10"></div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired
};

export default OrderDetails;
