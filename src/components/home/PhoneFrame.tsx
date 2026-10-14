/** Flat phone mock used for SAMPLE illustrations (no gradients, per DR-GRADIENT-HERO). */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2.6rem] bg-[#1a2238] p-[10px] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.08)] ${className}`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0d1830] text-white">
        <div aria-hidden className="absolute top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
