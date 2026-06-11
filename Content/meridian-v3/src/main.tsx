import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import StudentPortal from './components/StudentPortal.tsx';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path.endsWith('student.html') || path.endsWith('/student') ? <StudentPortal language="ES" /> : <App />}
  </StrictMode>,
);
