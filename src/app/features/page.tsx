"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesPage() {
  const tabs = ["Deployments", "Databases", "Observability", "Networking", "Security", "Collaboration"];
  const [activeTab, setActiveTab] = useState("Deployments");

  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none z-0"></div>
        
        <div className="relative z-10 bg-bg-blue-tint text-brand text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 border border-border-blue inline-flex">
          Platform
        </div>
        
        <h1 className="relative z-10 text-[52px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-6">
          Every Feature You <span className="gradient-text">Need.</span>
        </h1>
        
        <p className="relative z-10 text-[18px] text-text-body max-w-[600px] mb-10 leading-[1.7]">
          Built from the ground up for developer productivity, team collaboration, and enterprise reliability.
        </p>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="https://dash.dcdeploy.com" className="px-7 py-3 bg-[#fcb817] text-[#0F172A] font-semibold rounded-full shadow-[0_4px_14px_rgba(14,84,135,0.35)] hover:bg-[#e5a515] transition-colors text-center">
            Get Started Free &rarr;
          </Link>
          <Link href="/pricing" className="px-7 py-3 bg-white text-text-body border-[1.5px] border-border-default font-semibold rounded-full hover:border-brand hover:text-brand transition-colors">
            View Pricing
          </Link>
        </div>

        {/* Floating Previews */}
        <div className="relative z-10 w-full max-w-[800px] h-[100px] flex justify-center perspective-[1000px]">
           <div className="bg-white p-4 rounded-xl shadow-lg border border-border-default flex items-center gap-3 animate-[float_4s_ease-in-out_infinite] absolute z-[3] -translate-y-4">
             <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-white text-xs">🚀</div>
             <span className="font-semibold text-[14px]">v2.4.0 Deployed</span>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-lg border border-border-default flex items-center gap-3 animate-[float_3.5s_ease-in-out_infinite] absolute -translate-x-[200px] top-6 z-[2]">
             <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center p-1">
               <svg viewBox="0 0 24 24" className="w-full h-full text-[#336791] fill-current" xmlns="http://www.w3.org/2000/svg">
                 <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
               </svg>
             </div>
             <span className="font-semibold text-[14px] text-green-600">PostgreSQL</span>
             <span className="text-xs text-text-muted">Connected</span>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-lg border border-border-default flex items-center gap-3 animate-[float_4.5s_ease-in-out_infinite] absolute translate-x-[200px] top-10 z-[1]">
             <span className="font-semibold text-[14px] text-brand">Edge Config</span>
             <span className="text-xs text-text-muted">Synced</span>
           </div>
        </div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky top-[68px] z-40 w-full bg-white/80 backdrop-blur-md border-b border-border-default h-[64px] flex items-center justify-center px-4 overflow-x-auto hide-scrollbar">
        <nav className="flex gap-1 bg-[#F1F5F9] p-1 rounded-full">
          {tabs.map((item) => {
            const isActive = activeTab === item;
            return (
              <button 
                key={item} 
                onClick={() => setActiveTab(item)}
                className={`px-6 py-2 rounded-full font-bold text-[14px] whitespace-nowrap transition-all duration-200 ${
                  isActive 
                    ? "bg-white text-brand shadow-sm" 
                    : "text-text-muted hover:text-text-heading"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="min-h-[600px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "Deployments" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="bg-brand-pale text-brand px-3 py-1 text-[12px] font-bold rounded-full inline-block mb-6 uppercase tracking-wider">Deployments</div>
                    <h2 className="text-[40px] font-heading font-bold text-text-heading mb-6 leading-tight">
                      From git push to <span className="gradient-text">live</span> in seconds.
                    </h2>
                    <p className="text-[18px] text-text-body mb-8 leading-[1.7]">
                      Give your team the power to deploy any stack seamlessly. From frontend frameworks to backend services, we handle the heavy lifting.
                    </p>
                    <div className="flex flex-col gap-5 mb-8">
                      {[
                        { title: "Zero-config stack detection", desc: "Instantly supports Next.js, Go, Python, Rust, and 40+ more." },
                        { title: "Real-time streaming build logs", desc: "Watch your build progress without refreshing." },
                        { title: "Pull request preview URLs", desc: "Share live preview environments for every PR." },
                        { title: "Atomic deploys with instant rollback", desc: "Go back to a previous version in 1 click." }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-5 h-5 rounded-full bg-bg-blue-tint text-brand flex items-center justify-center text-[10px] font-bold">&#10003;</div>
                            <span className="text-[15px] text-text-heading font-semibold">{item.title}</span>
                          </div>
                          <div className="pl-8 text-[14px] text-text-muted">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-[#0F172A] rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-[#1E293B] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-[#1E293B]">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500"></div>
                           <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-[12px] font-mono text-slate-400">my-app — DCDeploy</div>
                        <div className="w-12"></div>
                      </div>
                      <div className="p-6 font-mono text-[13px] text-slate-300 leading-[1.8] min-h-[300px]">
                        <div className="text-slate-500 flex gap-4"><span>11:04</span> <span className="text-slate-300">Cloning repository from GitHub...</span></div>
                        <div className="text-slate-500 flex gap-4"><span>11:04</span> <span className="text-slate-300">Detected Next.js framework... setting up build env.</span></div>
                        <div className="text-slate-500 flex gap-4"><span>11:05</span> <span className="text-[#10B981]">✔ Running build script: npm run build</span></div>
                        <div className="text-slate-500 flex gap-4"><span>11:05</span> <span className="text-slate-300">Creating optimized production build...</span></div>
                        <div className="text-slate-500 flex gap-4"><span>11:05</span> <span className="text-[#10B981]">✔ Uploading assets to Edge Network...</span></div>
                        <div className="mt-4 border-l-2 border-[#10B981] pl-4 text-white">Successfully deployed!</div>
                        <div className="text-[#4da1db] mt-2 pl-4 break-words">https://my-app-prod.dcdeploy.app</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Databases" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="order-2 md:order-1">
                    <div className="flex flex-col gap-4 w-full max-w-[400px]">
                      <div className="bg-white rounded-2xl shadow-lg border border-border-default p-5 flex items-center justify-between hover:-translate-y-1 transition-transform">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center p-2.5">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#336791] fill-current" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-text-heading text-[16px]">PostgreSQL 16</h4>
                            <span className="text-[12px] text-text-muted">Managed SQL • Backups</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl shadow-lg border border-border-default p-5 flex items-center justify-between ml-4 hover:-translate-y-1 transition-transform">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center p-2.5">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#D82C20] fill-current" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-text-heading text-[16px]">Redis 7</h4>
                            <span className="text-[12px] text-text-muted">In-Memory Caching</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="bg-brand-pale text-brand px-3 py-1 text-[12px] font-bold rounded-full inline-block mb-6 uppercase tracking-wider">Databases</div>
                    <h2 className="text-[40px] font-heading font-bold text-text-heading mb-6 leading-tight">Managed databases that <span className="gradient-text">just work.</span></h2>
                    <p className="text-[18px] text-text-body mb-8 leading-[1.7]">Provision production-ready databases with a single click. We handle backups, scaling, and high availability natively.</p>
                    <div className="flex flex-col gap-5">
                      {["Daily point-in-time backups", "One-click connection injection", "Isolated DB branches for PRs"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-bg-blue-tint text-brand flex items-center justify-center text-[10px] font-bold">&#10003;</div>
                          <span className="text-[15px] text-text-heading font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Observability" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto">
                  <div className="w-full bg-white border border-border-default rounded-[24px] shadow-xl mb-16 overflow-hidden aspect-video relative">
                    <img 
                      src="/metrics.png" 
                      alt="Observability Metrics Dashboard" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-[32px] md:text-[40px] font-heading font-bold text-text-heading mb-6">Complete Observability</h2>
                    <p className="text-[18px] text-text-body mb-12">Monitor metrics, streaming logs, and custom alerts without third-party tools.</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {["Real-time logs", "Metric gauges", "Smart alerts", "Usage quotas"].map((f, i) => (
                        <div key={i} className="bg-bg-blue-tint text-brand font-bold p-4 rounded-xl text-[14px]">{f}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Networking" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="bg-brand-pale text-brand px-3 py-1 text-[12px] font-bold rounded-full inline-block mb-6 uppercase tracking-wider">Networking</div>
                    <h2 className="text-[40px] font-heading font-bold text-text-heading mb-6 leading-tight">Global Edge <span className="gradient-text">Acceleration.</span></h2>
                    <p className="text-[18px] text-text-body mb-8 leading-[1.7]">Deliver content at lightning speed with our global edge network. Automatic TLS, smart routing, and global CDN caching.</p>
                    <div className="grid grid-cols-1 gap-4">
                      {["35+ Global regions", "Automatic Managed TLS", "Smart L7 Load Balancing", "Custom Domain Support"].map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">✓</div>
                           <span className="text-[16px] font-semibold text-text-heading">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#F8FAFF] rounded-3xl p-10 border border-border-default relative overflow-hidden flex items-center justify-center min-h-[400px]">
                    <div className="absolute inset-0 circuit-pattern opacity-10"></div>
                    <div className="relative w-48 h-48 bg-brand/20 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-32 h-32 bg-brand/40 rounded-full flex items-center justify-center animate-ping absolute"></div>
                      <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(14,84,135,0.5)] relative z-10">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Security" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-brand-pale text-brand px-3 py-1 text-[12px] font-bold rounded-full inline-block mb-6 uppercase tracking-wider">Security</div>
                  <h2 className="text-[40px] font-heading font-bold text-text-heading mb-6 leading-tight">Enterprise-Grade <span className="gradient-text">Protection.</span></h2>
                  <p className="text-[18px] text-text-body mb-16">Every application deployed on DCDeploy is protected by our multi-layered security architecture.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {["Enterprise Security", "AES-256 Encryption", "TLS 1.3", "RBAC Control", "VPC Isolation", "Anti-DDoS", "Audit Logging"].map((s, i) => (
                      <div key={i} className="bg-white border border-border-default p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-3">🛡️</div>
                        <span className="text-[14px] font-bold text-text-heading">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Collaboration" && (
              <section className="py-[96px] px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="bg-brand-pale text-brand px-3 py-1 text-[12px] font-bold rounded-full inline-block mb-6 uppercase tracking-wider">Collaboration</div>
                    <h2 className="text-[40px] font-heading font-bold text-text-heading mb-6 leading-tight">Built for <span className="gradient-text">Teams.</span></h2>
                    <p className="text-[18px] text-text-body max-w-2xl mx-auto">Seamlessly manage projects across your entire organization with powerful collaboration tools.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: "Team Organizations", desc: "Manage multiple projects under a single organization account." },
                      { title: "Role-Based Access", desc: "Assign Viewer, Developer, or Admin roles to team members." },
                      { title: "Project Sharing", desc: "Share direct links to preview environments and logs." }
                    ].map((item, i) => (
                      <div key={i} className="p-8 border border-border-default rounded-[32px] bg-bg-page hover:border-brand transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center mb-6 font-bold text-xl">{i+1}</div>
                        <h3 className="text-xl font-bold text-text-heading mb-3">{item.title}</h3>
                        <p className="text-text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-[#0F172A] text-white text-center">
        <h2 className="text-[36px] font-heading font-bold mb-6">Ready to experience these features?</h2>
        <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-bold px-8 py-4 rounded-full hover:bg-[#e5a515] transition-all shadow-lg inline-block">Start Building Now</Link>
      </section>

    </div>
  );
}
