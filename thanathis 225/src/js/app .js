/**
 * โครงสร้างสำหรับ Firebase Authentication (นำคอมเมนต์ออกเมื่อติดตั้ง Firebase SDK)
 * import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 * import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 * 
 * const firebaseConfig = {
 *   apiKey: "YOUR_API_KEY",
 *   authDomain: "YOUR_AUTH_DOMAIN",
 *   // ... setting อื่นๆ
 * };
 * const app = initializeApp(firebaseConfig);
 * const auth = getAuth(app);
 */

document.addEventListener('DOMContentLoaded', () => {
    // อ้างอิงถึง Elements ต่างๆ ใน DOM
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    const loadingIcon = document.getElementById('loadingIcon');
    const submitText = submitBtn.querySelector('span');

    // 1. ระบบ เปิด/ปิด การมองเห็นรหัสผ่าน (UX Improvement)
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'text') {
            togglePasswordBtn.innerHTML = `
                <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.188-1.583c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29" />
                </svg>`;
        } else {
            togglePasswordBtn.innerHTML = `
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>`;
        }
    });

    // 2. จัดการเมื่อกดปุ่ม Login (ป้องกันสแปมคลิก และจำลองการเชื่อมต่อ API)
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บ Refresh

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // UI State: Loading
        submitBtn.disabled = true;
        submitBtn.classList.replace('bg-blue-600', 'bg-blue-400');
        submitText.textContent = 'กำลังตรวจสอบ...';
        loadingIcon.classList.remove('hidden');

        try {
            /** 
             * ส่วนนี้คือจุดที่คุณจะเอา Firebase มาเสียบ
             * const userCredential = await signInWithEmailAndPassword(auth, email, password);
             * const user = userCredential.user;
             */
            
            // จำลองการดีเลย์ของเซิร์ฟเวอร์ (ลบออกเมื่อต่อ Firebase จริง)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // ตรวจสอบข้อมูลจำลอง
            if (email === 'admin@enterprise.com' && password === '12345678') {
                showToast('เข้าสู่ระบบสำเร็จ!', 'success');
                // window.location.href = 'dashboard.html'; // เปลี่ยนหน้าเมื่อสำเร็จ
            } else {
                throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
            }

        } catch (error) {
            console.error('Login Error:', error);
            showToast(error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
            
            // รีเซ็ตรหัสผ่านหากพิมพ์ผิด
            passwordInput.value = '';
            passwordInput.focus();
        } finally {
            // UI State: Reset
            submitBtn.disabled = false;
            submitBtn.classList.replace('bg-blue-400', 'bg-blue-600');
            submitText.textContent = 'ลงชื่อเข้าใช้';
            loadingIcon.classList.add('hidden');
        }
    });

    // 3. ฟังก์ชันสร้าง Toast Notification แทนที่การใช้ alert() แบบเดิมๆ
    function showToast(message, type = 'error') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        // กำหนดสีตามประเภท (Error = แดง, Success = เขียว)
        const bgColor = type === 'error' ? 'bg-red-50' : 'bg-emerald-50';
        const borderColor = type === 'error' ? 'border-red-200' : 'border-emerald-200';
        const textColor = type === 'error' ? 'text-red-800' : 'text-emerald-800';
        const iconColor = type === 'error' ? 'text-red-500' : 'text-emerald-500';

        const iconSvg = type === 'error' 
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;

        toast.className = `flex items-center w-full max-w-sm p-4 rounded-xl border shadow-lg ${bgColor} ${borderColor} toast-enter pointer-events-auto`;
        
        toast.innerHTML = `
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${iconColor}">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">${iconSvg}</svg>
            </div>
            <div class="ml-3 text-sm font-medium ${textColor}">${message}</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-black/5 ${textColor}" onclick="this.parentElement.remove()">
                <span class="sr-only">Close</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;

        toastContainer.appendChild(toast);

        // ตั้งเวลาลบ Toast ออกอัตโนมัติ (3 วินาที)
        setTimeout(() => {
            toast.classList.replace('toast-enter', 'toast-exit');
            setTimeout(() => toast.remove(), 300); // รอให้อนิเมชั่นจบก่อนลบ DOM
        }, 3000);
    }
});