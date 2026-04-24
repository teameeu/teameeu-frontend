export const LoginPage = () => {
    return(
        <div>
            <div>
                <p>웨이모와 함께 진로 지도를 그려요</p>
                <img src="/logo_login.svg" />
            </div>
            <form>
                <input></input>
                <input type="password"></input>
                <button>로그인</button>
            </form>
            <div className="row">
                <hr />
                <span>또는</span>
                <hr />
            </div>
            <div>
                <span>회원가입</span>
                <span>|</span>
                <span>비밀번호 찾기</span>
            </div>

        </div>
    )
}