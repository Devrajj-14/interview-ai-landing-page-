import Image from 'next/image';

const DownloadCta = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="relative bg-[#3A3D45] rounded-[48px] overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-[-5rem] left-[-4rem] w-48 h-48 bg-accent/20 rounded-full opacity-70" aria-hidden="true" />
          <div className="absolute bottom-[-3rem] left-[15%] w-24 h-24 bg-primary/20 rounded-full" aria-hidden="true" />
          <div className="absolute bottom-5 right-[-1.5rem] w-16 h-16 bg-primary/30 rounded-full" aria-hidden="true" />
          <div className="absolute top-5 right-[28%] md:right-[30%] w-8 h-8 bg-accent/40 rounded-full" aria-hidden="true" />
          <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] w-6 h-6 bg-primary/50 rounded-full" aria-hidden="true" />

          <div className="absolute top-[-50px] right-[5%] sm:right-[10%] md:right-[15%] w-[140px] h-[140px] flex items-center justify-center bg-white rounded-full shadow-lg z-10">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/623bd920c58579fdab94492e_D60A09A8-0457-4C5E-9B3A-1-3.png"
              alt="Golden trophy icon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="relative z-20 text-center py-16 md:py-20 px-8">
            <h2 className="text-white font-bold text-4xl md:text-[56px] leading-tight tracking-tight max-w-3xl mx-auto">
              Interviews aren&apos;t easy, preparation should be !
            </h2>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-white text-[#1A1B1F] font-bold text-base py-5 px-10 rounded-full transition-transform duration-200 ease-in-out hover:scale-[1.03] shadow-md"
              >
                Start Learning
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCta;
