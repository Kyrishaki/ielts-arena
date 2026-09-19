import React from "react";

export interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 28, className = "", ...props }: BrandLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="none"
      className={className}
      {...props}
    >
      {/* KHỐI ĐẦU & TAI CÚ MÈO TRI THỨC (Hình học phẳng, vát góc công nghệ) */}
      <path
        d="M128 160 L180 230 L332 230 L384 160 L364 360 Q256 420 148 360 Z"
        fill="#FF5722"
      />

      {/* VÙNG MẶT / KÍNH CÔNG NGHỆ AI (Tương phản trắng ngà) */}
      <path
        d="M164 240 Q256 260 348 240 Q356 340 256 376 Q156 340 164 240 Z"
        fill="#FFFFFF"
      />

      {/* ĐÔI MẮT THÔNG THÁI KẾT HỢP DẤU HOÁN ĐỔI DỊCH THUẬT (⇄) & NODE AI */}
      {/* Mắt trái (Ngôn ngữ nguồn) */}
      <circle cx="212" cy="290" r="30" fill="#0F172A" />
      <circle cx="218" cy="284" r="10" fill="#38BDF8" />

      {/* Mắt phải (Ngôn ngữ đích / Chấm bài) */}
      <circle cx="300" cy="290" r="30" fill="#0F172A" />
      <circle cx="306" cy="284" r="10" fill="#38BDF8" />

      {/* MỎ CÚ HÌNH KIM CƯƠNG / MŨI TÊN TIẾN BỘ ("QUA MÔN") */}
      <polygon points="256,310 242,336 256,348 270,336" fill="#F59E0B" />

      {/* TIA SÉT AI NĂNG LƯỢNG TRÊN TRÁN (Từ huy hiệu ⚡ AI Translation Engine) */}
      <path
        d="M260 120 L240 175 L258 175 L250 215 L276 160 L258 160 Z"
        fill="#FACC15"
      />
    </svg>
  );
}
