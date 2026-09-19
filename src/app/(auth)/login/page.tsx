"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message.includes("Invalid login")
          ? "Email hoặc mật khẩu không đúng."
          : authError.message
      );
      setIsLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div className="bg-[#0F1623] border border-[rgba(129,140,248,0.2)] rounded-xl p-7 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white tracking-tight">Đăng nhập</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Tiếp tục hành trình chinh phục IELTS của bạn
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#450A0A] border border-[#EF4444]/30 mb-4">
            <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
            <p className="text-xs text-[#FCA5A5]">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
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

          {/* Submit */}
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
              <LogIn className="w-4 h-4" />
            )}
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-xs text-[#64748B]">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#818CF8] hover:text-white font-medium transition-colors">
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
