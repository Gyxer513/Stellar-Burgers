/* cSpell:disable */
import React from "react";
import styles from "./Login.module.css";
import {
    Input,
    Button,
    PasswordInput,
  } from "@ya.praktikum/react-developer-burger-ui-components";



  const Login = () => {
    const [emailValue, setEmailValue] = React.useState("");
    return (
        <>
        <p className="m-10 text text_type_main-default">Ну-ка вводи данные карты бысто=)</p>
        <div className="mt-6 mb-6">
          <Input
            type={"text"}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder={"E-mail"}
            value={""}
            name={"e-mail"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mt-6 mb-6">
        <Input
          type={"text"}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder={"E-mail"}
          value={""}
          name={"e-mail"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
        </>
        
    )
  };

  export default Login;