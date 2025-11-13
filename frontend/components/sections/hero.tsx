import React from 'react';
import Link from 'next/link';
import HeroAnimation from '@/components/HeroAnimation';

const HeroSection = () => {
  return (
    <header className="bg-background text-foreground overflow-hidden">
      {/* Corresponds to .section_home-hero with padding-section-large */}
      <div className="py-16 lg:py-24">
        {/* Corresponds to .container-large with padding-global-v2 */}
        <div className="container mx-auto max-w-[1280px] px-10 md:px-20">
          {/* home-hero_wrap */}
          <div className="flex flex-col lg:flex-row items-center gap-x-12">
            {/* home-hero_content */}
            <div className="lg:w-2/5 text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-[56px] md:text-7xl font-bold leading-[1.1] tracking-[-0.02em]">
                Ace your interviews
              </h1>
              {/* padding-bottom padding-xsmall equivalent */}
              <div className="pt-4" />
              {/* max-width is-27rem */}
              <div className="max-w-[27rem] mx-auto lg:mx-0">
                <p className="text-xl md:text-[22px] leading-relaxed">
                  The platform professionals trust.
                </p>
              </div>
              {/* padding-bottom padding-medium equivalent */}
              <div className="pt-8" />
              <div className="button-group">
                <Link
                  href="/candidates"
                  className="inline-block bg-primary text-primary-foreground rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.05em] transition-all duration-300 ease-in-out hover:scale-105 shadow-[0_2px_8px_rgba(155,111,255,0.24)] hover:shadow-[0_8px_24px_rgba(155,111,255,0.24)]"
                >
                  START PREPARING
                </Link>
              </div>
            </div>

            {/* home-hero_animation-component */}
            <div className="w-full lg:w-3/5">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
