import React from "react";

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

const tdeditBtnStyle={
    padding:'15px 8px',
    border:'1px solid #ddd',
    textAlign:'center',
    verticalAlign:'middle',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}

const editBtn={
    padding:'6px 20px',
    border:'none',
    borderRadius:'4px',
    backgroundColor:'#ddd',
    color:'white',
    cursor:'pointer',
    fontSize:'14px',
}

const tddeleteBtnStyle={
    padding:'15px 8px',
    border:'1px solid #ddd',
    textAlign:'center',
    verticalAlign:'middle',

}

const deleteBtn={
    padding:'6px 20px',
    border:'none',
    borderRadius:'4px',
    backgroundColor:'#ddd',
    color:'white',
    cursor:'pointer',
    fontSize:'14px',
}
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
    return (
        <div>
            <h2 style={h2Style}>회원목록</h2>
            <p style={pStyle}>총 0명의 회원이 있습니다.</p>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>회원번호</th>
                    <th style={thStyle}>아이디</th>
                    <th style={thStyle}>암호</th>
                    <th style={thStyle}>이름</th>
                    <th style={thStyle}>권한</th>
                    <th style={thStyle}>가입일</th>
                    <th style={thStyle}>수정</th>
                    <th style={thStyle}>삭제</th>
                </tr>
                </thead>
                <tbody>{/*회원 데이터는 나중에 추가될 예정*/}
                <tr>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdeditBtnStyle}>{/*수정 버튼 추가*/}
                <button style={editBtn}>수정</button>
                </td>
                    <td style={tddeleteBtnStyle}>
                        <button style={deleteBtn}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdeditBtnStyle}>{/*수정 버튼 추가*/}
                        <button style={editBtn}>수정</button>
                    </td>

                    <td style={tddeleteBtnStyle}>
                    <button style={deleteBtn}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdeditBtnStyle}>{/*수정 버튼 추가*/}
                        <button style={editBtn}>수정</button>
                    </td>
                    <td style={tddeleteBtnStyle}>
                    <button style={deleteBtn}>삭제</button>
                </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MemberList;