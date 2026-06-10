import { auth, db } from './firebase-init.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotForm = document.getElementById('forgotForm');

// Check Auth State on Load
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, check role and redirect if on login page
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const role = docSnap.data().role;
                if (role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'student.html';
                }
            }
        }
    }
});

// Register
if(registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        
        const adminEmails = ['adrian.pastor.medina@gmail.com', 'adrian.pastor.medina.hvtsp@gmail.com'];
        const role = adminEmails.includes(email) ? 'admin' : 'student';

        try {
            window.showToast('Creando cuenta...', 'info');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user profile to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                role: role,
                createdAt: new Date().toISOString(),
                remainingHours: role === 'student' ? 0 : null
            });

            window.showToast('Cuenta creada exitosamente', 'success');
            // Redirection is handled by onAuthStateChanged
        } catch (error) {
            console.error(error);
            window.showToast(error.message, 'error');
        }
    });
}

// Login
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            window.showToast('Iniciando sesión...', 'info');
            await signInWithEmailAndPassword(auth, email, password);
            // Redirection is handled by onAuthStateChanged
        } catch (error) {
            console.error(error);
            window.showToast('Correo o contraseña incorrectos', 'error');
        }
    });
}

// Forgot Password
if(forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        try {
            await sendPasswordResetEmail(auth, email);
            window.showToast('Correo de recuperación enviado', 'success');
            setTimeout(() => window.toggleLoginMode(), 2000);
        } catch (error) {
            console.error(error);
            window.showToast(error.message, 'error');
        }
    });
}
