export const Step02 = ({ form, alertTypes, handleChange, setStep, onSubmit, submitError, submitSuccess, isSubmitting }) => {
    const canSubmit = Boolean(form.birth) && Boolean(form.dreamJob) && Boolean(form.dreamDepartment) && !isSubmitting;

    return (
        <form
            className="column"
            style={{ gap: "48px" }}
            onSubmit={
                (e) => {
                    e.preventDefault();
                    if (canSubmit) {
                        onSubmit();
                    }
                }}
        >
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

                {submitError ? (
                    <p className="alert error" style={{ marginTop: "8px" }}>
                        {submitError}
                    </p>
                ) : null}

                {submitSuccess ? (
                    <p className="alert success" style={{ marginTop: "8px" }}>
                        {submitSuccess}
                    </p>
                ) : null}

            </div>

            <button className={`auth-btn ${canSubmit ? "enabled" : "disabled"}`} disabled={!canSubmit}>
                회원가입 완료
            </button>
            <button type="button" className="auth-btn enabled" onClick={() => setStep(1)}>
                뒤로가기
            </button>
        </form>
    )
}