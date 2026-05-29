"use client";

type MemeCatProps = {
  size?: number;
  className?: string;
};

export default function MemeCat({
  size = 220,
  className = "",
}: MemeCatProps) {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: size,
        height: size * 0.9,
      }}
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-[#ff4002]/10 blur-3xl" />

      {/* left ear */}
      <div
        className="absolute rounded-t-full border-[4px] border-black bg-[#c9b7af] rotate-[-8deg]"
        style={{
          width: size * 0.18,
          height: size * 0.32,
          left: size * 0.28,
          top: size * 0.02,
        }}
      />

      {/* right ear */}
      <div
        className="absolute rounded-t-full border-[4px] border-black bg-[#c9b7af] rotate-[8deg]"
        style={{
          width: size * 0.18,
          height: size * 0.3,
          left: size * 0.52,
          top: size * 0.04,
        }}
      />

      {/* head */}
      <div
        className="absolute rounded-[50%] border-[5px] border-black bg-[#fffdfd]"
        style={{
          width: size * 0.82,
          height: size * 0.46,
          left: size * 0.09,
          top: size * 0.24,
        }}
      />

      {/* center fur */}
      <div
        className="absolute rounded-[40%] bg-[#b8a39c]/60"
        style={{
          width: size * 0.28,
          height: size * 0.3,
          left: size * 0.36,
          top: size * 0.28,
        }}
      />

      {/* left eye */}
      <div
        className="absolute rounded-full border-[5px] border-white bg-black"
        style={{
          width: size * 0.22,
          height: size * 0.22,
          left: size * 0.26,
          top: size * 0.36,
        }}
      />

      {/* right eye */}
      <div
        className="absolute rounded-full border-[5px] border-white bg-black"
        style={{
          width: size * 0.22,
          height: size * 0.22,
          left: size * 0.5,
          top: size * 0.36,
        }}
      />

      {/* eye highlights */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.035,
          height: size * 0.035,
          left: size * 0.32,
          top: size * 0.41,
        }}
      />

      <div
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.035,
          height: size * 0.035,
          left: size * 0.56,
          top: size * 0.41,
        }}
      />

      {/* left whisker */}
      <div
        className="absolute h-[4px] rounded-full bg-black rotate-[25deg]"
        style={{
          width: size * 0.12,
          left: size * 0.05,
          top: size * 0.34,
        }}
      />

      {/* right whisker */}
      <div
        className="absolute h-[4px] rounded-full bg-black rotate-[-20deg]"
        style={{
          width: size * 0.12,
          right: size * 0.05,
          top: size * 0.36,
        }}
      />

      {/* forehead marks */}
      <div
        className="absolute w-[5px] rounded-full bg-black"
        style={{
          height: size * 0.06,
          left: size * 0.46,
          top: size * 0.3,
        }}
      />

      <div
        className="absolute w-[5px] rounded-full bg-black"
        style={{
          height: size * 0.05,
          left: size * 0.5,
          top: size * 0.29,
        }}
      />

      <div
        className="absolute w-[5px] rounded-full bg-black"
        style={{
          height: size * 0.05,
          left: size * 0.54,
          top: size * 0.3,
        }}
      />
    </div>
  );
}