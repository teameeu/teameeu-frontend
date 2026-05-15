export const Step02 = ({ form, alertTypes, handleChange, setStep }) => {
    return (
        <form className="column" style={{ gap: "48px" }}>
            <div>
                <div style={{ gap: "8px", alignItems: "center" }}>
                    <p className="form-label">생년월일</p>

                    <input
                        name="birth"
                        placeholder="YYYY-MM-DD"
                        value={form.birth}
                        onChange={handleChange}
                    />

                    <p className={`alert ${form.birth ? "success" : "error"}`}>
                        {form.birth
                            ? alertTypes.birth.success
                            : alertTypes.birth.error}
                    </p>
                </div>
                <div style={{ gap: "8px", alignItems: "center" }}>
                    <p className="form-label">희망 직업</p>

                    <input
                        name="dreamJob"
                        placeholder="희망 직업을 입력하세요."
                        value={form.dreamJob}
                        onChange={handleChange}
                    />

                    <p className={`alert ${form.dreamJob ? "success" : "error"}`}>
                        {form.dreamJob
                            ? alertTypes.dreamJob.success
                            : alertTypes.dreamJob.error}
                    </p>
                </div>
                <div style={{ gap: "8px", alignItems: "center" }}>
                    <p className="form-label">희망 학과</p>

                    <input
                        name="dreamDepartment"
                        placeholder="희망 학과를 입력하세요."
                        value={form.dreamDepartment}
                        onChange={handleChange}
                    />

                    <p className={`alert ${form.dreamDepartment ? "success" : "error"}`}>
                        {form.dreamDepartment   
                            ? alertTypes.dreamDepartment.success
                            : alertTypes.dreamDepartment.error}
                    </p>
                </div>
            </div>
            <button className={`auth-btn ${form.birth && form.dreamJob && form.dreamDepartment ? "enabled" : "disabled"}`} disabled={!form.birth || !form.dreamJob || !form.dreamDepartment}>
                다음으로
            </button>
            <button className={`auth-btn enabled"}`} onClick={() => setStep(1)}>
                뒤로가기
            </button>
        </form>
    )
}