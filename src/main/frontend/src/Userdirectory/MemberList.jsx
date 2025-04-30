import React,{useEffect,useState} from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const tableStyle = {
    width: "80%",
    margin: "20px",
    border: "1px solid black",
    fontFamily: "sans-serif",
};
const thTdStyle ={
    border:'1px solid #ddd',
    padding:'10px 12px',
    textAlign:'left',
}


const thStyle = {
    border:'1px solid #ddd',
    padding:'10px 12px',
    textAlign:'center',
};

const tdStyle = {
    border:'1px solid #ddd',
    padding:'20px 12px',  //기존 패딩 유지
    textAlign:'center',
};

const h2Style= {
    textAlign:'center',
    marginBottom:'10px',
}

const pStyle={
    textAlign:'center',
    marginBottom: '20px',
    color:'#555',
}

function MemberList() {

    const [members, setMembers]=useState([]);
    //백엔드와 상호작용
    useEffect(()=> {
        //컴포넌트가 처음 렌더링될 때 백엔드에서 회원 리스트를 가져옴
    axiosInstance.get('/user/list')
        .then(response=> {
            console.log(response.data);
            setMembers(response.data);
        })
        .catch(error=> {
            console.error('회원 리스트 가져오기 실패:',error);
        });
    }, []);

    return (
        <div>
            <h2 style={h2Style}>회원목록</h2>
            <p style={pStyle}>총 {members.length}명의 회원이 있습니다.</p>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>회원번호</th>
                    <th style={thStyle}>아이디</th>
                    <th style={thStyle}>이름</th>
                    <th style={thStyle}>이메일</th>
                    <th style={thStyle}>카카오유저</th>
                    <th style={thStyle}>포인트</th>
                </tr>
                </thead>
                <tbody>{/*회원 데이터*/}
                {members.map((member, index)=>(
                    <tr key={index}>
                        <td style={tdStyle}>{member.id}</td>
                        <td style={tdStyle}>{member.userId}</td>
                        <td style={tdStyle}>{member.username}</td>
                        <td style={tdStyle}>{member.email}</td>
                        <td style={tdStyle}>{member.kakaouser}</td>
                        <td style={tdStyle}>{member.point}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MemberList;