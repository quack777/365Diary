import React from "react";
import axios from "axios";
import { DeleteModal } from "../util/alert_modal/DeleteModal";

export default function TrashAllDeleteModal(props) {
  props.setGotrashdata(props.posts);
  let sendData = props.gotrashdata.slice();

  function goTrash() {
    sendData.map((data) => {
      delete data.answer;
      delete data.answer_date;
      delete data.answer_year;
      delete data.delete_date;
      delete data.public_answer;
      delete data.question;
      return data;
    });
    axios({
      url: "/trashes/all",
      method: "delete",
      baseURL: `${process.env.REACT_APP_SERVER_IP}`,
      data: sendData,
    })
      .then((response) => {
        console.log(response);
        props.setPosts([]);
        props.setOpenTrashAllDeleteModal(false);
      })
      .catch((error) => {
        props.history.push("/error");
      });
  }

  function xDelete() {
    props.setOpenTrashAllDeleteModal(false);
  }

  return (
    <DeleteModal content={"휴지통을"} xDelete={xDelete} goTrash={goTrash} />
  );
}
