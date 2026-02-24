import { services, blocks } from "@/data/services";

export default function StatsBar() {
  const hotCount = services.filter((s) => s.hot).length;

  return (
    <div className="flex justify-center gap-14 my-9">
      <div className="text-center">
        <div className="text-[32px] font-extrabold text-foreground tracking-tighter">{services.length}</div>
        <div className="text-[11.5px] text-t4 mt-0.5 font-medium">концептів</div>
      </div>
      <div className="text-center">
        <div className="text-[32px] font-extrabold text-foreground tracking-tighter">{blocks.length}</div>
        <div className="text-[11.5px] text-t4 mt-0.5 font-medium">блоків</div>
      </div>
      <div className="text-center">
        <div className="text-[32px] font-extrabold text-primary tracking-tighter">{hotCount}</div>
        <div className="text-[11.5px] text-t4 mt-0.5 font-medium">трендових</div>
      </div>
    </div>
  );
}
