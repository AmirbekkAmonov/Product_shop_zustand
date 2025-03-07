import { useEffect, useState } from "react";
import  useStore  from "@/store/useStore";
import API from "@/utils/API";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useStore();
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]); 

  const handleLogin = async () => {
      if (!username || !password) {
          return setError("Iltimos, barcha maydonlarni to'ldiring!");
      }
      setLoading(true);
      setError("");

      try {
        const res = await API.post("/login", { username, password });

        if (res.status === 200) {
            const data = res.data;
            login({
                name: `${data.firstName} ${data.lastName}`,
                username: data.username,
                avatar: data.image || "default-avatar.png",
                token: data.token,
            });
            onClose();
        } else {
            setError(res.data.message || "Login muvaffaqiyatsiz!");
        }
    } catch (err) {
        setError("Tarmoqda xatolik yuz berdi!");
    }

      setLoading(false);
  };

  if (!isOpen) return null;

  return (
      <div className="modal-overlay" onClick={onClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Sign In</h2>
              {error && <p className="error">{error}</p>}
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
              <button onClick={handleLogin} disabled={loading}>
              {loading ? "⏳ Please wait..." : "Login"}
              </button>
              <button className="close-btn" onClick={onClose}>Close</button>
          </div>
      </div>
  );
};


export default LoginModal;
