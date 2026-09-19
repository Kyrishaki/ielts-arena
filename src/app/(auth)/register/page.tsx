"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle, Target } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const BAND_OPTIONS = ["4.0","4.5","5.0","5.5","6.0","6.5","7.0","7.5","8.0","8.5","9.0"];

const BAND_LABELS: Record<string, string> = {
  "4.0": "4.0 — Mới bắt đầu",
  "4.5": "4.5 — Cơ bản",
  "5.0": "5.0 — Tiền trung cấp",
  "5.5": "5.5 — Trung cấp thấp",
  "6.0": "6.0 — Trung cấp",
  "6.5": "6.5 — Trung cấp cao",
  "7.0": "7.0 — Trên trung cấp",
  "7.5": "7.5 — Nâng cao",
  "8.0": "8.0 — Chuyên sâu",
  "8.5": "8.5 — Thành thạo",
  "9.0": "9.0 — Bản ngữ",
};

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bandTarget, setBandTarget] = useState("7.0");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split("@")[0],
          band_target: parseFloat(bandTarget),
        },
      },
    });

    if (authError) {
      setError(
        authError.message.includes("already registered")
          ? "Email này đã được đăng ký. Hãy đăng nhập thay thế."
          : authError.message
      );
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);

    // Auto redirect after 2s
    setTimeout(() => router.push("/"), 2000);
  };

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="bg-[#0F1623] border border-[rgba(52,211,153,0.3)] rounded-xl p-8">
          <div className="w-14 h-14 rounded-full bg-[#064E3B] border border-[#34D399]/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Đăng ký thành công!</h2>
          <p className="text-xs text-[#64748B] mb-4">
            Chào mừng bạn đến với IELTS Arena. Đang chuyển hướng...
          </p>
          <div className="w-6 h-6 border-2 border-[#34D399]/30 border-t-[#34D399] rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-[#0F1623] border border-[rgba(129,140,248,0.2)] rounded-xl p-7 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white tracking-tight">Tạo tài khoản</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Bắt đầu hành trình chinh phục IELTS với AI
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#450A0A] border border-[#EF4444]/30 mb-4">
            <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
            <p className="text-xs text-[#FCA5A5]">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">Tên hiển thị</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full h-10 px-3 rounded-lg bg-[#080C14] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder-[#334155] focus:border-[#818CF8] focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-[#080C14] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder-[#334155] focus:border-[#818CF8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full h-10 pl-9 pr-10 rounded-lg bg-[#080C14] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder-[#334155] focus:border-[#818CF8] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Band Target */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94A3B8] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#22C55E]" />
              Band mục tiêu của bạn
            </label>
            <select
              value={bandTarget}
              onChange={(e) => setBandTarget(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#080C14] border border-[rgba(255,255,255,0.08)] text-sm text-white focus:border-[#818CF8] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {BAND_OPTIONS.map((b) => (
                <option key={b} value={b} className="bg-[#0F1623]">
                  {BAND_LABELS[b]}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full h-10 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: isLoading
                ? "#1C2636"
                : "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
            }}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            {isLoading ? "Đang tạo tài khoản..." : "Đăng ký miễn phí"}
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-xs text-[#64748B]">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-[#818CF8] hover:text-white font-medium transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
