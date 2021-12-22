import React, { useEffect, useState } from "react";
import "../styles/Trash.css";
import delete_normal from "../styles/images/delete_normal.png";
import restore_normal from "../styles/images/restore_normal.png";
import Line from "../styles/images/Line45.png";
import axios from "axios";
import xxxxx from "../styles/images/xxxxx.png";

function Trash() {
  const [member, setMember] = useState();
  const [trashAllData, setTrashAlldata] = useState(["answer"]); // "answer" => [] 변경
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrashAllDeleteModal, setOpenTrashAllDeleteModal] = useState(false);
  const [clickAN , setClickAN] = useState(); // deleteModal로 trashAllData의 answer_num 넘기기 위해 필요한 것
  const [gotrashdata, setGotrashdata] = useState([]); // TrashAllDeleteModal에서 휴지통 전체 비우기 api에 보내줄 Data
  
  // 가상 데이터
  const setData = [
    {
      question_num: "344",
      answer_date: "1209",
      answer_year: "2022",
      answer: "똥1",
      answer_num: 1,
    },
    {
      question_num: "344",
      answer_date: "1209",
      answer_year: "2021",
      answer: "똥1",
      answer_num: 2,
    },
    {
      question_num: "344",
      answer_date: "1209",
      answer_year: "2020",
      answer: "똥1",
      answer_num: 3,
    },
    {
      question_num: "343",
      answer_date: "1208",
      answer_year: "2022",
      answer: "똥2",
      answer_num: 4,
    },
    {
      question_num: "343",
      answer_date: "1208",
      answer_year: "2021",
      answer: "똥2",
      answer_num: 5,
    },
    {
      question_num: "343",
      answer_date: "1208",
      answer_year: "2020",
      answer: "똥2",
      answer_num: 6,
    },
    {
      qustion_num: "342",
      answer_date: "1207",
      answer_year: "2022",
      anwer:
        "나는 엄마....... 왜냐하면 엄마는 크게 뭔가를 해주는 티를 내지는 않지만 매번 알게 모르게 날 챙겨주니까. 어릴땐 엄마 잔소리가 마냥 싫었는데, 이젠 그 잔소리에서 사랑이 뚝뚝 떨어진다는 사실을 나는 알아버렸으니까. 아빠 미안해 ^^ 조만간 부모님을 뵈러 본가에 가야겠다. 부모님이 좋아하는 떡이랑 과일 사들고 가야지.",
      answer_num: 7,
    },
  ];

  useEffect(() => {
    // 첫 렌더링 때 usestate => member에 값 저장해서 Trash 컴포넌트 전체에서 member_num이 필요할 때 사용할 수 있게함
    const member_num = localStorage.getItem("member_num");
    console.log(member_num);
    setMember(Number(member_num));

    // 휴지통 전체 조회 api
    axios({
      url: "/trashes/1", //임시 1, `/trashes/${member_num}`
      method: "get",
      baseURL: "http://61.72.99.219:9130",
    })
      .then(function (response) {
        console.log(response.data);
        setTrashAlldata(response.data); // 휴지통 전체 데이터 trashAllData에 저장
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // 렌더링 didupdate unmount 다시 생각해보기!!!!!!!!!!!

  function allClear() {
    setOpenTrashAllDeleteModal(true); // 모달 창 열어주기
  }

  function oneRemove(answer_num) {
    setOpenDeleteModal(true); // 모달 창 열어주기
    setClickAN(answer_num); // 모달 창에서 answer_num사용할 수 있게 clickAN에 값 저장
  }

  function revert(answer_num, answer_delete, delete_date) {
    console.log(answer_num)
    console.log(answer_delete)
    console.log(delete_date)
    axios({
      url: `/trashes/settings/${answer_num}/1`, // `/trashes/settings/${answer_num}/${member_num}`
      method: "patch",
      baseURL: "http://61.72.99.219:9130",
      data: {
        answer_delete: answer_delete, // N or Y
        delete_date: delete_date, //date타입
      }
    })
      .then(function (response) {
        console.log(response);
        setTrashAlldata(
          trashAllData.filter((data) => data.answer_num !== answer_num)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="Trash">
      <div>
        <p>휴지통</p>
        <p onClick={allClear}>휴지통 비우기</p>
      </div>
      <p>휴지통에 있는 일기는 7일이 지나면 완전히 삭제됩니다</p>
      <section>
        {trashAllData.map((data, index) => {
          return (
            <div>
              <hr></hr>
              <div className="question">
                <p>
                  {data.answer_date && data.answer_date.substring(0, 2)}월{" "}
                  {data.answer_date && data.answer_date.substring(2, 4)}일
                </p>
                <p>{data.question_num}api호출</p> {/* 백에서 question데이터 담아주기로 함 => data.question */}
              </div>
              <div className="answers">
                <p>{data.answer_year}년의 나:</p>
                <p>{data.answer}</p>
              </div>
              <div className="btns">
                <img
                  onClick={() => revert(data.answer_num, data.answer_delete, data.delete_date)}
                  alt="복원"
                  src={restore_normal}
                ></img>
                <img src={Line}></img>
                <img
                  onClick={() => oneRemove(data.answer_num)}
                  alt="삭제"
                  src={delete_normal}
                ></img>
              </div>
            </div>
          );
        })}
      {openDeleteModal?
      <DeleteModal 
        setOpenDeleteModal={setOpenDeleteModal}
        oneRemove={oneRemove}
        clickAN={clickAN} 
        member={member}
        trashAllData={trashAllData}
        setTrashAlldata={setTrashAlldata}
      />
      :null}
      {openTrashAllDeleteModal?
      <TrashAllDeleteModal 
        setOpenTrashAllDeleteModal={setOpenTrashAllDeleteModal}
        trashAllData={trashAllData}
        setTrashAlldata={setTrashAlldata}
        gotrashdata={gotrashdata}
        setGotrashdata={setGotrashdata}
      />
      :null}
      </section>
      <div className="backColor"></div>
      <div id="backTrash"></div>
    </div>
  );
}

function DeleteModal(props) {
  function goTrash() {
    axios({
      url: `/trashes/${props.clickAN}`, // /answers/trashes/{answer_num}/{member_num}
      method: "delete",
      baseURL: "http://61.72.99.219:9130",
      data: {
        member_num : 1 //props.member
      }
    })
      .then(function (response) {
        props.setTrashAlldata(
          props.trashAllData.filter((data) => data.answer_num !== props.clickAN)
        ) // trashAllData가 디비에서 하나 빠졌으니까 자체에서도 값을 빼줘야 화면에서도 빠지기 떄문에 거르기
        console.log(response);
        props.setOpenDeleteModal(false); // 성공했으니까 모달 창 다시 닫기
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function xDelete() {
    props.setOpenDeleteModal(false);
  }
  return (
    <div className="deleteModal">
      <img onClick={xDelete} src={xxxxx}></img>
      <p>답변을 정말 삭제하시겠어요?</p>
      <p>휴지통에서 삭제하면 답변을 복구할 수 없습니다</p>
      <section>
        <p onClick={goTrash}>삭제하기</p>
        <p onClick={xDelete}>취소하기</p>
      </section>
    </div>
  );
}

function TrashAllDeleteModal(props) {
  let sendData = props.trashAllData;
  console.log(sendData);
  function goTrash() {
    let a = sendData.map(data => { // axios api 호출 할 때 넘길 데이터 정리
      delete data.answer
      delete data.answer_date
      delete data.answer_year
      delete data.delete_date
      delete data.public_answer
      return(
        data
      )
    })
    props.setGotrashdata(a)
    console.log(props.gotrashdata)
    const setdata = props.gotrashdata;
    axios({
      url: "/trashes/all",
      method: "delete",
      baseURL: "http://61.72.99.219:9130",
      data: {
        setdata
      }
    })
      .then((response) => {
        console.log(response);
        props.setTrashAlldata(["answer"]); // trashAllData모두 삭제
        props.setGotrashdata([]); 
        props.setOpenTrashAllDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function xDelete() {
    props.setOpenTrashAllDeleteModal(false);
  }
  return (
    <div className="deleteModal">
      <img onClick={xDelete} src={xxxxx}></img>
      <p>휴지통을 정말 비우시겠어요?</p>
      <p>휴지통에서 삭제하면 답변을 복구할 수 없습니다</p>
      <section>
        <p onClick={goTrash}>삭제하기</p>
        <p onClick={xDelete}>취소하기</p>
      </section>
    </div>
  );
}

export default Trash;
