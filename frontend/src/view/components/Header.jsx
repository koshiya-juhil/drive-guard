
function Header() {
  return (
    <header className="flex flex-col justify-center w-full bg-zinc-300 max-md:max-w-full">
      <div className="flex justify-center items-center px-16 py-2.5 w-full bg-violet-800 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-center pl-20 max-w-full w-[1200px] max-md:flex-wrap max-md:pl-5">
          <div className="flex gap-2 max-md:flex-wrap">
            <div className="justify-center my-auto text-sm font-medium leading-5 text-white bg-violet-800 max-md:max-w-full">
              Catch everything you might have missed from our Google Ecosystem Launch Week right here
            </div>
            <div className="flex justify-center items-center px-1.5 py-2 w-6 h-6 rounded-lg bg-white bg-opacity-10">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d2a31d3361e0c45166b7534f377214068f717505ca001864cdb4701de963b90?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&" className="w-3 aspect-[1.2]" alt="" />
            </div>
          </div>
          <div className="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap text-white text-opacity-60">
            <div>Close</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fdea0bc214d0005a6afd95b695505992bf55caca02a9cd01bbfe9852362093c?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&" className="shrink-0 my-auto w-2 aspect-square" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;