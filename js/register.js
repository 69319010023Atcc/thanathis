
document.addEventListener("DOMContentLoaded", function () {

    const studentBtn = document.getElementById("studentBtn");
    const teacherBtn = document.getElementById("teacherBtn");

    const roleInput = document.getElementById("role");
    const roleMessage = document.getElementById("roleMessage");

    const userIdLabel = document.getElementById("userIdLabel");
    const userIdInput = document.getElementById("userId");

    function selectRole(role) {

        // ล้างสีปุ่มเดิม
        studentBtn.classList.remove("active");
        teacherBtn.classList.remove("active");

        if (role === "student") {

            studentBtn.classList.add("active");

            roleInput.value = "student";

            roleMessage.textContent =
                "คุณกำลังลงทะเบียนในฐานะนักศึกษา";

            userIdLabel.textContent = "รหัสนักศึกษา";
            userIdInput.placeholder = "กรอกรหัสนักศึกษา";

        } else {

            teacherBtn.classList.add("active");

            roleInput.value = "teacher";

            roleMessage.textContent =
                "คุณกำลังลงทะเบียนในฐานะอาจารย์";

            userIdLabel.textContent = "รหัสอาจารย์";
            userIdInput.placeholder = "กรอกรหัสอาจารย์";

        }
    }

    studentBtn.addEventListener("click", function () {
        selectRole("student");
    });

    teacherBtn.addEventListener("click", function () {
        selectRole("teacher");
    });

});
