/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionHeader";
import { DiscussionBoard } from "./discussion/DiscussionBoard";
import { A } from "./discussion/data";

const headAvatars = [0, 1, 2, 3, 4].map((i) => `${A}/head-avatar-${i}.png`);

/** Figma: Client Discussion (28:852). */
export function ClientDiscussion() {
  return (
    <section id="client-hub" className="relative pt-10 pb-20 leading-[normal] md:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-4 md:px-6 xl:px-0">
        {/* Discussion Head (28:853) */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-3.5">
            <SectionTitle eyebrow="Client hub" title="Talk to your editors" />
            <p className="max-w-[560px] text-[16px] leading-[1.5] text-muted md:text-[17px]">
              Discuss your order with our editors, ask before you buy, and
              learn from other clients’ projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-start">
              {headAvatars.map((src, i) => (
                <span
                  key={src}
                  className={`relative size-8 shrink-0 ${i < headAvatars.length - 1 ? "-mr-[7px]" : ""}`}
                >
                  <img
                    src={src}
                    alt=""
                    width={36}
                    height={36}
                    className="absolute -inset-0.5 block size-9 max-w-none"
                  />
                </span>
              ))}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-[14px] font-semibold whitespace-nowrap text-white">
                1,240 clients
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative size-[7px] shrink-0">
                  <img
                    src={`${A}/online-dot-glow.svg`}
                    alt=""
                    width={19}
                    height={19}
                    className="animate-pulse-dot absolute -inset-1.5 block size-[19px] max-w-none"
                  />
                </span>
                <span className="text-[12px] whitespace-nowrap text-muted">
                  86 online now
                </span>
              </span>
            </div>
            <Button href="#client-hub-threads" className="!py-[13px]">
              Open client hub
            </Button>
          </div>
        </div>

        <DiscussionBoard />
      </div>
    </section>
  );
}
