function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 172"
      fill="none"
      {...props}
    >
      <mask
        id="a"
        width={96}
        height={172}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path fill="#fff" d="M0 .568h95.833v170.765H0V.568Z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="url(#b)"
          d="M72.693.568c2.161 10.823-3.25 21.99-11.047 29.781-7.797 7.812-17.771 12.99-27.281 18.552-9.532 5.568-19.047 11.917-25.021 21.193C4.135 78.162 2.005 87.828.917 97.359c-1.36 11.573-1.172 23.709 2.505 34.599 2.672-6.567 6.161-12.849 10.125-18.718 7.797-11.558 17.396-21.756 26.943-31.896 11.166-11.85 22.312-23.677 33.479-35.521-11.558 21.651-29.464 39.11-44.594 58.427-15.13 19.339-28.031 42.417-26.62 66.927 1.125-12.547 11.302-22.505 22.35-28.562 11.046-6.058 23.416-9.448 34.296-15.776 20.573-11.985 34.411-34.823 35.484-58.62C95.974 44.156 84.995 21.26 72.693.568Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={47.55}
          x2={47.55}
          y1={0.568}
          y2={171.177}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8C52FF" />
          <stop offset={1} stopColor="#543199" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const About = () => {
  return (
    <main className="hero min-h-[60vh] dark:bg-[#111122] flex flex-col items-center justify-center p-6 sm:p-12 bg-gray-50/50">
      <div className="relative w-full max-w-4xl dark:border-slate-800 dark:bg-[#15151a]/95 backdrop-blur-sm bg-white border border-slate-200 shadow-md rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Logo Section */}
        <div className="mb-8 relative z-10">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 shadow-inner border border-slate-100 dark:border-slate-700/50 inline-block">
            <LogoIcon width={48} height={48} className="drop-shadow-lg" />
          </div>
        </div>

        {/* Header */}
        <h1 className="relative z-10 text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-700 to-slate-900 dark:from-slate-100 dark:to-slate-400 mb-6 tracking-tight">
          SomCheat
          <span className="block text-xl sm:text-2xl font-semibold text-slate-500 dark:text-slate-400 mt-2 font-mono">
            Xasuusin Degdeg Ah
          </span>
        </h1>

        {/* Description */}
        <p className="relative z-10 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
          <span className="font-bold text-indigo-500 dark:text-indigo-400">SomCheat</span> waa
          mashruuc loogu talagalay in lagu xasuusto waxyaabaha aasaasiga ah ee
          tiknoolajiyada, sida <span className="text-slate-800 dark:text-slate-200 font-medium">luuqadaha programming-ka</span>.
          Waxa mashruucan sameeyey{" "}
          <a
            href="https://github.com/Adam-Elmi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors underline decoration-2 decoration-indigo-300 underline-offset-2"
          >
            Adam Elmi
          </a>{" "}
          si uu u fududeeyo barashada iyo horumarka tiknoolajiyada.
        </p>

        {/* Buttons */}
        <div className="relative z-10 flex gap-5 justify-center items-center flex-wrap w-full">
          <a href="/cheatsheets" className="group">
            <button className="cursor-pointer shadow-lg shadow-indigo-500/20 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
              View Cheat Sheets
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </a>
          <a href="https://github.com/Adam-Elmi/SomCheat" target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-300">
              Contribute
            </button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default About;
