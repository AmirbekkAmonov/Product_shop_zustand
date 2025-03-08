import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/store/useStore";
import API from "@/utils/API";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useStore();
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await API.post("/auth/login", { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      login({
        name: `${data.firstName} ${data.lastName}`,
        username: data.username,
        avatar: data.image || "default-avatar.png",
        token: data.token,
      });
      onClose();
    },
    onError: () => {
      alert("❌ Login xatosi! Iltimos, foydalanuvchi ma'lumotlarini tekshiring.");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("⚠️ Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    mutation.mutate(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={mutation.isLoading}>
          {mutation.isLoading ? "⏳ Please wait..." : "Login"}
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
