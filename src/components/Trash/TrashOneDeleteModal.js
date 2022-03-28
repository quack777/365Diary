import React from "react";
import axios from "axios";
import { DeleteModal } from "../util/alert_modal/DeleteModal";

const TrashOneDeleteModal = ({ clickAN, member, posts, setPosts, setOpenDeleteModal, history }) => {
    const goTrash = () => {
        try {
            axios.delete(`${process.env.REACT_APP_SERVER_IP}/trashes/${clickAN[0]}`, {
                data: {
                    member_num: member,
                    answer_delete: clickAN[1],
                },
            });

            setPosts(posts.filter((data) => data.answer_num !== clickAN[0]));
            setOpenDeleteModal(false);
        } catch (error) {
            console.log("error: ", error);
            history.push("/error");
        }
    };

    const xDelete = () => {
        setOpenDeleteModal(false);
    };

    return <DeleteModal content={"일기를"} xDelete={xDelete} goTrash={goTrash} />;
};

export default TrashOneDeleteModal;
